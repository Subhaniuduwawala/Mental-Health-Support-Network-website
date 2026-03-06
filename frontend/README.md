# Mental Health Support Network Website

A comprehensive mental health support platform that connects users with professional counselors, provides appointment scheduling, real-time chat support, music therapy, mini-games for relaxation, and administrative tools for managing the platform.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Default Credentials](#default-credentials)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)

---

## ✨ Features

### User Features
- **User Authentication**: Secure registration and login system with JWT tokens
- **Profile Management**: Users can update personal information, bio, specialization, experience, and profile image
- **Counselor Directory**: Browse and filter through 12+ professional counselors with different specializations
- **Appointment Booking**: Schedule appointments with counselors (online or in-person)
- **Real-time Chat**: Communicate with support staff through an integrated chat interface
- **Music Therapy**: Access a curated library of relaxing music with a floating music player
- **Mini Games**: Access to relaxation and mindfulness games
- **Support Messages**: Submit support requests and feedback

### Admin Features
- **Dashboard**: View and manage all appointments, messages, counselors, and users
- **Counselor Management**: Add, edit, or remove counselor profiles
- **Appointment Management**: View, update, and manage all user appointments
- **Message Management**: Review and manage support messages
- **Music Library Management**: Upload, edit, and delete music tracks
- **User Management**: View registered users and their information

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose ODM (v8.16.0)
- **Authentication**: JWT (jsonwebtoken v9.0.2) + bcrypt (v6.0.0)
- **Additional**: CORS, dotenv

### Frontend
- **Library**: React (v19.1.0)
- **Build Tool**: Vite (v7.0.0)
- **Routing**: React Router DOM (v7.6.2)
- **HTTP Client**: Axios (v1.10.0)
- **Styling**: Bootstrap (v5.3.7) + Custom CSS
- **Icons**: React Icons (v5.5.0)

---

## 📁 Project Structure

```
Mental-Health-Support-Network-website/
│
├── backend/
│   ├── index.js                    # Main server file
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables (not in repo)
│   │
│   ├── models/                     # Mongoose schemas
│   │   ├── Employee.js             # User model (employees/admins)
│   │   ├── Appointment.js          # Appointment model
│   │   ├── Counselor.js            # Counselor model
│   │   ├── Message.js              # Support message model
│   │   └── Music.js                # Music track model
│   │
│   ├── middleware/                 # Express middleware
│   │   └── requireAdmin.js         # Admin authorization middleware
│   │
│   └── routes/                     # API routes (if separated)
│       └── counselors.js
│
└── frontend/
    ├── index.html                  # HTML entry point
    ├── package.json                # Frontend dependencies
    ├── vite.config.js              # Vite configuration
    ├── eslint.config.js            # ESLint configuration
    │
    ├── public/                     # Static assets
    │   └── assets/                 # Images, videos, audio files
    │
    └── src/
        ├── main.jsx                # React entry point
        ├── App.jsx                 # Main app component with routing
        ├── index.css               # Global styles
        │
        ├── components/             # Reusable components
        │   ├── Navbar.jsx          # Navigation bar
        │   ├── Footer.jsx          # Footer component
        │   └── FloatingMusicPlayer.jsx  # Music player component
        │
        ├── contexts/               # React contexts
        │   └── MusicPlayerContext.jsx   # Music player state management
        │
        ├── hooks/                  # Custom React hooks
        │   └── useMusicPlayer.js
        │
        └── pages/                  # Page components
            ├── Home.jsx            # Landing page
            ├── Login.jsx           # Login page
            ├── Signup.jsx          # Registration page
            ├── Service.jsx         # Services overview
            ├── Counselors.jsx      # Counselor directory
            ├── Aboutus.jsx         # About us page
            ├── Profile.jsx         # User profile management
            ├── Support.jsx         # Support/Contact page
            ├── ChatInterface.jsx   # Real-time chat
            ├── MusicList.jsx       # Music therapy library
            ├── MiniGames.jsx       # Relaxation games
            └── Admin.jsx           # Admin dashboard
```

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (v5.0 or higher)
  - Install MongoDB Community Server
  - Ensure MongoDB service is running on `mongodb://127.0.0.1:27017`

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Mental-Health-Support-Network-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if not running as service)
# Windows: mongod
# macOS/Linux: sudo systemctl start mongod

# Start the backend server
npm start
```

The backend server will run on **http://localhost:3001**

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173** (or another port if 5173 is busy)

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# JWT Secret Key
JWT_SECRET=your-super-secret-jwt-key-here

# MongoDB Connection String (optional if using default)
MONGODB_URI=mongodb://127.0.0.1:27017/employee

# Server Port (optional)
PORT=3001
```

> **Note**: If `JWT_SECRET` is not provided, the server will use `dev-secret` (not recommended for production)

---

## 🗄 Database Models

### Employee/User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  phone: String,
  bio: String,
  specialization: String,
  experience: String,
  qualification: String,
  profileImage: String (base64),
  role: "admin" | "employee" (default: "employee"),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  name: String (required),
  email: String (required, lowercase),
  phone: String (required),
  mode: "online" | "inperson" (required),
  counselor: String (required),
  notes: String,
  startAt: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Counselor Model
```javascript
{
  name: String (required),
  category: String (required),
  experience: String (required),
  languages: String (required),
  approach: String (required),
  quote: String (required),
  rating: Number (1-5, default: 5),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  date: Date (default: Date.now)
}
```

### Music Model
```javascript
{
  title: String (required),
  artist: String (required),
  audioData: String (required, base64),
  mimeType: String (default: "audio/mpeg"),
  fileSize: String,
  duration: String,
  uploadDate: Date (default: Date.now)
}
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| POST | `/reset-admin` | Reset admin credentials | No |

### Appointments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/appointments` | Get all appointments (or filter by email) | No |
| POST | `/appointments` | Create new appointment | No |
| PUT | `/appointments/:id` | Update appointment | No |

