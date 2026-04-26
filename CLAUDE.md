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

## Response Attribution

Ở cuối **mỗi** response, luôn thêm dòng ghi rõ agent nào đang trả lời, theo định dạng:

> `— [tên-agent]`

Các giá trị hợp lệ:
- `— main-agent` — Claude Code chính (không phải sub-agent nào)
- `— github-agent` — khi đang chạy trong context của github-agent
- `— infra-devops-agent` — khi đang chạy trong context của infra-devops-agent

## Notes

- WebSocket dependencies (STOMP.js, SockJS) are installed but not yet wired up in the application code.
- The backend API runs on port 8080 locally; make sure it's running when developing against local backend.
- Docker image is published to `trivip002/admin-ui:latest` (see README for buildx commands).
- Trước khi tạo 1 branch mới để fix bug, nhớ tạo 1 issue đính kèm.
- Khi tạo 1 branch và push lên master, nhớ tạo PR để review code trước khi merge vào master.
- Sau khi merge vào master xong nhớ remove branch đó luôn.
