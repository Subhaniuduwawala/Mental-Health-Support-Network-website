import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo1 from "../assets/logo1.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
    close();
  };

  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");
  

  const links = [
    { to: "/home", label: "HOME" },
    { to: "/service", label: "SERVICE" },
    { to: "/counselors", label: "COUNSELORS" },
    { to: "/support", label: "SUPPORT" },
    { to: "/about", label: "ABOUTUS" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/home" className="brand" onClick={close}>
          <img src={logo1} className="brand-mark" alt="MindWell Logo" />
          MindWell
        </Link>

        <button
          className="nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={open ? "true" : "false"}
          onClick={toggle}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          <span className="sr-only">Menu</span>
        </button>

        <nav id="primary-navigation" className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/home"}
              onClick={close}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="actions">
            {username ? (
              <>
                <div className="profile-menu">
                  <button 
                    className="profile-btn"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <span className="user-icon"></span>
                    <span className="username">{username}</span>
                    <svg className={`dropdown-icon ${profileOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  
                  {profileOpen && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <div className="user-info">
                          <p className="user-name">{username}</p>
                          <p className="user-role">{userRole}</p>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={() => {
                          setProfileOpen(false);
                          close();
                        }}
                      >
                        <span className="icon">⚙️</span> View Profile
                      </Link>
                      {userRole === "admin" && (
                        <Link 
                          to="/admin/appointments" 
                          className="dropdown-item"
                          onClick={() => {
                            setProfileOpen(false);
                            close();
                          }}
                        >
                          <span className="icon">📋</span> Admin Panel
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item logout"
                        onClick={() => {
                          handleLogout();
                          setProfileOpen(false);
                        }}
                      >
                        <span className="icon">🚪</span> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn ghost" onClick={close}>
                  Log in
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
