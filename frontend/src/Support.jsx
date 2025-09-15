import React, { useState } from "react";
import "./Support.css";
import heroVideo from "./assets/hero-video3.mp4";

/* --- ICONS --- */
const Icon = {
  music: () => <span>🎵</span>,
  game: () => <span>🎮</span>,
  info: () => <span>ℹ️</span>,
  quote: () => <span>💬</span>,
  sleep: () => <span>😴</span>,
  lotus: () => <span>🧘</span>,
  book: () => <span>📚</span>,
  heart: () => <span>❤️</span>,
  sun: () => <span>🌞</span>,
};

/** ---------- Existing Sections (shortened for clarity) ---------- */
function BreathingExercise() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap">🌬️</span>
        <h2>Breathing Exercise</h2>
      </header>
      <p>Follow guided breathing patterns to calm your body and mind.</p>
      <div className="breath-visual">
        <div className="circle scale-up"></div>
        <div className="phase">Inhale</div>
        <div className="counter">4s</div>
      </div>
    </section>
  );
}

function CalmMusic() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.music /></span>
        <h2>Calm Music</h2>
      </header>
      <p>Play soothing tracks or explore our calming playlist.</p>
      <div className="yt-frame">
        <iframe
          title="Calm Playlist"
          src="https://www.youtube.com/embed/videoseries?list=PLQog_ExamplePlaylistId"
          allow="autoplay; encrypted-media"
        />
      </div>
    </section>
  );
}

function MiniGame() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.game /></span>
        <h2>Mini Game — Memory Match</h2>
      </header>
      <p>Play a short, light game to gently shift attention and relax.</p>
      <iframe
        className="game-frame"
        src="https://games.cdn.famobi.com/html5games/m/memory-html5/v210/?fg_domain=play.famobi.com&fg_aid=A1000-1"
        title="Memory Game"
      />
    </section>
  );
}

function Affirmations() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.quote /></span>
        <h2>Affirmations</h2>
      </header>
      <blockquote className="affirmation">“I choose to love myself unconditionally.”</blockquote>
      <blockquote className="affirmation">“I am capable of achieving my goals.”</blockquote>
      <blockquote className="affirmation">“Every day, I am thankful for the blessings in my life.”</blockquote>
      <blockquote className="affirmation">“I trust that everything will work out as it should.”</blockquote>
      <blockquote className="affirmation">“I believe in my abilities.”</blockquote>
    </section>
  );
}

function TipsResources() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.info /></span>
        <h2>Tips & Resources</h2>
      </header>
      <ul className="tips">
        <li><strong>Pause:</strong> unclench your jaw, sip water.</li>
        <li><strong>Journaling:</strong> write 3 words how you feel.</li>
        <li><strong>Move:</strong> gentle stretch or short walk.</li>
      </ul>
    </section>
  );
}

/** ---------- NEW EXTRA SECTIONS ---------- */
function GuidedMeditation() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.lotus /></span>
        <h2>Guided Meditation</h2>
      </header>
      <p>Take 5 minutes to reset with this short guided meditation.</p>
      <div className="yt-frame">
        <iframe
          title="Guided Meditation"
          src="https://www.youtube.com/embed/inpok4MKVLM"
          allow="autoplay; encrypted-media"
        />
      </div>
    </section>
  );
}

function CalmColoring() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.game /></span>
        <h2>Relax with Digital Coloring</h2>
      </header>
      <p>Click and fill the shapes with calming colors.</p>
      <iframe
        src="https://justcolor.net/online-coloring/"
        className="game-frame"
        title="Calm Coloring"
      ></iframe>
    </section>
  );
}

function HelpfulArticles() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.book /></span>
        <h2>Helpful Reads</h2>
      </header>
      <ul className="tips">
        <li><a href="https://www.helpguide.org/articles/stress/stress-management.htm" target="_blank" rel="noreferrer">How to Relieve Stress</a></li>
        <li><a href="https://www.verywellmind.com/ways-to-reduce-anxiety-2584183" target="_blank" rel="noreferrer">Ways to Reduce Anxiety</a></li>
        <li><a href="https://www.psychologytoday.com/intl/basics/mindfulness" target="_blank" rel="noreferrer">Mindfulness Basics</a></li>
      </ul>
    </section>
  );
}

function SleepSounds() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.sleep /></span>
        <h2>Sleep Sounds</h2>
      </header>
      <p>Play soothing sounds to drift into restful sleep.</p>
      <div className="yt-frame">
        <iframe
          title="Sleep Sounds"
          src="https://www.youtube.com/embed/1ZYbU82GVz4"
          allow="autoplay; encrypted-media"
        />
      </div>
    </section>
  );
}

/** ---------- NEW SECTIONS ---------- */
function HeartfulActivities() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.heart /></span>
        <h2>Heartful Activities</h2>
      </header>
      <p>Engage in activities that warm the heart like drawing, crafting, or writing a letter.</p>
      <ul className="tips">
        <li><strong>Sketching:</strong> Try a small drawing session for relaxation.</li>
        <li><strong>Crafting:</strong> Build something with your hands.</li>
        <li><strong>Letter Writing:</strong> Write a letter to someone you care about.</li>
      </ul>
    </section>
  );
}

function MorningRitual() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.sun /></span>
        <h2>Morning Ritual</h2>
      </header>
      <p>Start your day with a calming ritual to set a positive tone.</p>
      <ul className="tips">
        <li><strong>Sunrise Stretch:</strong> Gently stretch to wake up your body.</li>
        <li><strong>Warm Drink:</strong> Sip a hot beverage and focus on the warmth.</li>
        <li><strong>Mindful Breathing:</strong> Take 3 deep, mindful breaths before starting your day.</li>
      </ul>
    </section>
  );
}

function DailyAffirmation() {
  const affirmations = [
    "I am enough just as I am.",
    "I choose to be happy and positive.",
    "I am confident in my abilities.",
    "I am worthy of love and respect.",
    "I trust myself and the process of life.",
    "I am in control of my thoughts and emotions.",
    "I am grateful for this moment and the opportunities it brings.",
    "I radiate positivity and attract good things into my life."
  ];

  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.quote /></span>
        <h2>Daily Affirmation</h2>
      </header>
      <blockquote className="affirmation">{randomAffirmation}</blockquote>
    </section>
  );
}




/** ---------- Page ---------- */
export default function Support() {
  return (
    <main className="support-page">
      {/* Hero */}
      <section className="hero3">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video3"
        />
        <h1>MindWell Support</h1>
        <p>Gentle tools to steady your mind — breathe, listen, play, reflect, rest.</p>
      </section>

      {/* Grid Sections */}
      <div className="grid-wrap">
        <BreathingExercise />
        <CalmMusic />
        <MiniGame />
        <Affirmations />
        <TipsResources />
        <GuidedMeditation />
        <CalmColoring />
        <HelpfulArticles />
        <SleepSounds />
        <HeartfulActivities />
        <MorningRitual />
        <DailyAffirmation />
      </div>

      
    </main>
  );
}
