#!/bin/bash

echo "Deleting all migration files inside your project (excluding site-packages)..."

# Replace './your_project_root' with your actual Django project root (e.g., './backend')
find ./backend -type d -name migrations -exec find {} -type f ! -name '__init__.py' -name '*.py' -delete \;
find ./backend -type d -name migrations -exec find {} -type f -name '*.pyc' -delete \;

echo "✅ All project migration files deleted (Django system files untouched)."
