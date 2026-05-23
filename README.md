# ResumeAI — AI-Powered Resume Analyzer

A full-stack SaaS application that analyzes resumes, generates ATS scores, identifies keyword gaps, and creates tailored cover letters — powered by OpenRouter AI and built with Next.js App Router.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Pages & Routes](#pages--routes)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Database](#database)
- [Role-Based Access](#role-based-access)

---

## Overview

ResumeAI lets users upload their resume (PDF or plain text) against a job description and instantly get:

- An **ATS compatibility score** (0–100)
- **Section-by-section scoring** across Summary, Skills, Experience, Education, and Formatting
- **Keyword gap analysis** — which keywords are present and which are missing
- **Actionable suggestions** to improve the resume
- **Tone detection** (Professional / Casual / Mixed)
- **AI-generated cover letters** tailored to the target role and company

Guest users get a fast rule-based analysis. Logged-in users get a deeper AI-powered analysis via OpenRouter.

---

## Features

| Feature                             | Guest | Logged-in User | Admin |
| ----------------------------------- | ----- | -------------- | ----- |
| Resume analysis (rule-based)        | ✅    | ✅             | ✅    |
| Resume analysis (AI via OpenRouter) | ❌    | ✅             | ✅    |
| Cover letter generation             | ❌    | ✅             | ✅    |
| Save & view analysis history        | ❌    | ✅             | ✅    |
| Resume builder                      | ❌    | ✅             | ✅    |
| Public explore feed                 | ✅    | ✅             | ✅    |
| Admin dashboard                     | ❌    | ❌             | ✅    |

**Core capabilities:**

- Upload PDF (up to 5 MB) or paste resume text directly
- Dual analysis mode: rule-based engine (no API key needed) and OpenRouter AI
- Cover letter generator saved per-user to MongoDB
- Resume builder with template selector and live preview
- Public analysis feed with filtering
- Blog CMS (admin-managed posts with slugs, tags, and publish toggle)
- Contact form with admin inbox
- Admin dashboard: overview stats, user management, analysis browser, blog editor, contact inbox, analytics

---

## Tech Stack

| Layer           | Technology                                  |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 16 (App Router)                     |
| Language        | TypeScript                                  |
| Styling         | Tailwind CSS v4, shadcn/ui, Radix UI        |
| Animation       | Framer Motion                               |
| Auth            | NextAuth.js v4 (Credentials + Google OAuth) |
| Database        | MongoDB (native driver, no Mongoose)        |
| AI              | OpenRouter API (free-tier model)            |
| PDF Parsing     | pdf-parse-new (SmartPDFParser)              |
| Forms           | React Hook Form + Zod                       |
| Charts          | Recharts                                    |
| Notifications   | Sonner                                      |
| Package Manager | pnpm                                        |

---

## Project Structure

```
resume-analyzer-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Register page
│   ├── admin/              # Admin-only dashboard (role-gated)
│   │   ├── analyses/
│   │   ├── analytics/
│   │   ├── blog/
│   │   ├── contacts/
│   │   └── users/
│   ├── dashboard/          # User dashboard (auth-gated)
│   │   ├── analyses/       # Saved analyses history
│   │   ├── cover-letters/  # Saved cover letters
│   │   ├── profile/
│   │   ├── resume-builder/
│   │   └── upload/
│   ├── api/                # API routes
│   │   ├── analyze/        # POST — run resume analysis
│   │   ├── cover-letter/   # POST — generate cover letter
│   │   ├── analyses/       # GET/DELETE saved analyses
│   │   ├── blog/           # Blog CRUD
│   │   ├── contacts/       # Contact form
│   │   ├── register/       # User registration
│   │   ├── user/           # User-scoped data
│   │   └── admin/          # Admin-only endpoints
│   ├── analyze/            # Public analyze page
│   ├── results/[id]/       # Analysis result detail
│   ├── explore/            # Public analyses feed
│   ├── blog/               # Blog listing + post detail
│   ├── pricing/
│   ├── about/
│   ├── contact/
│   └── faq/
├── components/
│   ├── analyze/            # DropZone upload component
│   ├── dashboard/          # StatsCards, ScoreTrendChart
│   ├── explore/            # AnalysisCard, FilterPanel
│   ├── home/               # Landing page sections
│   ├── layout/             # Navbar, Footer, sidebars
│   ├── results/            # AtsGauge, KeywordGaps, SuggestionsList, CoverLetterTab
│   └── resume-builder/     # ResumeForm, ResumePreview, TemplateSelector
├── lib/
│   ├── analyzer.ts         # Rule-based resume analysis engine
│   ├── openrouter.ts       # OpenRouter AI client
│   ├── auth.ts             # NextAuth config
│   ├── db.ts               # MongoDB connection singleton
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── templates.ts        # Resume builder templates
│   └── utils.ts            # Utility helpers
├── hooks/
│   └── useDebounce.ts
├── types/
│   └── next-auth.d.ts      # Session type extensions
└── proxy.ts                # NextAuth middleware (route protection)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- OpenRouter API key — free at [openrouter.ai](https://openrouter.ai)
- Google OAuth credentials (optional, for Google sign-in)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/resume-analyzer-ai.git
cd resume-analyzer-ai

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in all required values (see section below)

# 4. Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
MONGODB_DB=resume_ai

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenRouter AI
OPENROUTER_API_KEY=your-openrouter-api-key
```

> **Note:** The app works without `OPENROUTER_API_KEY` — guest users always get the rule-based analysis. Only logged-in AI analysis requires it.

---

## How It Works

### Analysis Pipeline

```
User uploads PDF / pastes text
        ↓
PDF parsed with pdf-parse-new SmartPDFParser
        ↓
Guest?  → rule-based engine (lib/analyzer.ts)
Logged in? → OpenRouter AI API (lib/openrouter.ts)
        ↓
Result saved to MongoDB (analyses collection)
        ↓
Redirect to /results/[id]
```

### Rule-Based Engine (`lib/analyzer.ts`)

The local engine scores resumes without any API key:

- **Section detection** — regex patterns check for Summary, Skills, Experience, Education headings
- **Keyword matching** — compares resume against 27 common tech keywords (or job description keywords if provided)
- **Bullet strength** — counts action verbs (led, built, developed, etc.)
- **Formatting score** — evaluates length, bullet count, and line structure
- **ATS score formula:** `sectionAvg × 0.5 + keywordScore × 0.3 + bulletStrength × 0.2`

### AI Engine (`lib/openrouter.ts`)

For logged-in users, the resume text is sent to OpenRouter with a structured JSON prompt. The model returns all the same fields (`atsScore`, `sectionScores`, `keywords`, `suggestions`, `tone`, `bulletStrength`) with deeper semantic understanding.

### Cover Letter Generation

Authenticated users can generate a cover letter from any analysis result. The resume text, job title, company, and optional job description are sent to OpenRouter. The generated letter is saved to the `coverLetters` MongoDB collection.

---

## Pages & Routes

| Route                       | Access        | Description                                            |
| --------------------------- | ------------- | ------------------------------------------------------ |
| `/`                         | Public        | Landing page with hero, features, pricing, FAQ         |
| `/analyze`                  | Public        | Upload resume + paste job description                  |
| `/results/[id]`             | Public        | Full analysis result with score, keywords, suggestions |
| `/explore`                  | Public        | Browse public analyses with filtering                  |
| `/blog`                     | Public        | Blog listing                                           |
| `/blog/[slug]`              | Public        | Blog post detail                                       |
| `/about`                    | Public        | About page                                             |
| `/contact`                  | Public        | Contact form                                           |
| `/pricing`                  | Public        | Pricing page                                           |
| `/faq`                      | Public        | FAQ page                                               |
| `/login`                    | Guest only    | Login (credentials or Google)                          |
| `/register`                 | Guest only    | Registration                                           |
| `/dashboard`                | Auth required | User overview with stats and charts                    |
| `/dashboard/analyses`       | Auth required | Saved analyses history                                 |
| `/dashboard/cover-letters`  | Auth required | Saved cover letters                                    |
| `/dashboard/resume-builder` | Auth required | Resume builder with template + live preview            |
| `/dashboard/upload`         | Auth required | Resume upload shortcut                                 |
| `/dashboard/profile`        | Auth required | Profile settings                                       |
| `/admin`                    | Admin only    | Admin overview dashboard                               |
| `/admin/analyses`           | Admin only    | All analyses browser                                   |
| `/admin/users`              | Admin only    | User management                                        |
| `/admin/blog`               | Admin only    | Blog post manager                                      |
| `/admin/contacts`           | Admin only    | Contact form inbox                                     |
| `/admin/analytics`          | Admin only    | Platform analytics                                     |

---

## API Reference

All API routes are under `/api/`.

### `POST /api/analyze`

Accepts `multipart/form-data`.

| Field            | Type       | Required         | Description                          |
| ---------------- | ---------- | ---------------- | ------------------------------------ |
| `file`           | File (PDF) | One of file/text | Resume PDF (max 5 MB)                |
| `text`           | string     | One of file/text | Plain text resume                    |
| `jobDescription` | string     | No               | Target job description               |
| `jobTitle`       | string     | No               | Target job title                     |
| `isPublic`       | boolean    | No               | Make analysis public on explore feed |

Returns the full analysis object with an `id` field for the saved MongoDB document.

---

### `POST /api/cover-letter`

Auth required. Accepts JSON.

```json
{
  "resumeText": "...",
  "jobTitle": "Frontend Developer",
  "company": "Acme Corp",
  "jobDescription": "...",
  "analysisId": "optional-mongo-id"
}
```

Returns `{ id, content }`.

---

### `GET /api/analyses`

Returns all public analyses. Used by the `/explore` page.

### `GET /api/user/analyses`

Auth required. Returns the logged-in user's saved analyses.

### `DELETE /api/analyses/[id]`

Auth required. Deletes a specific analysis by ID.

### `GET|POST /api/blog`

Public GET returns published blog posts. Admin POST creates a new post.

### `POST /api/contacts`

Saves a contact form submission to MongoDB.

### `POST /api/register`

Creates a new user account with bcrypt-hashed password.

---

## Authentication

Built with **NextAuth.js v4** (`/lib/auth.ts`).

Two providers are configured:

- **Credentials** — email + password, verified against the `users` MongoDB collection using `bcryptjs`
- **Google OAuth** — requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

Sessions use **JWT strategy**. The JWT and session callbacks expose `user.id` and `user.role` to the app.

Route protection is handled by the NextAuth middleware in `proxy.ts`:

- `/dashboard/*` — requires any authenticated session
- `/admin/*` — requires `role === "admin"`; redirects to `/dashboard` otherwise

To create an admin user, insert a document directly into MongoDB:

```js
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "<bcrypt-hashed-password>",
  role: "admin",
  createdAt: new Date(),
});
```

---

## Database

MongoDB is used with the **native driver** (no Mongoose). The connection is managed as a singleton in `lib/db.ts` to avoid multiple connections during hot-reload in development.

### Collections

| Collection     | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| `users`        | User accounts (name, email, hashed password, role)                    |
| `analyses`     | Resume analysis results (linked to userId, nullable for guests)       |
| `coverLetters` | AI-generated cover letters (linked to userId and optional analysisId) |
| `blog`         | Blog posts (slug, title, content, tags, published flag)               |
| `contacts`     | Contact form submissions                                              |

---

## Role-Based Access

| Role      | Capabilities                                                                          |
| --------- | ------------------------------------------------------------------------------------- |
| **Guest** | Analyze resumes (rule-based), view public results, browse explore feed, read blog     |
| **User**  | Everything above + AI analysis, cover letter generation, save history, resume builder |
| **Admin** | Everything above + full admin dashboard, user management, blog CMS, contact inbox     |
