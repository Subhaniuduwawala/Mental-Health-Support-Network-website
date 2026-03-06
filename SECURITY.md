# 🔒 Security Policy

## Reporting a Vulnerability

The Mental Health Support Network team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

If you discover a security vulnerability, please follow these steps:

1. **DO NOT** open a public GitHub issue
2. Email your findings to: **security@mindwell.com**
3. Include the following information:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity
  - **Critical**: Within 24-48 hours
  - **High**: Within 1 week
  - **Medium**: Within 2 weeks
  - **Low**: Within 1 month

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will confirm the vulnerability and determine its impact
- We will release a fix as soon as possible
- We will credit you in our security advisories (if desired)

---

## Security Best Practices

### For Developers

1. **Never commit sensitive data**
   - No API keys, passwords, or tokens in code
   - Use environment variables for secrets
   - Add `.env` files to `.gitignore`

2. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

3. **Input validation**
   - Validate all user input
   - Sanitize data before database operations
   - Use Mongoose schema validation

4. **Authentication**
   - Use strong password hashing (bcrypt with 10+ rounds)
   - Implement JWT with reasonable expiration
   - Never send passwords in responses

5. **Authorization**
   - Verify user permissions for all actions
   - Implement role-based access control
   - Use middleware for protected routes

### For Users

1. **Use strong passwords**
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Don't reuse passwords across sites

2. **Protect your credentials**
   - Never share your password
   - Log out after using shared devices
   - Be wary of phishing attempts

3. **Report suspicious activity**
   - Unexpected emails claiming to be from us
   - Unusual account behavior
   - Security concerns

---

## Known Security Considerations

### Current Implementation

#### ✅ Implemented
- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Environment variable configuration
- Role-based access control
- Input validation with Mongoose schemas
- HTTPS support (when deployed with SSL)

#### ⚠️ To Be Implemented (Before Production)
- Rate limiting on API endpoints
- JWT token refresh mechanism
- Two-factor authentication (2FA)
- Password strength requirements
- Account lockout after failed attempts
- Input sanitization middleware
- SQL injection prevention (already using MongoDB)
- XSS protection headers
- CSRF tokens for forms
- Security headers (Helmet.js)
- Regular security audits

---

## Secure Configuration

### Environment Variables

Never use default or weak values:

```env
# ❌ BAD
JWT_SECRET=secret
MONGODB_URI=mongodb://localhost/test

# ✅ GOOD
JWT_SECRET=7f9a2b4c8d1e3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9
MONGODB_URI=mongodb+srv://user:strongpassword@cluster.mongodb.net/employee?retryWrites=true&w=majority
```

Generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### MongoDB Security

1. **Use strong passwords**
   - Minimum 16 characters
   - Random alphanumeric + special characters

2. **Enable authentication**
   ```javascript
   mongoose.connect(process.env.MONGODB_URI, {
     authSource: 'admin',
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```

3. **IP Whitelist**
   - Use MongoDB Atlas IP whitelist
   - Don't use 0.0.0.0/0 in production

4. **Regular backups**
   - Automated daily backups
   - Store in secure location
   - Test restoration process

---

## Common Vulnerabilities & Protections

### 1. SQL/NoSQL Injection

**Risk**: Malicious database queries

**Protection**:
- Use Mongoose ORM (never raw queries)
- Validate and sanitize input
- Use parameterized queries

```javascript
// ✅ Safe
const user = await EmployeeModel.findOne({ email: email });

// ❌ Unsafe (don't do this)
const user = await db.collection.find(`{email: "${email}"}`);
```

### 2. Cross-Site Scripting (XSS)

**Risk**: Malicious script injection

**Protection**:
- React auto-escapes JSX by default
- Never use `dangerouslySetInnerHTML` with user content
- Sanitize user input

```javascript
// ✅ Safe (React auto-escapes)
<div>{userInput}</div>

// ❌ Unsafe
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### 3. Cross-Site Request Forgery (CSRF)

**Risk**: Unauthorized actions on behalf of user

**Protection** (To be implemented):
- CSRF tokens for state-changing operations
- SameSite cookie attribute
- Verify origin headers

### 4. Authentication Bypass

**Risk**: Unauthorized access

**Protection**:
- Verify JWT on protected routes
- Check role permissions
- Invalidate tokens on logout

```javascript
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### 5. Sensitive Data Exposure

**Risk**: Leaking confidential information

**Protection**:
- Never return password hashes in API responses
- Don't log sensitive information
- Use HTTPS in production
- Implement proper error handling

```javascript
// ✅ Exclude password
const user = await EmployeeModel.findById(id).select('-password');

// ❌ Includes password
const user = await EmployeeModel.findById(id);
```

### 6. Broken Access Control

**Risk**: Users accessing unauthorized resources

**Protection**:
- Verify ownership of resources
- Check user roles for admin actions
- Never trust client-side access control

```javascript
// ✅ Verify ownership
app.put('/profile/:id', verifyToken, async (req, res) => {
  if (req.user.sub !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // Update profile
});
```

### 7. Mass Assignment

**Risk**: Updating unintended fields

**Protection**:
- Explicitly specify allowed fields
- Don't directly pass `req.body` to database

```javascript
// ✅ Explicit fields
const { name, phone, bio } = req.body;
await EmployeeModel.findByIdAndUpdate(id, { name, phone, bio });

// ❌ Allows any field
await EmployeeModel.findByIdAndUpdate(id, req.body);
```

---

## Security Headers

### Recommended Headers (To be implemented)

Install Helmet.js:
```bash
npm install helmet
```

Use in Express:
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

---

## Rate Limiting

### To Be Implemented

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

app.use('/login', authLimiter);
app.use('/register', authLimiter);
```

---

## Audit Log

### Future Implementation

Track important security events:
- Login attempts (successful and failed)
- Password changes
- Role changes
- Data exports
- Admin actions

---

## Incident Response Plan

### In Case of Security Breach

1. **Immediate Actions**
   - Identify the scope of the breach
   - Isolate affected systems
   - Revoke compromised credentials
   - Notify the security team

2. **Investigation**
   - Analyze logs
   - Determine root cause
   - Identify affected users

3. **Remediation**
   - Deploy fixes
   - Reset compromised passwords
   - Update security measures

4. **Communication**
   - Notify affected users
   - Public disclosure (if necessary)
   - Document lessons learned

---

## Regular Security Tasks

### Daily
- Monitor error logs
- Check for suspicious activity
- Review failed login attempts

### Weekly
- Review access logs
- Check for outdated dependencies
- Verify backup integrity

### Monthly
- Run security audit: `npm audit`
- Update dependencies
- Review and rotate API keys
- Security training for team

### Quarterly
- Password policy review
- Penetration testing
- Security policy update
- Third-party security audit

---

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## Responsible Disclosure

We believe in responsible disclosure. If you report a vulnerability to us:

- We will not take legal action against you
- We will work with you to understand and resolve the issue
- We will credit you for the discovery (if you wish)
- We will keep you informed of our progress

---

## Bug Bounty Program

Currently, we do not have a formal bug bounty program. However, we greatly appreciate security reports and may offer:

- Public recognition (Hall of Fame)
- Swag and merchandise
- Future consideration for bug bounty rewards

---

## Contact

**Security Team**: security@mindwell.com  
**General Support**: support@mindwell.com  
**GitHub**: [Open an issue](https://github.com/yourusername/repo/issues) (for non-security bugs)

---

**Last Updated**: March 6, 2026  
**Version**: 1.0.0

Thank you for helping keep Mental Health Support Network secure! 🔒
