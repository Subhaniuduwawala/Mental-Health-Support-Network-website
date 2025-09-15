import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo1 from "../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo & Description */}
        <div className="footer-section about">
          <img src={logo1} alt="MindWell Logo" className="logo" />
          <p>
            MindWell is your safe space for emotional support, self-reflection, and healing.
            We’re here to listen, guide, and walk with you on your mental wellness journey.
          </p>
          <div className="socials">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Service</li>
            <li>Counselors</li>
            <li>Support</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Support & Resources */}
        <div className="footer-section resources">
          <h4>Support & Resources</h4>
          <ul>
            <li>FAQ</li>
            <li>Emergency Help</li>
            <li>Blog & Tips</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact Information</h4>
          <p><FaMapMarkerAlt /> Colombo, Sri Lanka</p>
          <p><FaPhoneAlt /> +94 76 123 4567</p>
          <p><FaEnvelope /> support@mindwell.org</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 MindWell. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
