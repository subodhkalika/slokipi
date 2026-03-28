#!/bin/bash
# Sets up local development environment
# Usage: ./scripts/dev-setup.sh

set -e

echo "🐘 Starting local Postgres..."
docker-compose up db -d

echo "⏳ Waiting for Postgres to be ready..."
until docker-compose exec db pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done

echo "📦 Pushing schema to local database..."
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/slokipi npx drizzle-kit push

echo "🌱 Seeding local database..."
echo "   Enter your Supabase user ID (from Supabase Dashboard → Auth → Users):"
read -r USER_ID

if [ -n "$USER_ID" ]; then
  DATABASE_URL=postgresql://postgres:postgres@localhost:5433/slokipi node src/db/seed.js "$USER_ID"
else
  echo "   Skipped seeding (no user ID provided)"
fi

echo ""
echo "✅ Local dev environment ready!"
echo ""
echo "   Database: postgresql://postgres:postgres@localhost:5433/slokipi"
echo "   Auth:     Still uses Supabase (login/signup work via Supabase Auth)"
echo ""
echo "   To start the app:  npm run dev"
echo "   To stop Postgres:  docker-compose down"
echo "   To reset DB:       docker-compose down -v && ./scripts/dev-setup.sh"
