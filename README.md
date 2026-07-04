# Portfolio Monorepo — Sahil Vardekar

A developer portfolio and its analytics backend, split into two independent apps.

```
portfolio/
├── frontend/   # React + Vite + TypeScript + Tailwind portfolio site
└── backend/    # Node.js + Express + PostgreSQL analytics API
```

## Frontend (`frontend/`)

Backend-focused full-stack portfolio built with React 19, Vite, TypeScript,
Tailwind CSS and GSAP.

```bash
cd frontend
npm install        # only if node_modules is missing
npm run dev        # http://localhost:5173
npm run build      # production build → frontend/dist
```

See [frontend/README.md](frontend/README.md).

## Backend (`backend/`)

Production-grade visitor-analytics REST API: Express, PostgreSQL/Sequelize,
Redis, BullMQ, JWT, Nodemailer and Swagger.

```bash
cd backend
npm install
cp .env.example .env
docker compose up -d postgres redis
npm run db:migrate && npm run db:seed
npm run dev        # API  → http://localhost:4000/api/v1
npm run worker     # background email worker (second terminal)
```

See [backend/README.md](backend/README.md).

## Connecting the two

Point the frontend's API base URL at `http://localhost:4000/api/v1` and add the
frontend origin (e.g. `http://localhost:5173`) to the backend's `CORS_ORIGINS`.
