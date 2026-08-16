# Exclusive Restaurant Uniforms

A Next.js website with a Neon-backed CMS and client-enquiry CRM.

## Admin

Visit `/admin` to manage website copy, uniform designs, media, and enquiries. Authentication uses a secure HTTP-only signed session cookie.

## Environment

Copy `.env.example` to `.env.local` for local development. Configure the same values in Vercel for Preview and Production:

- `DATABASE_URL` — Neon pooled PostgreSQL connection string
- `AUTH_SECRET` — random secret of at least 32 characters
- `ADMIN_EMAIL` — administrator sign-in email
- `ADMIN_PASSWORD_HASH` — bcrypt hash, never a plain-text password
- `BLOB_READ_WRITE_TOKEN` — optional; enables Vercel Blob uploads in a future media-storage pass

Generate the bcrypt password hash locally and add only the resulting hash to Vercel. Never commit or send the plain-text password in chat.

Create the database tables after setting `DATABASE_URL`:

```bash
npm run db:push
```

## Development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
```
