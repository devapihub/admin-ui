Deploy the admin UI to the remote server.

**Quick deploy** (SCP dist/ only):
```bash
make deploy
```
Copies `dist/` to `61.14.234.12:2018 → /var/www/hughhuynh97.com/dist`

**Full release** (install → build → deploy → nginx restart):
```bash
make release
```

Always run `npm run build` before `make deploy` unless using `make release` which does it automatically.
