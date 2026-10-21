# ReportET product (marketing + app)

Two deployables under this folder:

| Folder | Host | Stack |
|---|---|---|
| `public/` | `reportet.softetsolutions.com` | Vanilla HTML / CSS / JS |
| `react/` | `reportetapp.softetsolutions.com` | Vite + React admin |

## Local development

```bash
# Terminal 1 — React app (port 5174)
cd react
cp .env.example .env   # if needed
npm install
npm run dev

# Terminal 2 — Marketing site (any static server on 5500)
cd public
npx --yes serve -l 5500
```

Marketing `js/config.js` points Login / Signup / Dashboard at `http://localhost:5174`. After login on the app, revisiting marketing calls `GET /logo/me` with cookies and shows **Go to Dashboard** when the session is valid.

## Production config

- Marketing: set `APP_URL` to `https://reportetapp.softetsolutions.com` in `public/js/config.js`
- React: set `VITE_MARKETING_URL=https://reportet.softetsolutions.com` and `VITE_REPORTET_BASE_URL=https://schoolet.org/schoolet`
- Backend: allow both origins (already in CORS); set `REPORTET_APP_URL=https://reportetapp.softetsolutions.com` for password-reset emails
