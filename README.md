# Energy Consumption Tracker Monorepo

## Overview

The Energy Consumption Tracker project is a full-stack application for logging and managing gas consumption over time. This monorepo houses both the backend API and the frontend client in a unified codebase, managed using [Turborepo](https://turbo.build/). This setup streamlines development, improves build times through caching and parallel execution, and simplifies dependency management across projects.

## Project Structure

The repository is organized as a monorepo using Turborepo. The primary structure is as follows:

```plaintext
energy-consumption-tracker/
├── apps/
│   ├── api/              # Backend API built with NestJS, Prisma, GraphQL, and Apollo Server
│   └── frontend/         # Frontend built with Next.js, Apollo Client, Tailwind CSS, DaisyUI, and Recharts
├── packages/             # (Optional) Shared libraries or utilities
├── turbo.json            # Turborepo configuration file
└── README.md             # This file
```

## Why Use Turborepo?

- Turborepo is chosen to manage this monorepo because:

### Efficient Builds:

- Turbo caches and runs tasks in parallel, reducing build times significantly across multiple projects.

### Simplified Dependency Management:

- Shared dependencies can be managed at the root level, ensuring consistency and reducing duplication.

### Coordinated Development:

- Both backend and frontend teams can work within the same repository, making it easier to share code, enforce consistent standards, and manage versioning.

### Scalability:

- As the project grows, adding new packages or apps (e.g., shared UI components or utilities) is straightforward with Turborepo.

## Backend Overview (apps/api)

- The backend is built with:

### NestJS:

- Provides a modular, scalable architecture with built-in support for GraphQL, dependency injection, and TypeScript.

### GraphQL & Apollo Server:

- Exposes a flexible API so clients can request exactly the data they need.

### Prisma ORM:

- Offers a type-safe and efficient way to interact with the database.
- SQLite (or PostgreSQL):
- SQLite is used for development simplicity, with the option to switch to PostgreSQL for production if needed.

### Key Features

- **Measurement Management:**
- CRUD operations for gas consumption measurements.
- Soft Delete:
- Implemented using a deletedAt field to retain data history.
- Data Aggregation:
- Aggregated queries for chart data (e.g., gas consumption by date).

## Frontend Overview (apps/frontend)

- The frontend is built with:

### Next.js (App Router):

- Provides file-based routing and hybrid rendering, ensuring fast performance and SEO.

### Apollo Client:

- Manages GraphQL queries and mutations with caching and efficient state management.

### Tailwind CSS & DaisyUI:

- Enable rapid, utility-first styling and consistent, prebuilt UI components.

### Recharts:

- Used for dynamic data visualization on the dashboard.

### React Hook Form:

- Simplifies form handling and validation in modals and pages.

### Key Features

- **Dashboard:**
- Displays gas consumption trends using Recharts.
- **Measurements Page:**
- A data table with pagination, and modals for adding, editing, and deleting measurements.
- **Responsive & Modern UI:**
- Designed with Tailwind and DaisyUI for a professional look and feel.

## Setup Instructions

- **Prerequisites**
- Node.js (v22+)
- pnpm (or npm/yarn)
- A running GraphQL backend (for full-stack functionality)
- Turborepo CLI (optional, but recommended)

## Steps to Set Up the Monorepo

Clone the Repository:

```bash
git clone https://github.com/syed-asad-ul-zaman/energy-consumption-tracker.git
cd energy-consumption-tracker
```

**Install Dependencies:**

```bash
pnpm install
```
**Configure Environment Variables:**

Create a .env file at the root (if not present) with the required variables. For example:

dotenv
Copy
# GraphQL endpoint for the frontend
```file
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```
Run the Development Servers:

Using Turborepo, run:
```bash
pnpm turbo run dev
```

This command will start both the backend (apps/api) and the frontend (apps/frontend) development servers concurrently.

**Access the Application:**

Frontend: http://localhost:3000
Backend GraphQL Playground: http://localhost:8000/graphql (if enabled)