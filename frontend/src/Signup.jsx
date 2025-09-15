import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./Signup.css";
import logo1 from "./assets/logo1.png";
import Background from "./assets/Background.mp4";



function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email, password})
        .then(res => {
            navigate('/login')
        }).catch(err => console.log(err))
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-2">Already have an account</p>
        <Link
          to="/login"
          className="btn btn-secondary w-100 fw-bold text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
