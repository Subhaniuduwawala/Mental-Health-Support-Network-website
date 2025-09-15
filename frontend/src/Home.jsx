import React, { useState, useEffect } from 'react';
import './Home.css';
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";
import image5 from "./assets/image5.jpg";
import image6 from "./assets/image6.jpg";
import image8 from "./assets/image8.jpg";
import image9 from "./assets/image9.jpg";
import image10 from "./assets/image10.jpg";
import image11 from "./assets/image11.jpg";
import image12 from "./assets/image12.jpg";

const Home = () => {
  const images = [image1, image8, image9, image10];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      {/* Hero Section with auto-sliding background */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="overlay">
          <h1>Feel Heard, Heal Better</h1>
          <p>Your safe space for emotional support, guidance, and growth</p>
          <button className="call-btn">Call Us Now</button>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2>How our MindWell system works</h2>
        <div className="steps">
          <div className="step">
            <img src={image5} alt="Step 1" />
            <div>
              <h3>Step 1: Check in With Yourself</h3>
              <p>Take a quick self-assessment to reflect on how you're feeling. No judgment here.</p>
            </div>
          </div>

          <div className="step">
            <img src={image3} alt="Step 2" />
            <div>
              <h3>Step 2: Chat With Our Support</h3>
              <p>Get instant tips and calming advice from our friendly chat, 24/7.</p>
            </div>
          </div>

          <div className="step">
            <img src={image4} alt="Step 3" />
            <div>
              <h3>Step 3: Book a Counselor</h3>
              <p>Connect with someone who understands and is ready to help.</p>
            </div>
          </div>

          <div className="step">
            <img src={image2} alt="Step 4" />
            <div>
              <h3>Step 4: Explore Resources</h3>
              <p>Access a library of calming tips, exercises, and articles to strengthen your mental health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
  <div className="why-container">
    
    <div className="why-image">
      <img src={image6} alt="Why Choose MindWell" />
    </div>

    
    <div className="why-content">
      <h2>Why You Choose MindWell</h2>
      <ul>
        <li>Confidential & Caring Support</li>
        <li>Licensed Counselors Available</li>
        <li>Accessible 24/7</li>
        <li>Science-Based Resources</li>
        <li>Safe, Acceptable, and Free</li>
      </ul>
    </div>
   </div>
  </section>

      {/* Statistics and Guiding Principles */}
    ;

<section className="stats-guiding">
  {/* Stats - Left */}
  <div className="stats">
    <div className="stats-image">
      <img src={image11} alt="Mental Health Stats" />
    </div>
    <div className="stats-content">
      <h3>Mental Health by the Numbers</h3>
      <p>1500+ Chats handled weekly</p>
      <p>200+ Counselors Available</p>
      <p>1500+ Resources Shared</p>
    </div>
  </div>

  {/* Guiding Principles - Right */}
  <div className="guiding">
    <div className="guiding-image">
      <img src={image12} alt="ZenFit Guiding Principles" />
    </div>
    <div className="guiding-content">
      <h3>The ZenFit Guiding Principles</h3>
      <ul>
        <li>Confidentiality</li>
        <li>Compassion</li>
        <li>Connection</li>
        <li>Calmness</li>
      </ul>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
