# 🤝 Contributing to Mental Health Support Network

Thank you for your interest in contributing to the Mental Health Support Network! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Development Best Practices](#development-best-practices)
- [Questions and Support](#questions-and-support)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- Be respectful and considerate
- Exercise empathy and kindness
- Give and gracefully accept constructive feedback
- Focus on what is best for the community
- Show courtesy to other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (v5.0 or higher)
- **Git** version control
- Text editor or IDE (VS Code recommended)
- Basic knowledge of React, Express.js, and MongoDB

### Fork and Clone

1. **Fork the repository** on GitHub
   - Click the "Fork" button at the top right

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Mental-Health-Support-Network-website.git
   cd Mental-Health-Support-Network-website
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/Mental-Health-Support-Network-website.git
   ```

4. **Install dependencies**:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   # Create backend/.env
   cd backend
   cp .env.example .env
   # Edit .env with your local configuration
   ```

6. **Start development servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

---

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/documentation-update
```

**Branch naming conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Keep Your Branch Updated

Regularly sync with the main repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 3. Make Your Changes

- Write clean, readable code
- Follow project coding standards
- Add comments for complex logic
- Update documentation as needed

### 4. Test Your Changes

- Test all affected functionality
- Ensure no existing features are broken
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design on mobile devices

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add user profile image upload"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template
- Submit for review

---

## Coding Standards

### JavaScript/React Style Guide

#### General Rules

- Use **ES6+** syntax
- Use **const** and **let**, never **var**
- Use **arrow functions** for callbacks
- Use **template literals** for string interpolation
- Use **destructuring** where appropriate
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names

#### Example:

```javascript
// ✅ Good
const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// ❌ Bad
function getProfile(id) {
  return axios.get('/profile/' + id).then(function(res) {
    return res.data;
  }).catch(function(err) {
    console.log(err);
  });
}
```

### React Component Guidelines

#### Use Functional Components with Hooks

```javascript
// ✅ Good
import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile(userId);
  }, [userId]);

  const fetchProfile = async (id) => {
    try {
      const data = await getUserProfile(id);
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>{profile.name}</h2>
      {/* ... */}
    </div>
  );
};

export default UserProfile;
```

#### Component Organization

1. Imports
2. Component definition
3. State declarations
4. Effects
5. Event handlers
6. Helper functions
7. Return/JSX

#### Props Destructuring

```javascript
// ✅ Good
const CounselorCard = ({ name, category, experience, rating }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{category}</p>
    </div>
  );
};

