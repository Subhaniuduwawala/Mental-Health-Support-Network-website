import React from "react";
import { useNavigate } from "react-router-dom";
import "./MiniGames.css";

const MiniGames = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      name: "Memory Match",
      description: "Test your memory with this classic card matching game",
      url: "https://www.crazygames.com/game/memory-match",
      icon: "🧠"
    },
    {
      id: 2,
      name: "Bubble Shooter",
      description: "Relax with this colorful bubble popping game",
      url: "https://www.crazygames.com/game/bubble-shooter-pro",
      icon: "🎯"
    },
    {
      id: 3,
      name: "2048",
      description: "Puzzle game to keep your mind engaged",
      url: "https://www.crazygames.com/game/2048",
      icon: "🔢"
    },
    {
      id: 4,
      name: "Solitaire",
      description: "Classic card game for peaceful relaxation",
      url: "https://www.crazygames.com/game/classic-solitaire",
      icon: "🃏"
    },
    {
      id: 5,
      name: "Jewel Quest",
      description: "Match colorful gems in this calming puzzle",
      url: "https://www.crazygames.com/game/jewels-blitz-4",
      icon: "💎"
    },
    {
      id: 6,
      name: "Mahjong",
      description: "Traditional tile-matching game",
      url: "https://www.crazygames.com/game/mahjong-connect",
      icon: "🀄"
    },
    {
      id: 7,
      name: "Sudoku",
      description: "Number puzzle for mental relaxation",
      url: "https://www.crazygames.com/game/daily-sudoku",
      icon: "🔢"
    },
    {
      id: 8,
      name: "Jigsaw Puzzle",
      description: "Piece together beautiful images",
      url: "https://www.crazygames.com/game/jigsaw-puzzle",
      icon: "🧩"
    },
    {
      id: 9,
      name: "Snake Game",
      description: "Classic snake game for quick fun",
      url: "https://www.crazygames.com/game/google-snake",
      icon: "🐍"
    },
    {
      id: 10,
      name: "Chess",
      description: "Strategic board game for mental exercise",
      url: "https://www.crazygames.com/game/chess",
      icon: "♟️"
    }
  ];

  const handlePlayGame = (game) => {
    // Open game in new tab for better compatibility
    window.open(game.url, '_blank');
  };

  return (
    <div className="minigames-container">
      <div className="minigames-header">
        <button className="back-btn" onClick={() => navigate("/support")}>
          ← Back to Support
        </button>
        <h1>🎮 Relaxing Mini Games</h1>
        <p>Take a break and enjoy these calming games to reduce stress and anxiety</p>
        <p className="hint-text">Click any game to open and play in a new tab</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => handlePlayGame(game)}>
            <div className="game-icon">{game.icon}</div>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <button className="play-button">▶️ Play Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniGames;
