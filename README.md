# Syntecxhub Notes App

A responsive and user-friendly notes application built with React. The app allows users to create, edit, search, and delete notes, with data stored in the browser using localStorage.

## Features

- Create new notes
- Edit existing notes
- Delete notes
- Search notes by title or content
- Automatically save notes using localStorage
- Responsive design for desktop, tablet, and mobile
- Clean soft pink and lavender glassmorphism interface
- Interactive icons using Lucide React
- Form validation
- Empty and search states

## Technologies Used

- React
- Vite
- JavaScript
- CSS3
- Lucide React
- Browser localStorage

## React Concepts Used

This project demonstrates the use of:

- `useState` — manages notes, form fields, search, and editing state
- `useEffect` — saves notes to localStorage whenever they change
- `useRef` — focuses the note title input
- `localStorage` — keeps notes available after refreshing the page

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/brendalyn-max/Syntecxhub_Notes_App.git

Navigate to the project
cd Syntecxhub_Notes_App
3. Install dependencies
npm install
4. Start the development server
npm run dev

Open the local development URL shown in your terminal.

Project Structure
Syntecxhub_Notes_App/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
How It Works

Users can enter a title and note content and save the note. Saved notes appear as cards in the notes section.

Each note can be edited or deleted using the action buttons. The search field allows users to quickly find notes by matching text in the title or content.

Notes are stored in the browser's localStorage, so they remain available when the page is refreshed.

Internship Task

This project was developed as part of the Syntecxhub Web Development Internship.

The project focuses on building a functional React application while practicing state management, references, effects, browser storage, responsive design, and component-based development.

Author

Brendalyn Musoki

Software & AI Engineer

Connect With Me

LinkedIn: https://www.linkedin.com/in/brendalyne-musoki/

GitHub: https://github.com/brendalyn-max

Portfolio: https://musokibrendalyn.netlify.app/


