# 🧠 Mental Health Support Network Website

A full-stack web application dedicated to providing mental health support through professional counseling, appointment scheduling, real-time chat, music therapy, and wellness resources.

![Platform](https://img.shields.io/badge/Platform-Mental%20Health%20Support-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Overview

The Mental Health Support Network is a comprehensive platform designed to connect individuals seeking mental health support with professional counselors. The platform offers a safe, accessible, and user-friendly environment for booking appointments, accessing therapeutic resources, and receiving support.

### Why This Platform?

- **Accessibility**: Easy access to mental health resources 24/7
- **Variety**: 12+ counselor specializations covering diverse mental health needs
- **Privacy**: Secure authentication and confidential communications
- **Convenience**: Online and in-person appointment options
- **Holistic Support**: Music therapy, mindfulness games, and chat support
- **Professional Care**: Experienced counselors with verified credentials

---

## ✨ Key Features

### 👤 For Users
- ✅ Secure user registration and authentication
- 👥 Browse 12+ professional counselors across various specializations
- 📅 Book appointments (online or in-person)
- 💬 Real-time chat support
- 🎵 Access curated music therapy library
- 🎮 Relaxation and mindfulness mini-games
- 📝 Personal profile management with bio and credentials
- 📧 Contact support team directly

### 🛡️ For Administrators
- 📊 Comprehensive dashboard for platform management
- 👨‍⚕️ Counselor profile management (CRUD operations)
- 📆 Appointment oversight and management
- 💌 User message review and response
- 🎶 Music library management
- 👥 User account monitoring

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages: Home | Login | Signup | Profile | Services  │  │
│  │         Counselors | Appointments | Chat | Admin    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components: Navbar | Footer | MusicPlayer          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management: Context API (Music Player)        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes: /auth | /appointments | /counselors        │  │
│  │          /messages | /profile | /music              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware: CORS | Body Parser | JWT Auth          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                      Database (MongoDB)                      │
│  Collections: employees | appointments | counselors         │
│               messages | music                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite, React Router, Axios, Bootstrap 5, React Icons |
| **Backend** | Node.js, Express 5, JWT, bcrypt |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcrypt password hashing |
| **Development** | Nodemon, ESLint, Hot Module Replacement (HMR) |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16+)
- **npm** (v8+)
- **MongoDB** (v5.0+)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Mental-Health-Support-Network-website
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set Up Environment Variables**

Create `backend/.env`:
```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://127.0.0.1:27017/employee
PORT=3001
```

5. **Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

6. **Run the Application**

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

7. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## 🔑 Default Admin Access

The system automatically creates an admin account on first run:

```
Email: admin@mindwell.com
Password: Admin123!
```

⚠️ **Important**: Change these credentials in production!

---

## 📚 Documentation

### Project Structure

```
Mental-Health-Support-Network-website/
│
├── backend/                    # Backend server
│   ├── models/                # Database schemas
│   │   ├── Employee.js        # User/Admin model
│   │   ├── Appointment.js     # Appointment bookings
│   │   ├── Counselor.js       # Counselor profiles
│   │   ├── Message.js         # Support messages
│   │   └── Music.js           # Music tracks
│   ├── middleware/            # Express middleware
│   ├── routes/                # API routes
│   ├── index.js               # Server entry point
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   └── package.json
│
└── README.md                   # This file
```

### API Endpoints Overview

#### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /reset-admin` - Reset admin credentials

#### Appointments
- `GET /appointments` - List appointments
- `POST /appointments` - Book appointment
- `PUT /appointments/:id` - Update appointment

#### Counselors
- `GET /counselors` - List all counselors
- `POST /counselors` - Add counselor (Admin)
- `PUT /counselors/:id` - Update counselor (Admin)
- `DELETE /counselors/:id` - Delete counselor (Admin)

#### Messages
- `GET /messages` - List messages
- `POST /messages` - Send message
- `PUT /messages/:id` - Update message
- `DELETE /messages/:id` - Delete message

