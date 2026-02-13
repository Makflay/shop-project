# Shop Project (E-commerce)

This is a full-stack e-commerce project built with:

- **Frontend:** React + TypeScript + React Router + Redux/Context API  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT + bcrypt  
- **Docker:** Frontend, Backend, MongoDB  
- **Optional:** Stripe sandbox integration for payments ?

---

## Quick Start

This project can be run in **two ways**: using Docker (recommended) or locally via npm.

---

## Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone <repo_url>
cd shop-project

2. Create a .env file based on the example:
cp .env.example .env

3. Start the project:
docker compose up --build

4. Access:
Frontend → http://localhost:3000
Backend → http://localhost:5000
MongoDB → localhost:27017


## Running Locally Without Docker

Backend

cd backend
npm install
npm run dev
# or build + run
npm run build
node dist/server.js

Make sure .env points to your local MongoDB:

MONGO_URI=mongodb://localhost:27017/shop_db

Frontend

cd frontend
npm install
npm run dev
# or npm start if using CRA

Frontend uses the VITE_API_URL environment variable from .env (default: http://localhost:5000) to connect to the backend.