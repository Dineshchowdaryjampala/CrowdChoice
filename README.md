# CrowdChoice Polling Application

CrowdChoice is a full-stack polling application that allows users to create, vote, bookmark, and manage polls. Below is the complete documentation of the project in markdown format.

## Live Server:  https://crowd-choice-dinesh-chowdary-jampala-s-projects.vercel.app/

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend Components](#frontend-components)
- [Database Models](#database-models)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

CrowdChoice is a polling platform where users can create polls of various types (single-choice, yes/no, rating, image-based, open-ended), vote on them, bookmark their favorite polls, and view poll statistics. The application provides user authentication, profile management, and real-time poll results.

---

## Features

### User Authentication
- Register and log in with email and password.
- Username validation (alphanumeric characters and hyphens only).
- Profile image upload.

### Poll Management
- Create polls of different types: single-choice, yes/no, rating, image-based, and open-ended.
- Close or delete polls created by the user.
- View poll statistics and responses.

### Voting and Bookmarking
- Vote on polls and see real-time results.
- Bookmark polls for later viewing.
- View polls the user has voted on.

### User Profile
- View user stats: total polls created, voted, and bookmarked.
- Update profile information.

---

## Technologies Used

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for image uploads

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for routing
- **React Icons** for icons
- **React Hot Toast** for notifications

### Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **PostCSS** and **Autoprefixer** for CSS optimization

---

## Backend API Endpoints

### Authentication
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Log in an existing user.
- `GET /api/v1/auth/getUser`: Get user information.

### Polls
- `POST /api/v1/poll/create`: Create a new poll.
- `GET /api/v1/poll/getAllPolls`: Get all polls with optional filters.
- `GET /api/v1/poll/:id`: Get a specific poll by ID.
- `POST /api/v1/poll/:id/vote`: Vote on a poll.
- `POST /api/v1/poll/:id/close`: Close a poll.
- `POST /api/v1/poll/:id/bookmark`: Bookmark a poll.
- `GET /api/v1/poll/user/bookmarked`: Get all bookmarked polls for the user.
- `DELETE /api/v1/poll/:id/delete`: Delete a poll.

### Images
- `POST /api/v1/auth/upload-image`: Upload an image.

---

## Frontend Components

### Layouts
- `AuthLayout`: Layout for authentication pages (login, signup).
- `DashboardLayout`: Layout for the dashboard, including navbar, sidebar, and user details.

### Pages
- `LoginForm`: Login page.
- `SignUpForm`: Signup page.
- `Home`: Dashboard showing all polls.
- `CreatePoll`: Page to create new polls.
- `MyPolls`: Page to view polls created by the user.
- `VotedPolls`: Page to view polls the user has voted on.
- `Bookmarks`: Page to view bookmarked polls.

### Cards
- `PollCard`: Displays individual poll details.
- `UserDetailsCard`: Displays user profile information and stats.
- `EmptyCard`: Placeholder card for empty states.

### Inputs
- `AuthInput`: Input field for authentication forms.
- `OptionInput`: Input for adding poll options.
- `OptionImageSelector`: Input for adding image-based poll options.
- `Rating`: Star rating input.

### Miscellaneous
- `PollActions`: Actions for polls (vote, bookmark, close, delete).
- `HeaderWithFilter`: Header with filter options for polls.

---

## Database Models

### User Schema
- `username`: String, required.
- `fullName`: String, required.
- `email`: String, required, unique.
- `password`: String, required.
- `profileImageUrl`: String, optional.
- `bookmarkedPolls`: Array of poll IDs.

### Poll Schema
- `question`: String, required.
- `type`: String, required (e.g., single-choice, rating).
- `options`: Array of objects containing option text and vote count.
- `responses`: Array of user responses.
- `creator`: Reference to the user who created the poll.
- `voters`: Array of user IDs who have voted.
- `closed`: Boolean, indicates if the poll is closed.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm 
- MongoDB instance (local or cloud)
- Git

### Steps

1. **Clone the Repository**
   ```bash
    git clone https://github.com/Dineshchowdaryjampala/CrowdChoice.git
    cd crowdchoice

2. **For the backend**
   ```bash
    cd backend
    npm install 
3. **For the frontend**
   ```bash
    cd frontend
    cd polling-app
    npm install

4. **Create a .env file in the backend directory**
   ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=8080

5. **Start the backend server**
   ```bash
    cd backend
    node server.js

6. **Start the frontend development server**
   ```bash
    cd frontend
    cd polling-app
    npm run dev
## Usage 
- `Register/Login` : Use the `/register` and `/login` endpoints or the UI to create an account or log in.
- `Create Polls`: Navigate to the "Create Poll" section to create new polls.
- `Vote on Polls` : Browse polls on the dashboard and cast your vote.
- `Bookmark Polls` : Save polls to your bookmarks for later viewing.
- `View Stats` : Check your profile to see statistics like polls created, voted, and bookmarked.

## Contributing

- Fork the repository.
- Clone your fork.
- Create a new branch for your feature or bug fix.
- Make changes and ensure they follow the project's coding standards.
- Test your changes.
- Submit a pull request.

## License
This project is licensed under the MIT License. 

## Contributors 
```
CR SANNUTH and J DINESH CHOWDARY