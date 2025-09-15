
import React from "react";
import "./Service.css";
import image1 from "./assets/image1.jpg";
import image15 from "./assets/image15.jpg";
import image13 from "./assets/image13.jpg";
import image14 from "./assets/image14.jpg";
import image16 from "./assets/image16.jpg";
import heroVideo from "./assets/hero-video.mp4";
import image17 from "./assets/image17.png";
import image18 from "./assets/image18.png"; 
import image19 from "./assets/image19.png";
import image20 from "./assets/image20.png";
import image21 from "./assets/image21.png";
import image22 from "./assets/image22.png";
import image23 from "./assets/image23.jpg";


const Service = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
  <video
  src={heroVideo}
  autoPlay
  muted
  loop
  playsInline
  className="hero-video"
/>
  
</section>


      {/* 4 Small Service Cards */}
      <section className="quick-services">
        <div className="service-card">
          <img src={image13} alt="Service 1" />
          <h3>Understand Your Emotions</h3>
          <p>Explore guided meditations and calming exercises to regain focus and inner peace. Simple techniques can make a big difference in your daily life.</p>
        </div>
        <div className="service-card">
          <img src={image15} alt="Service 2" />
          <h3>Practice Mindfulness & Calm</h3>
          <p>Simple breathing and mindfulness exercises to stay centered.</p>
        </div>
        <div className="service-card">
          <img src={image14} alt="Service 3" />
          <h3>Express and Reflect</h3>
          <p>Whether it's through journaling, art, or goal-setting, creative expression supports your healing process. MindWell encourages you to reconnect with yourself.</p>
        </div>
        <div className="service-card">
          <img src={image16} alt="Service 4" />
          <h3>Feel Empowered Again</h3>
          <p>Step into clarity, confidence, and emotional freedom. With the right tools and support, you can rise above challenges and feel like yourself again.</p>
        </div>
      </section>

      {/* 6 Blue Concept Cards */}
      <section className="concepts-section">
        <div className="concept-card">
          <img src={image17} alt="Concept 1" />
          <h4>The Benefits of Mindfulness</h4>
        </div>
        <div className="concept-card">
          <img src={image18} alt="Concept 2" />
          <h4>How to Practice Mindfulness</h4>
        </div>
        <div className="concept-card">
          <img src={image19} alt="Concept 3" />
          <h4>Mindfulness at Work</h4>
        </div>
        <div className="concept-card">
          <img src={image20} alt="Concept 4" />
          <h4>Mindfulness for Mental Health</h4>
        </div>
        <div className="concept-card">
          <img src={image21} alt="Concept 5" />
          <h4>Incorporating Mindfulness into Daily Life</h4>
        </div>
        <div className="concept-card">
          <img src={image22} alt="Concept 6" />
          <h4>Common Mindfulness Myths</h4>
        </div>
      </section>

      {/* Chat CTA Banner */}
      <section
        className="chat-banner"
        style={{ backgroundImage: `url(${image23})` }}
      >
        <div className="chat-content">
          <h2>Feeling Overwhelmed? Let’s Chat.</h2>
          <p>
            Sometimes all you need is someone to listen. Our caring chat feature
            is here for you 24/7, offering comfort, tips, and a safe space.
          </p>
          <button className="chat-btn">Chat Now</button>
        </div>
      </section>
    </div>
  );
};

export default Service;   
