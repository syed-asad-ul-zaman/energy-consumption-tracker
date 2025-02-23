# Energy Consumption Tracker - Frontend

## Overview

The Energy Consumption Tracker frontend is a modern, responsive web application built using Next.js (App Router), Apollo Client, Recharts, Tailwind CSS with DaisyUI, and React Hook Form. This project allows users to view and manage gas consumption data through a professional dashboard and a detailed measurements page with reusable components and modals for adding, editing, and deleting records.

> **Note:**
> The frontend communicates with a GraphQL backend (built with NestJS, Prisma, etc.). Ensure your backend is running and properly configured before starting the frontend.

## Technologies and Rationale

- **Next.js (App Router):**
  - **Why:** Provides file-based routing, server-side rendering, and a modern architecture (with the App Router) for building scalable React applications.
  - **Benefits:** Simplifies routing and layout management, improves SEO and performance, and supports both server and client components.

- **Apollo Client:**
  - **Why:** Integrates seamlessly with GraphQL APIs to fetch and manage data.
  - **Benefits:** Offers caching, real-time updates, and an intuitive API for handling queries and mutations, making it easier to maintain and debug.

- **Recharts:**
  - **Why:** A composable charting library built on React.
  - **Benefits:** Provides responsive, customizable charts that can easily visualize time-series data such as gas consumption over time.

- **Tailwind CSS & DaisyUI:**
  - **Why:** Tailwind CSS is a utility-first CSS framework that accelerates UI development, while DaisyUI adds component classes that integrate with Tailwind.
  - **Benefits:** Allows rapid prototyping and consistent styling with minimal custom CSS. DaisyUI components (e.g., tables, modals, alerts) ensure a polished, professional look.

- **React Hook Form:**
  - **Why:** A lightweight and performant form library for React that simplifies validation and form state management.
  - **Benefits:** Reduces boilerplate code, improves form performance, and integrates well with TypeScript for enhanced type safety.

- **GraphQL:**
  - **Why:** A flexible API query language that allows clients to request exactly what they need.
  - **Benefits:** Minimizes data over-fetching, simplifies data management, and works seamlessly with Apollo Client.

## Project Structure

```plaintext
energy-consumption-tracker/
├── app/
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard page with Recharts
│   ├── measurements/
│   │   ├── layout.tsx           # Measurements layout
│   │   ├── page.tsx             # Main Measurements page (DataTable & Pagination)
│   ├── layout.tsx               # Global layout (wraps content with ApolloProvider, Sidebar, etc.)
│   └── globals.css              # Global styles (Tailwind CSS and DaisyUI configuration)
├── components/
│   ├── ui/
│   │   ├── DataTable.tsx        # Reusable DataTable component
│   │   └── Pagination.tsx       # Reusable Pagination component
│   └── measurement/
│         ├── AddDialog.tsx      # Add Measurement modal (with form)
│         ├── EditDialog.tsx     # Edit Measurement modal (with form)
│         └── DeleteDialog.tsx   # Delete Measurement modal
├── lib/
│   └── apolloClient.ts          # Apollo Client setup (reads URI from .env)
├── .env                       # Environment variables (e.g., NEXT_PUBLIC_GRAPHQL_URI)
├── package.json               # Project dependencies and scripts
└── README.md                  # This documentation file
```

## Setup Instructions

- **Prerequisites:**
  - Node.js (v20 or higher)
  - pnpm (or npm/yarn) package manager
  - A running GraphQL backend (configured to use NestJS, Prisma, etc.)
  - A running SQLite database (for the backend)

- **Steps:**

1. Clone the repository: `git clone https://github.com/syed-asad-ul-zaman/energy-consumption-tracker.git`
2. Navigate to the frontend directory: `cd energy-consumption-tracker/apps/frontend`
3. Install dependencies: `pnpm install`
4. Start the development server: `pnpm dev`
5. Open your browser and navigate to: `http://localhost:3000`
6. Ensure your backend is running and properly configured before starting the frontend