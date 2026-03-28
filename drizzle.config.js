import { config } from 'dotenv'
// Load .env.local first, then fall back to .env.development for local Docker DB
config({ path: '.env.local' })
config({ path: '.env.development' })

/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/db/schema.js',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
}
