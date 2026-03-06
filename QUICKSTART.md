# 🚀 Quick Start Guide

Get the Mental Health Support Network up and running in minutes!

---

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Node.js version (should be 16 or higher)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed
mongod --version
```

If any are missing, install them:
- **Node.js**: https://nodejs.org/ (Download LTS version)
- **MongoDB**: https://www.mongodb.com/try/download/community

---

## 🎯 One-Command Setup (Recommended)

### Windows PowerShell

```powershell
# Clone repository
git clone https://github.com/yourusername/Mental-Health-Support-Network-website.git
cd Mental-Health-Support-Network-website

# Install all dependencies
cd backend; npm install; cd ../frontend; npm install; cd ..

# Set up environment files
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env.local

Write-Host "✅ Setup complete! Edit backend/.env if needed, then run the start script."
```

### macOS/Linux (Bash)

```bash
# Clone repository
git clone https://github.com/yourusername/Mental-Health-Support-Network-website.git
cd Mental-Health-Support-Network-website

# Install all dependencies
cd backend && npm install && cd ../frontend && npm install && cd ..

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

echo "✅ Setup complete! Edit backend/.env if needed, then run the start script."
```

---

## 📝 Step-by-Step Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/Mental-Health-Support-Network-website.git
cd Mental-Health-Support-Network-website
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux

# Edit .env file and update:
# - JWT_SECRET (generate a secure random string)
# - MONGODB_URI (if not using default local MongoDB)
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` in `.env`.

### Step 3: Start MongoDB

**Windows:**
```powershell
# If MongoDB is installed as a service
net start MongoDB

# Or manually
mongod
```

**macOS:**
```bash
# If installed via Homebrew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Step 4: Start Backend Server

```bash
# Still in backend folder
npm start
```

You should see:
```
✅ MongoDB Connected
✅ Admin account created: admin@mindwell.com
✅ Seeded 12 counselors to database
🚀 Server is running on http://localhost:3001
```

### Step 5: Frontend Setup

**Open a new terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional for local dev)
copy .env.example .env.local  # Windows
cp .env.example .env.local    # macOS/Linux

# Start development server
npm run dev
```

You should see:
```
VITE v7.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 6: Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 🔑 Default Login Credentials

### Admin Account
- **Email**: `admin@mindwell.com`
- **Password**: `Admin123!`

### Test User Account
Create a new account by clicking "Register" or use the register endpoint.

---

## ✅ Verify Installation

### Backend Health Check

Visit: http://localhost:3001/counselors

You should see JSON data with 12 counselor profiles.

### Frontend Health Check

1. Open http://localhost:5173
2. You should see the login page
3. Try logging in with admin credentials
4. Navigate to different pages (Home, Counselors, Profile, etc.)

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Problem**: `MongoDB connection error: connect ECONNREFUSED`

**Solutions**:
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongod
   ```

2. Verify connection string in `backend/.env`:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/employee
   ```

3. Check MongoDB logs:
   ```bash
   # macOS/Linux
   tail -f /usr/local/var/log/mongodb/mongo.log
   ```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solutions**:

**Windows:**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

Or change the port in `backend/index.js` and `backend/.env`.

### Frontend Can't Reach Backend

**Problem**: CORS errors or network errors

**Solutions**:
1. Ensure backend is running on http://localhost:3001
2. Check `frontend/.env.local`:
   ```
   VITE_API_URL=http://localhost:3001
   ```
3. Restart frontend dev server after changing env variables

### npm install Fails

**Problem**: Dependency installation errors

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json  # macOS/Linux
   rmdir /s node_modules & del package-lock.json  # Windows
   ```

3. Reinstall:
   ```bash
   npm install
   ```

4. Update npm:
   ```bash
   npm install -g npm@latest
   ```

---

## 🎨 Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Vite HMR (changes reflect instantly)
- **Backend**: Nodemon (server restarts on file changes)

### Database Inspection

View your MongoDB data:

1. **MongoDB Compass** (GUI):
   - Download: https://www.mongodb.com/products/compass
   - Connect to: `mongodb://127.0.0.1:27017`
   - Database: `employee`

2. **MongoDB Shell**:
   ```bash
   mongosh
   use employee
   db.employees.find()
   db.appointments.find()
   db.counselors.find()
   ```

### API Testing

Use tools like:
- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/
- **Thunder Client** (VS Code extension)

Example request:
```
POST http://localhost:3001/login
Content-Type: application/json

{
  "email": "admin@mindwell.com",
  "password": "Admin123!"
}
```

### Browser DevTools

- **React DevTools**: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- **Redux DevTools**: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## 📚 Next Steps

1. **Explore the code**:
   - Backend: `backend/index.js` - Main server file
   - Frontend: `frontend/src/App.jsx` - Main React component

2. **Read documentation**:
   - [API Documentation](API_DOCUMENTATION.md)
   - [Contributing Guide](CONTRIBUTING.md)
   - [Deployment Guide](DEPLOYMENT_GUIDE.md)

3. **Customize**:
   - Update admin credentials
   - Add your own counselors
   - Customize styling
   - Add new features

4. **Deploy**:
   - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for production deployment

---

## 🆘 Getting Help

- **Documentation**: Check README.md and other docs
- **Issues**: [Report bugs](https://github.com/yourusername/repo/issues)
- **Discussions**: [Ask questions](https://github.com/yourusername/repo/discussions)
- **Email**: support@mindwell.com

---

## 🎉 You're All Set!

Your Mental Health Support Network is up and running!

**What's next?**
- ✨ Explore the features
- 🎨 Customize the design
- 🚀 Deploy to production
- 🤝 Contribute improvements

---

**Happy coding!** 💙

---

**Last Updated**: March 6, 2026
