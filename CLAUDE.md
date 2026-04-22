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

## Git Workflow

**Khi được yêu cầu push lên main/master, luôn thực hiện đúng 4 bước sau theo thứ tự:**

1. **Tạo GitHub Issue** — mô tả rõ task/feature/fix cần làm
2. **Tạo branch mới** — đặt tên liên quan tới issue (e.g. `feat/issue-12-add-login`, `fix/issue-5-token-expiry`)
3. **Commit & push lên branch mới** — KHÔNG push thẳng lên main
4. **Tạo Pull Request** — từ branch mới vào `main`, reference issue trong PR description (e.g. `Closes #12`)

Không bao giờ push trực tiếp vào `main`.

## Notes

- WebSocket dependencies (STOMP.js, SockJS) are installed but not yet wired up in the application code.
- The backend API runs on port 8080 locally; make sure it's running when developing against local backend.
- Docker image is published to `trivip002/admin-ui:latest` (see README for buildx commands).
