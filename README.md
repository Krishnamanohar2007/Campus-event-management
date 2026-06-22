# Campus Event Management

A small Express + MongoDB backend for managing campus events, users, and registrations. The frontend is a placeholder and can be implemented as a separate SPA.

## Repository layout
- `backend/` — Express API server (Node.js)
  - `server.js` — application entrypoint
  - `config/db.js` — MongoDB connection helper
  - `models/` — Mongoose models (`User`, `Event`, `Registration`)
  - `controllers/` — route handlers (`authController`, `eventController`, `registrationController`)
  - `routes/` — Express routers
  - `middlewares/` — auth and role middlewares
  - `seedAdmin.js` — helper script to create a default admin user
- `frontend/` — frontend application (TODO)

## Quickstart (backend)

Prerequisites: Node.js (16+), npm, MongoDB (or a hosted Mongo URI).

1. Open a terminal and change to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `backend/` with the following variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs
- (optional) `PORT` — port for the server (defaults to 5000)

4. (Optional) Seed an admin user:

```bash
node seedAdmin.js
```

5. Start the server (development):

```bash
npm run dev
```

Or start production mode:

```bash
npm start
```

The API is available at `http://localhost:5000` by default.

## Main API endpoints

Authentication
- `POST /api/auth/register` — register a new user
  - body: `{ name, email, password, role }` (role is usually `user`)
- `POST /api/auth/login` — login and receive a JWT
  - body: `{ email, password }`
- `GET /api/auth/profile` — protected, returns current user profile

Events
- `GET /api/events` — list events
- `GET /api/events/:id` — get event details
- `POST /api/events` — create an event (protected, role-based)

Registrations
- `POST /api/registrations` — register user for an event
- `GET /api/registrations` — list registrations (protected)

Note: Use `Authorization: Bearer <token>` header for protected routes.

## Seed admin

Running `node seedAdmin.js` will create a default admin account using credentials configured inside that script. Update `seedAdmin.js` or the `.env` values before running in production.

## Development notes

- Watch out for case sensitivity in model filenames on non-Windows systems.
- Ensure `backend/middlewares/authMiddleware.js` imports the `User` model and that async functions are declared correctly.

## Contributing / Next steps

- Implement the `frontend/` app and connect it to the backend APIs.
- Add tests and CI workflow.
- Harden authentication and input validation.

If you want, I can also:

- initialize a fresh Git repository and create an initial commit
- add a minimal `frontend/` starter (React + Vite)
- create Postman/openAPI docs for the API

---
Updated `README.md` to improve setup instructions and API summary.

