# Job Application Tracker

A full-stack web application to track your job applications, manage interviews, and monitor your job search progress.

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Backend  | Node.js + Express + TypeScript          |
| Database | PostgreSQL + Prisma ORM                 |
| Frontend | React + TypeScript + Vite + TailwindCSS |
| Auth     | JWT (JSON Web Tokens)                   |
| Testing  | Jest (backend) + Vitest (frontend)      |
| State    | Zustand + TanStack React Query          |

## Folder Structure

```text
job-application-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Auth & error middleware
│   │   ├── services/         # Business logic
│   │   ├── lib/              # Prisma singleton
│   │   ├── utils/            # JWT, password, response, validation, logger
│   │   └── types/            # Express type extensions
│   ├── prisma/               # Schema, migrations, seed
│   └── tests/                # Jest unit tests
└── frontend/
    └── src/
        ├── components/       # Reusable UI components
        ├── pages/            # Page-level components
        ├── hooks/            # Custom React hooks
        ├── services/         # Axios API calls
        ├── store/            # Zustand state stores
        └── types/            # TypeScript interfaces
```

## Backend Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (or Docker)

### Steps

```bash
cd backend
cp .env.example .env    # then edit values if needed
npm install
npx prisma migrate dev  # creates the database tables
npm run db:seed         # optional: seed demo data
npm run dev             # starts server on :3001
```

### Environment Variables

| Variable       | Description               |
|----------------|---------------------------|
| DATABASE_URL   | PostgreSQL connection URL |
| JWT_SECRET     | Token signing secret      |
| JWT_EXPIRES_IN | Token lifetime (e.g. 7d)  |
| PORT           | HTTP port (default 3001)  |
| NODE_ENV       | Environment name          |

### npm Scripts

| Script               | Description                       |
|----------------------|-----------------------------------|
| `npm run dev`        | Start dev server with nodemon     |
| `npm run build`      | Compile TypeScript to `dist/`     |
| `npm start`          | Run compiled production build     |
| `npm test`           | Run Jest unit tests               |
| `npm run db:migrate` | Run Prisma migrations             |
| `npm run db:studio`  | Open Prisma Studio UI             |
| `npm run db:seed`    | Seed demo user + sample jobs      |

## API Endpoints

| Method | Route               | Auth | Description                          |
|--------|---------------------|------|--------------------------------------|
| POST   | /api/auth/register  | No   | Create account                       |
| POST   | /api/auth/login     | No   | Login and receive JWT                |
| GET    | /api/auth/profile   | Yes  | Get current user profile             |
| POST   | /api/auth/logout    | Yes  | Logout (client discards token)       |
| GET    | /api/jobs           | Yes  | List jobs (paginated, filterable)    |
| POST   | /api/jobs           | Yes  | Create a new job entry               |
| GET    | /api/jobs/stats     | Yes  | Job counts grouped by status         |
| GET    | /api/jobs/:id       | Yes  | Get a single job                     |
| PUT    | /api/jobs/:id       | Yes  | Update a job                         |
| DELETE | /api/jobs/:id       | Yes  | Delete a job                         |
| GET    | /api/stats          | Yes  | Dashboard stats                      |
| GET    | /api/stats/timeline | Yes  | Applications grouped by month (6 mo) |
| GET    | /health             | No   | Health check                         |

Query params for `GET /api/jobs`: `?status=APPLIED&search=google&page=1&limit=10`

## Job Status Flow

`WISHLIST` → `APPLIED` → `INTERVIEW` → `OFFER` or `REJECTED`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev    # starts on :5173
```

## Getting Started (Full Stack)

1. **Start PostgreSQL** (Docker or local)

2. **Backend**

   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run db:migrate
   npm run dev            # http://localhost:3001
   ```

3. **Frontend** (in a separate terminal)

   ```bash
   cd frontend
   npm install
   npm run dev            # http://localhost:5173
   ```

4. Open [http://localhost:5173](http://localhost:5173) — register an account and start tracking.
