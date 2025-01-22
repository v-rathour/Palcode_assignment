# Full Stack Assignment

## Overview
This project demonstrates a full-stack solution for implementing features such as user login via OTP, YouTube playlist integration, drag-and-drop functionality, and layout persistence using Firebase. The backend is built with Node.js, Express, and MongoDB for data management.

---

## Features

### Frontend

#### 1. **Login Page - Login via OTP on Email**
- A login page where users can log in using an OTP sent to their email.
- Validations for OTP expiry and duplicate OTPs are handled.
- Error messages are displayed in the UI using `react-toastify`.

#### 2. **Header Button - Import From YouTube**
- A button to fetch the user's private YouTube playlists using the YouTube Data API.
- On clicking the thumbnail of a playlist, its videos are displayed in a right-side panel.

#### 3. **Drag-and-Drop Cards**
- Uses `react-dnd` to enable drag-and-drop functionality for playlist cards.
- Visual indicators like shadows and opacity changes enhance the user experience during dragging.
- Buttons to save and load the current layout:
  - **Save Layout**: Saves the current layout to Firebase.
  - **Load Layout**: Retrieves the saved layout from Firebase and updates the UI accordingly.

#### 4. **Video List Panel**
- Displays a list of videos from the selected playlist. If the list exceeds five items, a scrollable UI is implemented.

---

### Backend

#### 1. **API for Login**
- OTP is sent via email using `nodemailer`.
- User details and OTPs are stored in MongoDB.
- Duplicate user sign-ups and OTP validation edge cases are handled.

#### 2. **API for Layout Management**
- Stores the drag-and-drop layout data in Firebase.
- Fetches and restores the layout during the next load.

#### 3. **Security Features**
- Use of JWT for secure user authentication.
- Validation for user inputs to prevent SQL injection and XSS attacks.
- Rate limiting and IP whitelisting for sensitive APIs.
- Secure HTTP headers using `helmet`.

---

## Models

### 1. `user.js`
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
```

### 2. `playlist.js`
```javascript
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  playlists: [
    {
      playlistId: String,
      title: String,
      thumbnail: String,
    },
  ],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
```

### 3. `episode.js`
```javascript
const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  playlistId: { type: String, required: true },
  episodes: [
    {
      videoId: String,
      title: String,
      thumbnail: String,
    },
  ],
});

module.exports = mongoose.model('Episode', EpisodeSchema);
```

---

## Deployment
- **Frontend**: Deployed using Vercel.
- **Backend**: Hosted on AWS EC2.
- **Database**: MongoDB Atlas for user and playlist management.

---

## How to Run Locally

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running.
- Firebase project set up.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up `.env` files for both frontend and backend.
4. Start the development servers:
   - Frontend: `npm start` in the frontend directory.
   - Backend: `npm start` in the backend directory.

---

## Video Explanation
A video walkthrough explaining the solution is included in the repository.

---

## Contact
For queries, email me at [your_email@example.com].
