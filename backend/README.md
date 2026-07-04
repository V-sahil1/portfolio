# Portfolio Analytics Backend

Production-grade REST API that captures and reports developer-portfolio visitor
analytics. Built with **Node.js, Express, PostgreSQL, Sequelize, Redis, BullMQ,
JWT, Nodemailer and Swagger**, using MVC + repository + service layering.

The Next.js frontend consumes these REST endpoints; this repo contains **no
frontend code**.

---

## Architecture

```
src/
├── config/        env, database, redis, mailer, swagger
├── constants/     http status, event types, messages, cache keys, queue names
├── controllers/   thin HTTP handlers (asyncHandler + response wrapper)
├── services/      business logic (auth, visitor, session, event, contact, dashboard, analytics, cache, email)
├── repositories/  data access (base repo + per-entity + analytics aggregates)
├── models/        Sequelize models + associations
├── validators/    express-validator chains
├── middleware/    auth (JWT), validate, rate limit, request logger, error handler
├── routes/        versioned routers + Swagger annotations
├── queues/        BullMQ queue producers
├── jobs/          BullMQ workers (email) + worker entrypoint
├── events/        in-process domain event bus
├── cron/          scheduled maintenance (refresh-token purge)
├── sockets/       realtime hook (reserved)
├── helpers/       date ranges, client IP
├── utils/         ApiError, ApiResponse, asyncHandler, jwt, password, pagination, logger
├── database/      Sequelize CLI config, migrations, seeders
├── docs/          Postman collection
├── app.js         Express app factory (no side effects)
└── server.js      boot + graceful shutdown
```

**Response contract** — success:
```json
{ "success": true, "message": "", "data": {} }
```
error:
```json
{ "success": false, "message": "", "errors": [] }
```

---

## Prerequisites

- Node.js ≥ 18
- PostgreSQL ≥ 13
- Redis ≥ 6

Or use Docker (see below) — no local Postgres/Redis needed.

---

## Setup

```bash
cd backend
npm install
cp .env.example .env      # then edit values (DB, JWT secrets, SMTP…)
```

### Datastores via Docker (optional but easiest)

```bash
docker compose up -d postgres redis
```

### Migrate + seed

```bash
npm run db:migrate        # create all tables
npm run db:seed           # seed admin (from .env) + demo analytics data
# or reset everything:
npm run db:reset
```

The admin login defaults to `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
(`admin@portfolio.local` / `Admin@12345`).

---

## Run

```bash
# API (terminal 1)
npm run dev            # nodemon, or: npm start

# Background worker for emails (terminal 2)
npm run worker:dev     # or: npm run worker
```

- API: `http://localhost:4000/api/v1`
- Swagger UI: `http://localhost:4000/api/v1/docs`
- OpenAPI JSON: `http://localhost:4000/api/v1/docs.json`

> The API enqueues emails to Redis via BullMQ; the **worker** process actually
> sends them. Both must run for contact/résumé notifications to be delivered.

---

## API summary

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET  | `/health` | — | liveness |
| POST | `/auth/login` | — | admin login (returns access + refresh) |
| POST | `/auth/refresh` | — | rotate refresh token |
| POST | `/auth/logout` | — | revoke refresh token |
| GET  | `/auth/me` | JWT | current admin |
| POST | `/visitor` | — | record a visitor |
| POST | `/session` | — | record a session (idempotent on `sessionId`) |
| POST | `/event` | — | track an event |
| POST | `/contact` | — | contact form → email notification |
| GET  | `/dashboard` | JWT | headline metrics (cached) |
| GET  | `/visitors` | JWT | list (pagination/search/filter/sort) |
| GET  | `/visitor/:id` | JWT | full profile (sessions/events/contacts) |
| GET  | `/analytics` | JWT | time series + breakdowns (cached) |
| GET  | `/analytics/search` | JWT | search by company/designation/name/country/date |

**Event types:** `VIEW_HOME, VIEW_ABOUT, VIEW_PROJECT, VIEW_EXPERIENCE,
VIEW_CONTACT, VIEW_SKILLS, CLICK_GITHUB, CLICK_LINKEDIN, CLICK_RESUME,
DOWNLOAD_RESUME, CONTACT_FORM, SEND_EMAIL, OPEN_PROJECT, SCROLL_50, SCROLL_100`.

---

## Testing with Postman

1. Import `src/docs/postman_collection.json` (or import via the OpenAPI JSON URL).
2. The `{{baseUrl}}` variable defaults to `http://localhost:4000/api/v1`.
3. Run **Auth → Login** first — it auto-saves `{{accessToken}}`/`{{refreshToken}}`.
4. Run **Ingest** requests (visitor → session → event → contact); **Create
   Visitor** auto-saves `{{visitorId}}`.
5. Run **Admin** requests (dashboard, list/get visitors, analytics, search).

---

## Caching & queues

- **Redis cache** — the dashboard and analytics payloads are cached
  (`CACHE_TTL_SECONDS`, default 120s). Any write (visitor/session/event/contact)
  invalidates the `analytics:*` keys. Visitor profiles are cached per id.
- **BullMQ** — the `email` queue handles contact-form, résumé-download and
  recruiter notifications with retry + exponential backoff.

---

## Deployment

Works on any Node host (Render, Railway, Fly.io, a VM, or Docker).

**Environment:** set every variable from `.env.example`. Use strong
`JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`. For managed Postgres that requires
TLS, set `DB_SSL=true`.

**Steps (managed host):**
1. Provision PostgreSQL + Redis; set their connection vars.
2. Build: `npm ci`. Release/pre-deploy: `npm run db:migrate` (and `db:seed` once).
3. Start two services from the same image/repo:
   - web: `node src/server.js`
   - worker: `node src/jobs/index.js`
4. Point the Next.js frontend's API base URL at `https://<host>/api/v1` and add
   its origin to `CORS_ORIGINS`.

**Docker (full stack):**
```bash
docker compose up --build
# then, once, inside the api container:
docker compose exec api npm run db:migrate && docker compose exec api npm run db:seed
```

**Health check:** `GET /api/v1/health` returns `{ success: true, ... }`.

---

## Coding standards

ES Modules · async/await only · centralised env + constants · repository/service
separation · global error handler · standardised response envelope · JWT auth
with refresh-token rotation & revocation · Helmet/CORS/rate-limit hardening.
