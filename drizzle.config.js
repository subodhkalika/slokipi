import { config } from 'dotenv'
config({ path: '.env.local' })

/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/db/schema.js',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
}
