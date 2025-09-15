import React, { useState } from "react";
import "./AboutUs.css";
import heroVideo from "./assets/hero-video5.mp4";
import image37 from "./assets/image37.jpg";
import image38 from "./assets/image38.jpg";
import image39 from "./assets/image39.jpg";

export default function AboutUs() {
  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Server error.");
    }
  };


  return (
    <main className="about-us-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video5"
          />
          <h1>Your Path to Inner Peace Starts Here</h1>
          <p>
            At MindWell, we provide you with the tools, support, and resources
            to nurture your mental and emotional well-being. Whether you're
            looking for relaxation techniques, calming exercises, or expert
            counseling, we're here for you every step of the way.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At MindWell, we are committed to providing holistic mental health
          support through accessible resources and compassionate care. Our
          mission is to create a safe, nurturing environment where individuals
          can connect, heal, and grow.
        </p>
      </section>

      {/* Vision Section */}
      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          We envision a world where mental wellness is prioritized, and everyone
          has the tools, support, and understanding they need to thrive. We aim
          to break down the barriers around mental health and offer personalized
          resources that promote emotional well-being.
        </p>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <p>
          We have a passionate team of counselors, educators, and mental health
          professionals who are dedicated to supporting you through your
          wellness journey.
        </p>
        <div className="team-members">
          <div className="team-member">
            <img src={image37} alt="Team Member 1" />
            <h3>Prabash Ranaweera</h3>
            <p>Clinical Psychologist</p>
          </div>
          <div className="team-member">
            <img src={image38} alt="Team Member 2" />
            <h3>Rinaya Perera</h3>
            <p>Mental Health Educator</p>
          </div>
          <div className="team-member">
            <img src={image39} alt="Team Member 3" />
            <h3>Kasuni Jayasinghe</h3>
            <p>Wellness Coach</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values">
        <h2>Our Core Values</h2>
        <div className="values-container">
          <div className="value-card">
            <h3>Compassion</h3>
            <p>
              We approach every interaction with empathy and understanding,
              recognizing the unique struggles of each individual and offering a
              safe space for healing.
            </p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>
              We uphold transparency, honesty, and trust in everything we do,
              ensuring that our clients feel confident and secure in their
              journey toward mental wellness.
            </p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>
              We embrace creative solutions to improve mental health care for
              all, utilizing cutting-edge technology and research to provide the
              most effective and personalized support possible.
            </p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>
              We foster a supportive and inclusive environment where everyone
              belongs, building strong connections that empower individuals to
              thrive together.
            </p>
          </div>
          <div className="value-card">
            <h3>Respect</h3>
            <p>
              We honor the dignity of each person, respecting their values,
              choices, and experiences while providing care that is tailored to
              their specific needs.
            </p>
          </div>
          <div className="value-card">
            <h3>Collaboration</h3>
            <p>
              We believe in the power of teamwork, working alongside clients,
              healthcare professionals, and the community to create a holistic
              approach to mental health care.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
      <h2>Get in Touch</h2>
      <p>We'd love to hear from you! Reach out for support, collaboration, or inquiries.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
    </main>
  );
}