### Messages

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/messages` | Get all messages | No |
| POST | `/messages` | Create new message | No |
| PUT | `/messages/:id` | Update message | No |
| DELETE | `/messages/:id` | Delete message | No |

### Counselors

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/counselors` | Get all counselors | No |
| POST | `/counselors` | Add new counselor | Admin |
| PUT | `/counselors/:id` | Update counselor | Admin |
| DELETE | `/counselors/:id` | Delete counselor | Admin |
| POST | `/seed-counselors` | Seed default counselors | No |

### Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile/:id` | Get user profile by ID | Yes |
| PUT | `/profile/:id` | Update user profile | Yes |

### Music

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/music` | Get all music tracks | No |
| POST | `/music` | Upload new music | Admin |
| PUT | `/music/:id` | Update music track | Admin |
| DELETE | `/music/:id` | Delete music track | Admin |

---

## 🧭 Frontend Routes

| Route | Component | Description | Access |
|-------|-----------|-------------|--------|
| `/` | Login | Login page | Public |
| `/login` | Login | Login page | Public |
| `/register` | Signup | Registration page | Public |
| `/home` | Home | Landing/Home page | Private |
| `/service` | Service | Services overview | Private |
| `/counselors` | Counselors | Counselor directory | Private |
| `/support` | Support | Support/Contact page | Private |
| `/about` | AboutUs | About us page | Private |
| `/profile` | Profile | User profile | Private |
| `/music-list` | MusicList | Music library | Private |
| `/mini-games` | MiniGames | Relaxation games | Private |
| `/chat` | ChatInterface | Real-time chat | Private |
| `/admin/appointments` | Admin | Admin dashboard | Admin Only |

---

## 🔑 Default Credentials

### Admin Account
Upon first startup, the system automatically creates an admin account:

- **Email**: `admin@mindwell.com`
- **Password**: `Admin123!`

> **Important**: Change the admin password after first login in production!

### Pre-seeded Counselors
The system comes with 12 pre-configured counselor profiles across various specializations:
- Anxiety & Stress
- Depression & Mood Support
- Child & Adolescent Therapy
- Career & Life Coaching
- Relationship & Family Therapy
- Grief & Loss
- Self-Esteem & Confidence
- Student & Academic Stress Support
- LGBTQ+ Affirmative Support
- Mindfulness & Meditation
- Addiction Recovery Support
- Trauma-Informed Care

---

## 📖 Usage Guide

### For Regular Users

1. **Registration**
   - Navigate to `/register`
   - Fill in name, email, and password
   - Submit to create account

2. **Login**
   - Go to `/login`
   - Enter email and password
   - Upon successful login, redirected to `/home`

3. **Browse Counselors**
   - Visit `/counselors`
   - View counselor profiles with specializations
   - Filter by category, rating, or experience

4. **Book Appointment**
   - Select a counselor
   - Fill appointment form (name, email, phone, date/time, mode)
   - Choose online or in-person session
   - Submit booking

5. **Manage Profile**
   - Navigate to `/profile`
   - Update personal information
   - Add bio, specialization, experience
   - Upload profile image (base64 encoded)

6. **Use Music Therapy**
   - Go to `/music-list`
   - Browse relaxing music tracks
   - Use floating music player to control playback

7. **Play Mini Games**
   - Visit `/mini-games`
   - Access relaxation and mindfulness games

8. **Send Support Message**
   - Go to `/support`
   - Fill contact form (name, email, message)
   - Submit for admin review

### For Administrators

1. **Login as Admin**
   - Use admin credentials: `admin@mindwell.com` / `Admin123!`

2. **Access Admin Dashboard**
   - Navigate to `/admin/appointments`
   - View tabs: Appointments, Counselors, Messages, Users, Music

3. **Manage Appointments**
   - View all scheduled appointments
   - Update appointment status
   - See user details and counselor assignments

4. **Manage Counselors**
   - Add new counselor profiles
   - Edit existing counselor information
   - Delete counselor profiles
   - Update ratings and specializations

5. **Review Messages**
   - Read support messages from users
   - Update message status
   - Delete resolved messages

6. **Manage Music Library**
   - Upload new music tracks (base64 audio)
   - Edit track metadata (title, artist, duration)
   - Remove tracks from library

---

## 🎨 Key Features Implementation

### Authentication Flow
- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens issued upon successful login (1-day expiry)
- Token includes: userId, role, email, name
- Role-based access control (admin/employee)

### Appointment System
- Date/time picker for scheduling
- Email-based appointment filtering
- Support for both online and in-person sessions
- Automatic sorting by appointment date

### Music Player
- Context-based state management
- Floating player visible across all pages
- Base64 audio data storage
- Play/pause/skip functionality

### Admin Dashboard
- Tab-based interface for different sections
- CRUD operations for all resources
- Real-time data updates
- Responsive design with Bootstrap

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use ES6+ JavaScript features
- Follow React best practices
- Use functional components with hooks
- Write descriptive commit messages
- Add comments for complex logic

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

### Port Already in Use
- Backend: Change port in `backend/index.js` (line 478)
- Frontend: Vite will automatically suggest an alternative port

### JWT Authentication Errors
- Ensure `.env` file exists with `JWT_SECRET`
- Clear browser localStorage and try logging in again

### CORS Errors
- Ensure backend is running on port 3001
- Check CORS configuration in `backend/index.js`

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email support@mindwell.com or create an issue in the repository.

---

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- MongoDB for reliable database solutions
- Bootstrap for responsive UI components
- All contributors and users of this platform

---

**Built with ❤️ for Mental Health Support**