#### Profile
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update profile

#### Music
- `GET /music` - List music tracks
- `POST /music` - Upload track (Admin)
- `PUT /music/:id` - Update track (Admin)
- `DELETE /music/:id` - Delete track (Admin)

For detailed API documentation, see [frontend/README.md](frontend/README.md)

---

## 👥 Counselor Specializations

The platform includes 12 pre-configured counselors covering:

1. **Anxiety & Stress** - CBT and Mindfulness techniques
2. **Depression & Mood Support** - Behavioral Activation therapy
3. **Child & Adolescent Therapy** - Play therapy and family systems
4. **Career & Life Coaching** - Goal setting and life balance
5. **Relationship & Family Therapy** - Emotionally Focused Therapy
6. **Grief & Loss** - Narrative therapy and supportive counseling
7. **Self-Esteem & Confidence** - Strength-based therapy
8. **Student & Academic Stress** - CBT and time management
9. **LGBTQ+ Affirmative Support** - Humanistic, identity-affirming care
10. **Mindfulness & Meditation** - MBSR and breathwork
11. **Addiction Recovery Support** - Motivational interviewing
12. **Trauma-Informed Care** - EMDR-informed stabilization

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth with 1-day expiry
- **Role-Based Access Control**: Admin and employee roles
- **Input Validation**: Mongoose schema validation
- **CORS Protection**: Configured for frontend-backend communication
- **Secure Headers**: Express security best practices

---

## 🎯 Future Enhancements

- [ ] Video call integration for online sessions
- [ ] Payment gateway for appointment fees
- [ ] Email notifications for appointments
- [ ] Mobile application (React Native)
- [ ] AI-powered mental health chatbot
- [ ] Mood tracking and analytics
- [ ] Group therapy sessions
- [ ] Multi-language support
- [ ] Calendar synchronization (Google, Outlook)
- [ ] Two-factor authentication (2FA)
- [ ] Advanced search and filtering
- [ ] Review and rating system for counselors
- [ ] Blog and mental health resources section
- [ ] Emergency crisis helpline integration

---

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

---

## 📦 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables
2. Update MongoDB connection string to cloud database (MongoDB Atlas)
3. Deploy using platform-specific instructions

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build production bundle:
```bash
cd frontend
npm run build
```

2. Deploy the `dist/` folder
3. Configure environment variables for API endpoint

### MongoDB Cloud

Use MongoDB Atlas for production database:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/employee
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## 🐛 Known Issues

- Music file upload size limited to 50MB (base64 encoding)
- Real-time chat requires WebSocket implementation for true real-time updates
- Profile images stored as base64 (consider cloud storage for production)

---

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release
- User authentication and authorization
- Counselor directory with 12 specializations
- Appointment booking system
- Admin dashboard
- Music therapy library
- Profile management
- Support messaging system
- Mini-games integration

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors & Contributors

- **Project Team** - Initial development and design
- **Contributors** - See [CONTRIBUTORS.md](CONTRIBUTORS.md)

---

## 📞 Contact & Support

- **Email**: support@mindwell.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/repo/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/repo/wiki)

---

## 🙏 Acknowledgments

- Mental health professionals who provided domain expertise
- Open source community for amazing tools and libraries
- Users and testers for valuable feedback
- All contributors who helped improve the platform

---

## 🌐 Resources

### Mental Health Resources
- [National Suicide Prevention Lifeline](https://988lifeline.org/): 988
- [Crisis Text Line](https://www.crisistextline.org/): Text HOME to 741741
- [SAMHSA National Helpline](https://www.samhsa.gov/): 1-800-662-4357

### Technical Resources
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT Best Practices](https://jwt.io/)

---

<div align="center">

**Built with ❤️ to make mental health support accessible to everyone**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/repo/issues) · [Request Feature](https://github.com/yourusername/repo/issues) · [Documentation](frontend/README.md)

</div>
