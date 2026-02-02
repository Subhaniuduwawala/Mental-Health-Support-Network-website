import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import logo1 from "./assets/logo1.png";
import Background from "./assets/Background.mp4";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/login', { 
         email, password 
      });

      if (response.data.Status === "Success") {
        // Save login info
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        
        // Show success message with role info
        console.log("✅ Login successful! Role:", response.data.role);
        
        // Redirect based on role
        if (response.data.role === "admin") {
          navigate('/admin/appointments');
        } else {
          navigate('/home');
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src={Background}  type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Login Card */}
      <div className="form-box">
        <div className="text-center mb-3">
          <img
            src={logo1}
            alt="Logo"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h2 className="fw-bold">Login</h2>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-2">Don't have an account?</p>
        <Link to="/register" className="btn btn-secondary w-100 fw-bold text-blue">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
