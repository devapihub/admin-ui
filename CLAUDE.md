# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start dev server on port 5173
npm run build     # Build production bundle
npm run lint      # Run ESLint
npm run preview   # Preview production build

# Deployment (via Makefile)
make release      # install → build → deploy → nginx-restart on remote server
make deploy       # SCP dist/ to remote (61.14.234.12:2018 → /var/www/hughhuynh97.com/dist)
```

There are no tests configured in this project.

## Architecture

This is the **admin UI** for the DevAPIHub platform — a React SPA for authentication and user profile management.

**Tech stack**: React 19 (class components), Vite, React Router DOM 7, Axios, ESLint. No TypeScript, no CSS framework (inline styles only), no state management library.

**Auth flow**:
1. `App.jsx` checks `localStorage` for a token on load
2. No token → redirect to `/login` → `LoginForm` → `POST /api/auth/login`
3. Token stored in `localStorage`, user redirected to `/` (home)
4. `HomePage` fetches `GET /api/user/profile` using bearer token
5. Logout clears `localStorage` and redirects to `/login`

**API layer** (`src/api/adminClient.js`):
- Base URL: `https://www.devapihub.com/api` (production)
- Dev proxy: Vite proxies `/api/*` → `http://localhost:8080` (local backend)
- Request interceptor auto-attaches `Authorization: Bearer <token>` from `localStorage`

**Key structure**:
- `src/api/` — Axios client instance
- `src/components/auth/` — Reusable auth UI components
- `src/pages/` — Page-level components (one folder per page)
- `src/App.jsx` — Router and top-level auth state

## Sub Agents

Project-scoped agents defined in `.claude/agents/`. Dùng Agent tool với `subagent_type` tương ứng để kích hoạt.

- **`github-agent`** — Mọi tương tác GitHub: tạo issue, branch, PR, review, merge, xóa branch. Tuân theo workflow của project.
- **`infra-devops-agent`** — Infrastructure & DevOps: Docker, Nginx, deployment, server management, CI/CD research.

### Delegation Rules

**Tất cả** các tác vụ liên quan đến git hoặc GitHub đều phải được delegate cho `github-agent`, bao gồm:
- Commit, push, tạo branch
- "push lên master" workflow (full auto-merge)
- "push và để tôi review" workflow (PR-only)
- Tạo/đóng issue, tạo/merge/xóa PR
- Bất kỳ thao tác nào với `git` CLI hoặc GitHub API

Main agent **không tự thực hiện** các tác vụ git — luôn delegate cho `github-agent`.

### Cách invoke project-scoped agents đúng cách

Project-scoped agents KHÔNG thể dùng `subagent_type: "github-agent"` hay `subagent_type: "infra-devops-agent"` trong Agent tool — chỉ built-in types mới hoạt động. Thay vào đó, dùng `subagent_type: "general-purpose"` và embed context của agent vào prompt.

**Invoke github-agent:**
```
Agent(
  subagent_type: "general-purpose",
  prompt: "Bạn là github-agent — GitHub workflow specialist cho devapihub/admin-ui.
  Repo: devapihub/admin-ui | Main branch: master | Git user: hugh.huynh
  Workflow rules: (1) tạo issue trước khi tạo branch, (2) tạo PR trước khi merge,
  (3) xóa branch sau khi merge.
  Branch naming: fix/<desc>, feat/<desc>, docs/<desc>, hotfix/<desc>.
  Tools: gh CLI, git CLI.

  Task: <mô tả task cụ thể>"
)
```

**Invoke infra-devops-agent:**
```
Agent(
  subagent_type: "general-purpose",
  prompt: "Bạn là infra-devops-agent — Infrastructure & DevOps specialist cho devapihub/admin-ui.
  Stack: Docker (trivip002/admin-ui:latest), Nginx, EKS, ArgoCD (GitOps).
  Deployment workflow: build image → push Docker Hub → update image tag trong devapihub/argocd/app/admin-ui/k8s → commit/push → ArgoCD sync lên EKS.
  Không dùng Makefile hay SCP cho production.
  Luôn confirm trước khi chạy lệnh ảnh hưởng production.

  Task: <mô tả task cụ thể>"
)
```

Khi nhận được task thuộc phạm vi của agent nào, main agent PHẢI spawn general-purpose agent với context tương ứng, không tự xử lý.

## Response Attribution

Ở cuối **mỗi** response, luôn thêm dòng ghi rõ agent nào đang trả lời, theo định dạng:

> `— [tên-agent]`

Các giá trị hợp lệ:
- `— main-agent` — Claude Code chính (không phải sub-agent nào)
- `— github-agent` — khi đang chạy trong context của github-agent
- `— infra-devops-agent` — khi đang chạy trong context của infra-devops-agent

## Git Workflows

### "push lên master" — Full auto-merge workflow
Khi user yêu cầu **push lên master**, thực hiện đầy đủ các bước sau theo thứ tự:
1. Tạo branch mới từ master (đặt tên theo convention: `fix/...`, `feat/...`, `docs/...`)
2. Commit toàn bộ thay đổi lên branch mới và push lên remote
3. Tạo GitHub issue mô tả nội dung thay đổi
4. Tạo Pull Request vào master (link với issue vừa tạo)
5. Merge Pull Request vào master
6. Xóa branch vừa merge
7. Checkout về master và pull code mới nhất về local

### "push và để tôi review" — PR-only workflow
Khi user yêu cầu **push và để tôi review**, chỉ thực hiện:
1. Tạo branch mới từ master (đặt tên theo convention: `fix/...`, `feat/...`, `docs/...`)
2. Commit toàn bộ thay đổi lên branch mới và push lên remote
3. Tạo GitHub issue mô tả nội dung thay đổi
4. Tạo Pull Request vào master (link với issue vừa tạo)
5. Dừng lại — **không merge**, chờ user review và quyết định

## Notes

- WebSocket dependencies (STOMP.js, SockJS) are installed but not yet wired up in the application code.
- The backend API runs on port 8080 locally; make sure it's running when developing against local backend.
- Docker image is published to `trivip002/admin-ui:latest` (see README for buildx commands).
