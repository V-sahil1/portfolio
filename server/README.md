# Portfolio Contact Backend

Production-ready backend for a portfolio contact form. On each submission it
**stores the contact in PostgreSQL** (Sequelize) and **sends a WhatsApp message
to your phone** via the WhatsApp Business Cloud API. Built with Express, clean
MVC + repository + service layering, express-validator, Helmet, CORS, Morgan,
rate limiting, JWT (admin) and Swagger.

## Architecture

```
src/
├── config/        env, database, swagger
├── constants/     http status + messages
├── controllers/   contact, auth (thin HTTP handlers)
├── services/      ContactService, WhatsappService, GeoLocationService, AuthService
├── repositories/  ContactRepository (only place touching the model)
├── routes/        versioned routers + Swagger annotations
├── models/        Sequelize Contact model
├── validators/    express-validator chains
├── middlewares/   validate, auth (JWT), rateLimiter, requestLogger, errorHandler
├── utils/         ApiError, ApiResponse, asyncHandler, logger, jwt, userAgent, datetime, request
├── docs/          Postman collection
├── database/      Sequelize CLI config + migrations
├── app.js         Express app factory
└── server.js      boot + graceful shutdown
```

**Response contract** — `{ success, message, data }` / `{ success, message, errors }`.

## Workflow (POST /api/v1/contact)

1. **Validate** — name/email/message (email valid, message ≥ 10 chars).
2. **Collect visitor info** — browser + device from the `User-Agent`; country +
   city from the IP (GeoLocationService).
3. **Store** the contact in PostgreSQL.
4. **Generate** the WhatsApp message.
5. **Send** it via the WhatsApp Business Cloud API.
6. **Return** `{ "success": true, "message": "Contact saved successfully." }`.

> If the WhatsApp send fails, the DB is **not** rolled back — the contact is
> saved, the error is logged, and the response is still success. WhatsApp is
> dispatched fire-and-forget so it never delays or fails the request.

## Prerequisites

- Node.js ≥ 18 (uses the built-in `fetch` — no axios needed)
- PostgreSQL ≥ 13
- A WhatsApp Business Cloud API app (phone number id + access token)

## Setup

```bash
cd server
npm install
cp .env.example .env          # fill DB, JWT, and WhatsApp values
npm run db:migrate            # create the contacts table
npm run dev                   # http://localhost:5000/api/v1
```

- Swagger UI: `http://localhost:5000/api/v1/docs`
- OpenAPI JSON: `http://localhost:5000/api/v1/docs.json`

## WhatsApp Business API setup

1. Create a Meta app → add **WhatsApp** → get the **Phone number ID** and a
   **permanent access token**; set `WHATSAPP_PHONE_NUMBER_ID` and
   `WHATSAPP_ACCESS_TOKEN`.
2. Set `WHATSAPP_TO` to your number in international format, digits only
   (e.g. `919876543210`).
3. **Message type:**
   - `text` (default) — only delivered inside the 24-hour customer-service
     window (i.e. after you message the business number). Great for testing.
   - `template` — required for business-initiated messages. Create an approved
     template with **one body parameter** and set `WHATSAPP_MESSAGE_TYPE=template`,
     `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANG`. The full formatted
     message is passed as that parameter.
4. Set `WHATSAPP_ENABLED=false` to disable sending (contacts still save).

Message format sent to you:

```
🔥 New Portfolio Contact

👤 Name: John Doe
📧 Email: john@gmail.com

💬 Message:
We have a Backend Developer opportunity.

🌍 Country: India
🏙 City: Ahmedabad
💻 Browser: Chrome
📱 Device: Desktop

🕒 Time:
04 Jul 2026 08:15 PM
```

## API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET  | `/health` | — | liveness |
| POST | `/contact` | — | submit form → store + WhatsApp notify |
| POST | `/auth/login` | — | admin login → JWT |
| GET  | `/contacts` | JWT | list submissions (paginated) |

## Frontend integration (Next.js)

Your existing form posts `{ name, email, message }` to the backend:

```js
// e.g. in your contact form's submit handler
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
const data = await res.json();
// data => { success: true, message: 'Contact saved successfully.', data: null }
```

Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1` in the frontend and add
its origin (e.g. `http://localhost:3000`) to `CORS_ORIGINS` in the backend `.env`.

> The backend derives IP, country, city, browser and device server-side from the
> request — the frontend only needs to send name/email/message.

## Testing

Import `src/docs/postman_collection.json` into Postman. Run **Submit Contact**
(public), then **Admin Login** (auto-saves `{{token}}`), then **List Contacts**.

## Deployment

Set every `.env` var (strong `JWT_SECRET`; `DB_SSL=true` for managed Postgres).
Run `npm ci`, `npm run db:migrate`, then `node src/server.js`. Point the
frontend's API URL at `https://<host>/api/v1` and add its origin to
`CORS_ORIGINS`. Health check: `GET /api/v1/health`.

## Coding standards

ES Modules · async/await only · MVC + repository + service layers · reusable
utils · standard response wrapper · global error handler · JWT admin auth ·
Helmet/CORS/rate-limit hardening.
