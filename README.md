# Campus Event Management

Simple Campus Event Management project (work-in-progress).

## Project structure
- `backend/` — Express + MongoDB API server
  - `server.js` — app entrypoint
  - `config/db.js` — MongoDB connection helper
  - `models/` — Mongoose models (User)
  - `controllers/` — route handlers (authController)
  - `routes/` — Express routers (authRoutes)
  - `middlewares/` — auth middleware
  - `seedAdmin.js` — one-off script to create an admin user
- `frontend/` — currently empty (frontend not implemented yet)

## Backend details

- Language: JavaScript (Node.js)
- Frameworks / libs: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`
- Entry point: `backend/server.js` (listens on port 5000 by default)

### Important scripts (from `backend/package.json`)
- `npm start` — run `node server.js`
- `npm run dev` — run `nodemon server.js` (dev)

### Environment variables
Created a `.env` file in `backend/`

Optional:
- `PORT` — port for the server (defaults to 5000 in `server.js`)

### API endpoints (current)

- `GET /` — health / welcome message
- `POST /api/auth/register` — register a new user
  - body: `{ name, email, password, role }`
  - note: registration as `admin` is rejected by the controller
- `POST /api/auth/login` — login
  - body: `{ email, password }`
  - returns: JWT token and basic user info
- `GET /api/auth/profile` — protected route, returns user profile
  - requires `Authorization: Bearer <token>` header

### Seed admin
Run the seed script to create a default admin user (uses `.env` `MONGO_URI`):

```bash
cd backend
node seedAdmin.js
```

Default seeded admin credentials (from `seedAdmin.js`):
- email: `admin@campus.com`
- password: `admin@123`

## Setup & run (backend)

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.

4. (Optional) Seed the admin user:

```bash
node seedAdmin.js
```

5. Start the server:

```bash
npm run dev
# or
npm start
```

## Known issues and notes (as of now)
- `backend/middlewares/authMiddleware.js` has bugs to fix before protected routes work:
  - The `protect` function uses `await` but is not declared `async`.
  - `User` is referenced but not imported in that file.
  - These issues will cause runtime errors when hitting protected routes.
- File naming/casing: controllers and seed script import the model as `../models/User` while the file is `models/user.js`; this works on Windows (case-insensitive) but may cause issues on case-sensitive filesystems.

## Next steps / suggestions

- Fix `authMiddleware.js`: import `User` and declare `protect` as `async`.
- Add more models and controllers for events, registrations, and organizers.
- Implement the frontend in `frontend/` and wire it to the API.
- Add tests and CI, and document API request/response examples.

## Progress

- **Draft README content:** completed — initial README created and cleaned.
- **Add setup and run instructions:** completed — installation and run steps added for the backend.
- **Include API routes and env vars:** completed — documented auth routes and required environment variables.
- **Note known issues and next steps:** completed — middleware and casing issues noted.
- **Remove stray characters from `README.md`:** completed — fixed hidden/null characters that broke preview.
- **Remove `nodmeon` dependency:** completed — uninstalled incorrect package and updated `backend/package.json`.
- **Add `.gitignore` with `.env`:** completed — `.gitignore` added at repo root (includes `.env`).
- **Remove git remote connections:** completed — removed `origin` remote.
- **Delete `.git` folder (fully disconnect repo):** completed — repository fully disconnected from Git.

All tracked tasks above are completed. If you'd like, I can now initialize a fresh Git repository and create the initial commit for you.

