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

## 🚀 How to Run the Application

To run this application locally, you will need to open **two separate terminal windows**—one for the backend server and one for the frontend client.

### Step 1: Clone the Repository
```bash
git clone [https://github.com/an-indivisible-whole/tineb-assignment.git](https://github.com/an-indivisible-whole/tineb-assignment.git)
cd tineb-assignment

Step 2: Start the Backend Server
Open your first terminal window and navigate to the backend directory:

Bash
cd backend

Install the required dependencies:

Bash
npm install
Ensure your .env file is set up with your MongoDB URI (see Local Setup Instructions above), then start the development server:

Bash
npm run dev
(You should see a message confirming the server is running on port 5000 and connected to MongoDB).

Step 3: Start the Frontend Client
Open a second, new terminal window from the root of the project and navigate to the frontend directory:

Bash
cd front-end
Install the required dependencies:

Bash
npm install

Start the Vite development server:
Bash
npm run dev

Step 4: View the App
Once both servers are running, open your web browser and navigate to the local Vite URL provided in your second terminal
