#!/bin/bash

set -e # Exit on any error

# Define paths
MONOREPO_DIR="/home/ubuntu/projects/tushirikiane"
BACKEND_DIR="$MONOREPO_DIR/backend"
FRONTEND_DIR="$MONOREPO_DIR/frontend"

# Pull latest code
cd $MONOREPO_DIR || exit 1
git pull origin main

# Extract the .next folder from the archive
echo "🚀 Extracting frontend build..."
tar -xzvf $FRONTEND_DIR/next-build.tar.gz -C $FRONTEND_DIR

# Deploy Backend
echo "🚀 Deploying Tushirikiane Backend..."
cd $BACKEND_DIR
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Start Gunicorn (Instead of Daphne)
pm2 restart tushirikiane_backend || pm2 start venv/bin/gunicorn --name "tushirikiane_backend" --interpreter python3.12 -- \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    config.wsgi:application

# Deploy Frontend (using the frontend directory directly)
echo "🚀 Deploying Tushirikiane Frontend..."
cd $FRONTEND_DIR

# Start Next.js SSR Server
echo "🚀 Starting Next.js SSR Server..."
pm2 restart tushirikiane_frontend || pm2 start npm --name "tushirikiane_frontend" -- start --prefix $FRONTEND_DIR

# Restart Nginx to apply changes
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment completed successfully!"
    