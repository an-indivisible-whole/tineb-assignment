# Candidate Finder

A responsive, full-stack web application that allows users to explore and update political candidate details. Users can filter candidates by State and Constituency through a dynamic dual-dropdown interface and edit candidate metrics in real-time.

## 🚀 Technology Stack
* **Frontend:** React (Vite), Material-UI (MUI)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Data Processing:** `csv-parser` (for initial database seeding)

---

## 📁 Project Structure
This is a monorepo containing both the frontend and backend codebases.

```text
tineb-assignment/
├── front-end/              # React frontend (Vite + MUI)
├── backend/                # Node.js + Express backend API
│   ├── Contracts/          # Mongoose schemas
│   ├── Routes/             # Express API routes
│   ├── Assessment data.csv # Raw dataset // if ever needed to migrate a whole new data rather than editing one by one
│   ├── seed.js             # Database migration script
│   └── index.js            # Server entry point
└── README.md
