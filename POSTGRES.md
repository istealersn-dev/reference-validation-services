# PostgreSQL 18 Database Schema Design

This document outlines the database schema required to support the **Scholarly Publisher Login** application. It leverages PostgreSQL 18 features such as `UUID` primary keys, `JSONB` for flexible data storage, and `TIMESTAMPTZ` for precise timekeeping.

---

## 1. Entity Relationship Overview

The core of the application revolves around the **User**. All other entities (API Keys, Validation Jobs, etc.) are directly related to the user.

*   **Users** `(1)` ↔ `(N)` **API Keys**
*   **Users** `(1)` ↔ `(N)` **Validation Jobs** (History)
*   **Users** `(1)` ↔ `(N)` **Support Tickets**
*   **Users** `(1)` ↔ `(1)` **Subscription** (Billing)

---

## 2. Tables Specification

### 2.1 Users Table (`users`)
Stores authentication data, profile information, and preferences.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier for the user. |
| `email` | `VARCHAR(255)` | `UNIQUE`, `NOT NULL` | User's email address (login credential). |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Bcrypt/Argon2 hash of the password. |
| `given_name` | `VARCHAR(100)` | | First name. |
| `family_name` | `VARCHAR(100)` | | Last name. |
| `display_name` | `VARCHAR(100)` | | Publicly visible name. |
| `company` | `VARCHAR(150)` | | Organization/Company name. |
| `job_title` | `VARCHAR(100)` | | Professional title. |
| `country` | `VARCHAR(100)` | | User's country of residence. |
| `avatar_url` | `TEXT` | | URL to stored avatar image. |
| `orcid_id` | `VARCHAR(19)` | `UNIQUE`, `NULLABLE` | Standard ORCID iD (e.g., 0000-0000-0000-0000). |
| `is_orcid_linked` | `BOOLEAN` | `DEFAULT FALSE` | Flag if authenticated via ORCID OAuth. |
| `consents` | `JSONB` | `DEFAULT '{}'` | Stores boolean flags: `{ "terms": true, "marketing": false }`. |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Account creation timestamp. |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Last profile update timestamp. |
| `last_login_at` | `TIMESTAMPTZ` | | Timestamp of last successful login. |

**Indexes:**
*   `BTREE` on `email` (for fast login lookups).
*   `BTREE` on `orcid_id`.

---

### 2.2 API Keys Table (`api_keys`)
Manages developer access tokens.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier for the key. |
| `user_id` | `UUID` | `FK -> users.id`, `NOT NULL` | Owner of the key. |
| `name` | `VARCHAR(100)` | `NOT NULL` | Friendly name (e.g., "Production Server"). |
| `prefix` | `VARCHAR(12)` | `NOT NULL` | Public prefix (e.g., `pk_live_...`) for identification. |
| `token_hash` | `TEXT` | `NOT NULL` | Hashed version of the full secret token. **Never store plain text.** |
| `status` | `VARCHAR(20)` | `DEFAULT 'active'` | Enum: `'active'`, `'revoked'`. |
| `last_used_at` | `TIMESTAMPTZ` | | When the key was last used for an API call. |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Creation timestamp. |

**Indexes:**
*   `BTREE` on `user_id`.
*   `BTREE` on `prefix` (to quickly find the key metadata during authentication before verifying hash).

---

### 2.3 Validation Jobs Table (`validation_jobs`)
Stores the history of file validations (reference checking).

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier for the job. |
| `user_id` | `UUID` | `FK -> users.id`, `NOT NULL` | User who initiated the job. |
| `filename` | `VARCHAR(255)` | `NOT NULL` | Original name of the uploaded file. |
| `storage_path` | `TEXT` | `NOT NULL` | Path to the file in Object Storage (S3/GCS). |
| `status` | `VARCHAR(20)` | `DEFAULT 'uploading'` | Enum: `'uploading'`, `'processing'`, `'completed'`, `'failed'`. |
| `stats` | `JSONB` | `DEFAULT '{}'` | Validation results: `{ "total": 142, "valid": 128, "invalid": 14 }`. |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Job start time. |
| `completed_at` | `TIMESTAMPTZ` | | Job finish time. |

