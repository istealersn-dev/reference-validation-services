# Fastify Backend Architecture & API Specification

This document outlines the backend architecture for the **Scholarly Publisher Login** application, designed as a modular monolith or micro-service using **Fastify**. It is optimized for high performance, low overhead, and developer experience.

---

## 1. Technology Stack

*   **Runtime:** Node.js (v20+ LTS)
*   **Framework:** [Fastify](https://fastify.dev/) (Low overhead, schema-based validation)
*   **Language:** TypeScript
*   **Database:** PostgreSQL 18
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (Type-safe, lightweight) or Prisma
*   **Validation:** [Zod](https://zod.dev/) (Integration via `fastify-type-provider-zod`)
*   **Authentication:** `@fastify/jwt` & `@fastify/cookie`

---

## 2. Project Structure

Recommended folder structure for scalability and separation of concerns.

```text
src/
├── app.ts                # App entry point, plugin registration
├── server.ts             # Server listener configuration
├── config/               # Environment variables (convict or dotenv)
├── db/                   # Database connection & schema definitions
│   ├── index.ts
│   ├── schema.ts         # Drizzle/Prisma schema
│   └── migrations/
├── modules/              # Feature-based modules (Domain Driven)
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.service.ts
│   ├── users/
│   ├── validation/
│   └── api-keys/
├── plugins/              # Custom Fastify plugins (Guards, Swagger, etc.)
│   ├── jwt.ts
│   └── swagger.ts
└── utils/                # Shared utilities (Logger, Error handling)
```

---

## 3. API Endpoints

### 3.1 Authentication Module (`/api/v1/auth`)

| Method | Path | Description | Body / Query | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account. | `{ email, password, name, company }` | No |
| `POST` | `/login` | Authenticate using email/password. | `{ email, password }` | No |
| `POST` | `/refresh` | Refresh access token using cookie. | - | No (Cookie) |
| `POST` | `/logout` | Clear auth cookies. | - | Yes |
| `GET` | `/orcid` | Initiate ORCID OAuth flow. | `?redirect_url=...` | No |
| `GET` | `/orcid/callback` | Handle ORCID OAuth redirect code. | `?code=...` | No |

### 3.2 User Module (`/api/v1/users`)

| Method | Path | Description | Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/me` | Get current user profile. | - | Yes |
| `PATCH` | `/me` | Update profile details. | `{ displayName, avatarUrl, jobTitle }` | Yes |
| `DELETE` | `/me` | Delete account (Danger Zone). | - | Yes |
| `GET` | `/me/billing` | Get subscription status (Stripe). | - | Yes |

### 3.3 Validation Module (`/api/v1/validation`)

| Method | Path | Description | Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/upload` | Upload file for validation. | `FormData (file)` | Yes |
| `GET` | `/jobs` | List past validation jobs (History). | `?limit=10&page=1` | Yes |
| `GET` | `/jobs/:id` | Get status/result of specific job. | - | Yes |
| `GET` | `/jobs/:id/download` | Download CSV report. | `?type=valid|invalid` | Yes |

### 3.4 API Keys Module (`/api/v1/api-keys`)

| Method | Path | Description | Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | List active API keys. | - | Yes |
| `POST` | `/` | Generate a new API key. | `{ name }` | Yes |
| `DELETE` | `/:id` | Revoke an API key. | - | Yes |

---

## 4. Implementation Guidelines

### Setup Fastify with Zod
Use `fastify-type-provider-zod` for best-in-class developer experience and automatic Swagger documentation generation.

```typescript
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const authRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
    },
    async (request, reply) => {
      // Implementation
    }
  );
};
```

### Database Connection (Drizzle Example)
Establish a connection pool to PostgreSQL 18.

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
```

### ORCID Integration Logic
1.  **Redirect**: Construct the ORCID OAuth URL with `client_id`, `scope=/authenticate`, and `redirect_uri`.
2.  **Callback**: Exchange the `code` received for an `access_token` and `orcid` iD.
3.  **Link/Create**:
    *   Check if `users.orcid_id` exists.
    *   If yes, log them in.
    *   If no, either create a new user (Signup) or link to authenticated user (Settings).

### Error Handling
Register a global error handler to sanitize errors before sending them to the client.

```typescript
app.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: error.validation,
    });
  }
  request.log.error(error);
  return reply.status(500).send({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  });
});
```
