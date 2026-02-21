
# Gamified Learning Assessment System (GLAS)

GLAS is an RPG-style learning platform that turns assignments into quests and progress into levels. Students build characters, complete work, earn rewards, and track their performance through leaderboards.

## Key Features

- **Character System:** Students create unique characters with selectable Classes (Warrior, Mage, Rogue) and Races (Human, Elf, Dwarf)
- **Quest-Based Learning:** Teachers post assignments as quests. Completion grants XP, gold, and progress toward level ups
- **Guild Groups:** Students can form or join guilds to work on team objectives
- **Performance Tracking:** Real-time leaderboards display student standings based on XP and gold earned
- **Access Control:** Separate access levels for Students, Teachers, and Admins using JWT authentication
- **File Uploads:** Direct submission system for assignment files
- **Report Generation:** Automatic PDF creation for progress reports and achievement certificates
- **Styled Interface:** Fantasy-themed design with basic animations and interface sounds

## Technology Stack

### Frontend

- React with Vite build tool
- RPGUI for theme components

### Backend

- Node.js with Express framework
- PostgreSQL database using raw SQL queries
- JWT and BCrypt for authentication

## Requirements

- Node.js version 18 or newer
- PostgreSQL database server

## Installation Guide

### Database Configuration

1. Create a new PostgreSQL database (name it something like `glas_db`)
2. Confirm your database server is active

### Backend Setup

Move into the backend folder and install packages:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder

Run the migration to build your database tables:

```bash
npm run migrate
```

Add the starter data (character classes, races, level requirements, test accounts):

```bash
npm run seed
```

Launch the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

Open another terminal window, go to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## Folder Layout

```
/
├── backend/
│   ├── src/
│   │   ├── config/     # Database connection
│   │   ├── controllers/# Request processing
│   │   ├── middleware/ # Authentication and upload handling
│   │   ├── models/     # Database queries
│   │   ├── routes/     # API endpoint definitions
│   │   ├── services/   # Core application logic
│   │   └── utils/      # Helper functions
│   └── public/         # Uploaded files storage
├── database/
│   ├── migrations/     # Table creation scripts
│   └── seeds/          # Initial data inserts
└── frontend/
    ├── public/         # Static files (RPGUI assets, sounds)
    └── src/
        ├── components/ # Reusable interface elements
        ├── contexts/   # State management (auth, student data)
        ├── pages/      # Main views (dashboard, login, etc.)
        └── utils/      # API communication helpers
```
