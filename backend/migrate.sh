#!/bin/bash

python manage.py makemigrations accounts
python manage.py makemigrations core

# Apply the migrations
python manage.py migrate accounts
python manage.py migrate core