// ❌ Bad
const CounselorCard = (props) => {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.category}</p>
    </div>
  );
};
```

### Backend/Express Guidelines

#### Route Organization

```javascript
// ✅ Good - Clear and organized
app.get('/appointments', async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email: email.toLowerCase() } : {};
    const appointments = await AppointmentModel.find(query).sort({ startAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error('Fetch appointments error:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// ❌ Bad - Poor error handling
app.get('/appointments', async (req, res) => {
  const appointments = await AppointmentModel.find();
  res.json(appointments);
});
```

#### Error Handling

Always use try-catch blocks and provide meaningful error messages:

```javascript
app.post('/counselors', async (req, res) => {
  try {
    const newCounselor = new CounselorModel(req.body);
    await newCounselor.save();
    res.status(201).json({ 
      message: 'Counselor added successfully!', 
      counselor: newCounselor 
    });
  } catch (err) {
    console.error('Counselor save error:', err);
    res.status(500).json({ 
      error: 'Failed to add counselor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});
```

### Database/Mongoose Guidelines

#### Schema Definitions

```javascript
// ✅ Good - Well documented schema
const EmployeeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      trim: true, 
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'employee'],
        message: '{VALUE} is not a valid role'
      },
      default: 'employee'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for performance
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ role: 1, createdAt: -1 });

export default mongoose.model('Employee', EmployeeSchema);
```

### CSS/Styling Guidelines

- Use **class names** over inline styles
- Follow **BEM** naming convention (optional but recommended)
- Keep styles **modular** (one CSS file per component)
- Use **CSS variables** for colors and spacing
- Ensure **responsive design**

```css
/* ✅ Good - Organized and reusable */
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f39c12;
  --text-dark: #333;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}

.counselor-card {
  padding: var(--spacing-md);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.counselor-card__title {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

@media (max-width: 768px) {
  .counselor-card {
    padding: var(--spacing-sm);
  }
}
```

---

## Project Structure

Understanding the project structure helps you contribute effectively:

```
backend/
├── models/           # Database schemas
│   ├── Employee.js   # User model
│   ├── Appointment.js
│   └── ...
├── middleware/       # Express middleware
│   └── requireAdmin.js
├── routes/          # Separated routes (optional)
├── utils/           # Helper functions
├── index.js         # Main server file
└── package.json

frontend/
├── src/
│   ├── components/   # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/       # Page components
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── contexts/    # React contexts
│   ├── hooks/       # Custom hooks
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Root component
│   └── main.jsx     # Entry point
└── package.json
```

---

## Making Changes

### Adding a New Feature

1. **Create an issue** describing the feature
2. **Wait for approval** from maintainers
3. **Create a feature branch**
4. **Implement the feature**
5. **Add tests** (if applicable)
6. **Update documentation**
7. **Submit pull request**

### Example: Adding a Reviews Feature

**Backend changes**:

1. Create model (`backend/models/Review.js`):
```javascript
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  counselorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Counselor',
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    trim: true 
  }
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
```

2. Add routes (`backend/index.js`):
```javascript
import ReviewModel from './models/Review.js';

// Get reviews for a counselor
app.get('/counselors/:id/reviews', async (req, res) => {
  try {
    const reviews = await ReviewModel
      .find({ counselorId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add review
app.post('/counselors/:id/reviews', async (req, res) => {
  try {
    const review = new ReviewModel({
      counselorId: req.params.id,
      ...req.body
    });
    await review.save();
    res.status(201).json({ message: 'Review added!', review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});
```

**Frontend changes**:

1. Create component (`frontend/src/components/ReviewForm.jsx`):
```javascript
import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ counselorId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:3001/counselors/${counselorId}/reviews`, {
        userId,
        rating,
        comment
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

export default ReviewForm;
```

2. Update documentation
3. Create pull request

---

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile (320px, 768px, 1024px)
- [ ] Works in Chrome, Firefox, Safari
- [ ] Forms validate correctly
- [ ] Error states display properly
- [ ] Loading states work
- [ ] Data persists in database

### Writing Tests (Future)

Example test structure:

```javascript
// backend/tests/appointment.test.js
import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../index.js';

describe('Appointment API', () => {
  it('should create a new appointment', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        mode: 'online',
        counselor: 'Dr. Test',
        startAt: new Date()
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Appointment booked successfully!');
  });
});
```

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```
feat(appointments): add filter by date range

Add date range picker to appointments page allowing users to filter
appointments between specific dates.

Closes #123
```

```
fix(auth): resolve token expiration issue

JWT tokens were expiring after 1 hour instead of 1 day. Updated
token generation to use correct expiration time.

Fixes #456
```

```
docs(readme): update installation instructions

Add MongoDB setup steps and environment variable configuration.
```

---

## Pull Request Process

### 1. Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] Commits follow conventional commit format
- [ ] Branch is up to date with main

### 2. PR Title

Use conventional commit format:
```
feat(counselors): add filtering by specialization
```

### 3. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated

## Related Issues
Closes #123
```

### 4. Review Process

- Maintainers will review your PR
- Address any requested changes
- Push updates to the same branch
- Once approved, it will be merged

### 5. After Merge

- Delete your feature branch
- Update your local repository
- Close related issues

---

## Issue Guidelines

### Creating Issues

**Bug Report Template**:
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: Windows 10
- Browser: Chrome 90
- Node version: 16.0.0
```

**Feature Request Template**:
```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Any alternative solutions?

## Additional Context
Add any other context
```

---

## Development Best Practices

### 1. Security

- Never commit sensitive data (API keys, passwords)
- Validate all user input
- Sanitize data before database operations
- Use parameterized queries
- Implement rate limiting for APIs
- Keep dependencies updated

### 2. Performance

- Optimize database queries (use indexes)
- Implement pagination for large datasets
- Use lazy loading for images
- Minimize bundle size
- Cache frequently accessed data

### 3. Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

### 4. Code Quality

- Keep functions small and focused
- Avoid code duplication (DRY principle)
- Write self-documenting code
- Add comments for complex logic
- Use meaningful variable names

---

## Questions and Support

### Getting Help

- **GitHub Discussions**: For general questions
- **Issues**: For bugs and feature requests
- **Email**: support@mindwell.com

### Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Project README
- Release notes

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to Mental Health Support Network!** 

Your efforts help make mental health support more accessible to everyone. 💙

---

**Last Updated**: March 6, 2026
