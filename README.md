# Frontend README.md

```md
# Catering Search Platform - Frontend

A responsive catering search platform frontend built using Next.js and React.

---

## Features

- Display caterers in responsive cards
- Search caterers by name
- Filter caterers by price per plate
- Fetch data from backend API
- Clean and responsive UI

---

## Tech Stack

- Next.js
- React.js
- Axios / Fetch API
- Tailwind CSS (optional)

---

## Project Structure

frontend/
│
├── app/
│ └── caterers/
│ └── page.jsx
│
├── components/
│ └── CatererCard.jsx
│ └── EmptyState.jsx
│ └── ErrorState.jsx
│ └── SkeletonCard.jsx
│ └── Stars.jsx
│
├── hooks/
│ └── useCaterers.js
│
├── lib/
│ └── api
│ └── caterer.js
│
├── styles/
│
├── package.json
└── next.config.js

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/mr-ajit-sharma/caterers-frontend
cd frontend
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:8000/api
Run Development Server
npm run dev

Frontend will run on:

http://localhost:3000
Main Page
Route
/caterers
Features Explanation
Fetch Caterers

Data is fetched from backend API:

GET /api/caterers
Search Functionality

Users can search caterers by:

Caterer name

Example:

Royal Caterers
Price Filter

Users can filter caterers based on:

Low price
Medium price
High price

Example logic:

pricePerPlate <= 500
Example Caterer Card

Each card displays:

Caterer Name
Location
Price Per Plate
Available Cuisines
Rating
Responsive Design

UI supports:

Mobile devices
Tablets
Desktop screens
API Integration Example
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/caterers`
);

const data = await response.json();
Scripts
Start Development Server
npm run dev
Build Project
npm run build
Start Production Build
npm start
Future Improvements
Dark mode
Pagination
Advanced filtering
Sorting options
Authentication
Favorites/Bookmarks
Author

Ajit Sharma