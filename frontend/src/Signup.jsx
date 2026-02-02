import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./Signup.css";
import logo1 from "./assets/logo1.png";
import Background from "./assets/Background.mp4";



function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/register', {name, email, password})
            if (response.data.Status === "Success") {
                navigate('/login')
            } else {
                setError(response.data.message || "Registration failed. Please try again.")
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An error occurred. Please try again later.")
            }
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="signup-container">
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src={Background} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Signup Card */}
      <div className="form-box">
        <div className="text-center mb-3">
          <img
            src={logo1}
            alt="Logo"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h2 className="fw-bold">Sign Up</h2>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-2">Already have an account</p>
        <Link
          to="/login"
          className="btn btn-secondary w-100 fw-bold text-blue"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
