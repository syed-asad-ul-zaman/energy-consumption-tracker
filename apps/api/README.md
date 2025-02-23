# Energy Consumption Tracker Backend

## Introduction

The **Energy Consumption Tracker** backend is a robust and scalable API built with [NestJS](https://nestjs.com/) and [GraphQL](https://graphql.org/), powered by [Apollo Server](https://www.apollographql.com/docs/apollo-server/). This project leverages [Prisma ORM](https://www.prisma.io/) for type-safe database operations and uses [SQLite](https://www.sqlite.org/index.html) as the database engine for simplicity during development and testing.

The backend provides functionality to manage gas consumption measurements, including creating, updating, and soft-deleting records. It also includes advanced features such as pagination and chart data aggregation.

## Technologies & Tools

- **NestJS:**
  - **Reason:** Provides a modular architecture with dependency injection, supports TypeScript out of the box, and offers seamless integration with GraphQL.
  - **Benefits:** Encourages a clean and scalable project structure, reduces boilerplate code, and improves maintainability.

- **GraphQL & Apollo Server:**
  - **Reason:** Enables flexible and efficient API design where clients can request exactly what they need.
  - **Benefits:** Minimizes data over-fetching, supports real-time data with subscriptions (if needed), and offers powerful developer tools like GraphQL Playground.

- **Prisma ORM:**
  - **Reason:** Offers a modern, type-safe approach to interact with databases.
  - **Benefits:** Simplifies database operations with auto-generated queries, enhances developer productivity with code completion, and provides an intuitive migration system.

- **SQLite:**
  - **Reason:** Chosen for its simplicity during development. No additional setup is required, making it ideal for prototyping and small to medium projects.
  - **Benefits:** Lightweight, fast, and zero-configuration.

- **TypeScript:**
  - **Reason:** Improves code quality with static typing.
  - **Benefits:** Enhances maintainability, readability, and reduces runtime errors.

- **Optional - Docker:**
  - **Reason:** For containerization and streamlined deployments.
  - **Benefits:** Provides consistency across different environments and simplifies production deployments.

## Project Structure

```plaintext
energy-consumption-tracker/
├── src/
│   ├── app.module.ts        # Main application module
│   ├── main.ts              # Application entry point
│   ├── prisma/              # Prisma ORM setup and service
│   ├── measurement/         # Measurement module (resolvers, services, DTOs, entities)
│   ├── user/                # User module (resolvers, services, DTOs, entities)
│   └── common/              # Common utilities (e.g., pagination arguments)
├── prisma/
│   └── schema.prisma        # Prisma schema (configured for SQLite)
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation (this file)
```

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/syed-asad-ul-zaman/energy-consumption-tracker.git
   cd apps/api
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Configure Prisma
   - The project uses SQLite by default. Verify the datasource in prisma/schema.prisma:

     ```text
     datasource db {
       provider = "sqlite"
       url      = "file:./dev.db"
     }
     ```

   - Run migrations to create the database

     ```bash
     npx prisma migrate dev --name init
     npx prisma generate
     ```

4. Start the Application
   - Start the NestJS server in development mode:

     ```bash
     pnpm run dev
     ```

   - Open a browser and navigate to [http://localhost:8000](http://localhost:8000) to see Application home page.
   - The GraphQL Playground interface is available at [http://localhost:8000/graphql](http://localhost:8000/graphql)