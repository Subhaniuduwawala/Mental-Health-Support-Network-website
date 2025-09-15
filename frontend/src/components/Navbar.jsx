import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo1 from "../assets/logo1.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear(); // remove token + role + username
    sessionStorage.clear();
    navigate("/login");
    close();
  };

  // 👇 Read role saved from login
  const userRole = localStorage.getItem("userRole"); // "admin" or "employee"

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
            <Link to="/login" className="btn ghost" onClick={close}>
              Log in
            </Link>
            <button className="btn solid" onClick={handleLogout}>
              Logout
            </button>

            {/* 👇 Only show Admin if role is admin */}
            {userRole === "admin" && (
              <NavLink to="/admin/appointments" className="admin" onClick={close}>
                Admin
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
