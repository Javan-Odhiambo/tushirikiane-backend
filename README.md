# Tushirikiane

Tushirikiane is an open source project management software that aims to provide mid-sized organizations and teams with a tool they can use to manage their projects

## Table of contents

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation and Setup

To get the project up and running on your local machine, you need to clone the project from the repository and install the necessary dependencies. The following steps will guide you through the process.

1. Clone the repository to your local machine

```bash
git clone https://github.com/AquaTwin/tushirikiane.git
```

2. Setup environment variables
   Copy the contents of .env.example into .env.local in frontend directory and .env.example into .env in backend directory. Fill in the appropriate values.

3. Install dependencies
   Frontend dependencies are managed using npm while backend dependencies are managed using pip. To install the dependencies, run the following commands in the terminal.

```bash
cd tushirikiane/frontend
npm install
cd ../backend

python -m venv venv
source venv/bin/activate # For linux users
venv\Scripts\activate # For windows users

pip install -r requirements.txt

# Migrate the database
python manage.py migrate
```

4. Run the application
   To run the application, you need to start the frontend and backend servers.
   To start the frontend server, run the following command in the terminal.

```bash
cd tushirikiane/frontend
npm run dev
```

To start the backend server, run the following command in the terminal.

```bash
cd tushirikiane/backend
python manage.py runserver
```

## Project Structure

The project is divided into two main directories: frontend and backend. The frontend directory contains the code for the user interface while the backend directory contains the code for the API.

```
tushirikiane/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app
│   │   ├── components
│   │   ├── favicon.ico
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── page.tsx
│   │   ├── lib
├── backend/

```
