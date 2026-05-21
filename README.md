# Job Application Tracker - متابعة التقديمات 🎯
<!-- Franco: da el project bta3 el job applications - yesa3dak tetab3 el wazaef ely ba3tatelhom -->

## Description
A full-stack web application to track your job applications, manage interviews, and monitor your job search progress — all in one place.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Frontend | React + TypeScript + Vite + TailwindCSS |
| Auth | JWT (JSON Web Tokens) |
| Testing | Jest (backend) + Vitest (frontend) |
| State | Zustand + TanStack React Query |

## Folder Structure
```
job-application-tracker/
├── backend/                  # Express API server
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/        # Auth & error middleware
│   │   ├── services/         # Business logic layer
│   │   ├── models/           # Type models
│   │   └── utils/            # JWT & password helpers
│   ├── prisma/               # Database schema & migrations
│   └── tests/                # Jest test files
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # Axios API calls
│   │   ├── store/            # Zustand state stores
│   │   └── types/            # TypeScript interfaces
└── docker-compose.yml        # Local dev PostgreSQL
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/MoamenFouad/job-application-tracker.git
cd job-application-tracker
```

### 2. Start the Database
```bash
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npx prisma migrate dev
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 5. Access the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login & get JWT |
| GET | /api/jobs | List all jobs |
| POST | /api/jobs | Create new job |
| GET | /api/jobs/:id | Get job detail |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |
| GET | /api/stats | Get status summary |

## Job Status Flow
`WISHLIST` → `APPLIED` → `INTERVIEW` → `OFFER` or `REJECTED`
