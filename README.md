# Tiffin Delivery Management System

A full-stack tiffin subscription platform with:

- `backend`: Node.js + Express + Prisma + PostgreSQL REST API
- `mobile`: React Native app using Expo and React Native Paper
- `admin`: React + Vite web dashboard for admins

## Folder structure

```text
TiffinDelivery/
|-- admin/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- context/
|   |   |-- layouts/
|   |   `-- pages/
|-- backend/
|   |-- prisma/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- utils/
|   |   `-- validators/
|-- mobile/
|   `-- src/
|       |-- api/
|       |-- components/
|       |-- context/
|       |-- navigation/
|       |-- screens/
|       `-- theme/
|-- schema.sql
`-- README.md
```

## Features

### Mobile app

- User sign up and login with JWT
- Browse tiffin providers in card layout
- View service details, menu samples, pricing, and meal type
- Subscribe to a monthly plan
- Profile with active subscriptions and history
- Bottom tab navigation with a clean Paper UI

### Admin dashboard

- Admin login
- Add, edit, and delete tiffin services
- View users
- View subscriptions
- Change subscription status
- Overview analytics for total users, active subscriptions, and total services

### Backend API

- JWT authentication
- MVC structure
- Validation middleware
- Centralized error handling
- Prisma schema and seed data
- PostgreSQL-ready SQL schema

## API endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Tiffin services

- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/services` admin only
- `PUT /api/services/:id` admin only
- `DELETE /api/services/:id` admin only

### Subscriptions

- `POST /api/subscriptions`
- `GET /api/subscriptions/user/:id`
- `GET /api/subscriptions` admin only
- `PATCH /api/subscriptions/:id/status` admin only

### Users

- `GET /api/users` admin only

## Default seeded accounts

- Admin: `admin@tiffin.com` / `Admin@123`
- User: `rahul@example.com` / `User@123`

## Backend setup

1. Go to [backend](/C:/Users/aakar/Dabbe/backend)
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and update the PostgreSQL connection string.
4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run migrations:

```bash
npx prisma migrate dev --name init
```

6. Seed the database:

```bash
npm run prisma:seed
```

7. Start the API:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`.

## Admin dashboard setup

1. Go to [admin](/C:/Users/aakar/Dabbe/admin)
2. Install dependencies:

```bash
npm install
```

3. Start the dashboard:

```bash
npm run dev
```

The admin dashboard runs on `http://localhost:5173`.

## Mobile app setup

1. Go to [mobile](/C:/Users/aakar/Dabbe/mobile)
2. Install dependencies:

```bash
npm install
```

3. Update the API base URL in [client.js](/C:/Users/aakar/Dabbe/mobile/src/api/client.js) to match your machine's local IP or emulator host.
4. Start Expo:

```bash
npm run start
```

## Notes

- The mobile app uses a hardcoded LAN URL in [client.js](/C:/Users/aakar/Dabbe/mobile/src/api/client.js). Replace `192.168.1.10` with your own machine IP for physical devices.
- For Android emulator, `10.0.2.2` usually maps to local host.
- Prisma is the source of truth for the database schema. [schema.sql](/C:/Users/aakar/Dabbe/schema.sql) is included for direct SQL setup if preferred.