**Indexes:**
*   `BTREE` on `user_id`.
*   `BTREE` on `created_at` (for sorting history).
*   `GIN` on `stats` (if you need to query/filter by validation count, e.g., "Show jobs with > 100 refs").

---

### 2.4 Support Tickets Table (`support_tickets`)
Manages help requests submitted via the Help & Support page.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier for the ticket. |
| `user_id` | `UUID` | `FK -> users.id`, `NOT NULL` | User who submitted the ticket. |
| `category` | `VARCHAR(50)` | `NOT NULL` | Enum: `'technical'`, `'billing'`, `'feature'`, `'other'`. |
| `subject` | `VARCHAR(255)` | `NOT NULL` | Brief summary of the issue. |
| `message` | `TEXT` | `NOT NULL` | Detailed description. |
| `status` | `VARCHAR(20)` | `DEFAULT 'open'` | Enum: `'open'`, `'in_progress'`, `'resolved'`, `'closed'`. |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Submission timestamp. |

**Indexes:**
*   `BTREE` on `user_id`.
*   `BTREE` on `status`.

---

### 2.5 Subscriptions Table (`subscriptions`)
Tracks user billing status and plan tier.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier. |
| `user_id` | `UUID` | `FK -> users.id`, `UNIQUE`, `NOT NULL` | Owner of the subscription (1:1 relationship). |
| `stripe_customer_id`| `VARCHAR(100)` | `UNIQUE` | External payment provider ID. |
| `plan_tier` | `VARCHAR(50)` | `DEFAULT 'free'` | Enum: `'free'`, `'pro'`, `'enterprise'`. |
| `status` | `VARCHAR(20)` | `DEFAULT 'active'` | Enum: `'active'`, `'canceled'`, `'past_due'`. |
| `current_period_start`| `TIMESTAMPTZ` | | Start of billing cycle. |
| `current_period_end` | `TIMESTAMPTZ` | | End of billing cycle. |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Last update timestamp. |

**Indexes:**
*   `BTREE` on `user_id`.

---

## 3. SQL Implementation Scripts (Snippets)

### Enable UUID Extension
PostgreSQL 18 typically includes this, but it's good practice to ensure it's enabled.
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Create Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    display_name VARCHAR(100),
    company VARCHAR(150),
    job_title VARCHAR(100),
    country VARCHAR(100),
    avatar_url TEXT,
    orcid_id VARCHAR(19) UNIQUE,
    is_orcid_linked BOOLEAN DEFAULT FALSE,
    consents JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);
```

### Create Validation Jobs Table
```sql
CREATE TABLE validation_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    storage_path TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'uploading',
    stats JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX idx_validation_jobs_user ON validation_jobs(user_id);
CREATE INDEX idx_validation_jobs_created ON validation_jobs(created_at DESC);
```

## 4. Best Practices for This Application

1.  **Cascading Deletes**: 
    - When deleting a User (Danger Zone > Delete Account), use `ON DELETE CASCADE` for foreign keys in `api_keys`, `validation_jobs`, etc., to automatically clean up orphaned data.

2.  **JSONB Usage**: 
    - The `consents` and `stats` columns use `JSONB`. This allows you to add new consent flags (e.g., `cookie_policy`) or new validation metrics (e.g., `formatting_errors`) without altering the table schema.

3.  **Security**:
    - **Never store API keys in plain text.** The `api_keys` table only stores the `token_hash`. The actual key is shown to the user *once* upon creation (handled in React state) and never again.
    - Use Row Level Security (RLS) if you expose the DB via Supabase or PostgREST.

4.  **Enums vs Strings**:
    - For simplicity and flexibility in updates, `VARCHAR` with application-level validation is often easier than hard database `ENUM` types for fields like `status` or `category`.
