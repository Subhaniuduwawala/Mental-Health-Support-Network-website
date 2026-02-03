import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import "./MusicList.css";

const MusicList = () => {
  const navigate = useNavigate();
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusicPlayer();

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const response = await axios.get("http://localhost:3001/music");
      setMusicList(response.data);
    } catch (err) {
      console.error("Failed to fetch music:", err);
      alert("❌ Failed to load music list");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = (music) => {
    if (currentTrack?._id === music._id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(music);
    }
  };

  if (loading) {
    return (
      <div className="music-list-container">
        <div className="loading">Loading music...</div>
      </div>
    );
  }

  return (
    <div className="music-list-container">
      <div className="music-list-header">
        <button className="back-btn" onClick={() => navigate("/support")}>
          ← Back to Support
        </button>
        <h1>🎵 Calm Music Collection</h1>
        <p>Listen to our carefully curated collection of relaxing music</p>
      </div>

      {musicList.length === 0 ? (
        <div className="no-music">
          <p>No music available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="music-grid">
          {musicList.map((music) => (
            <div 
              key={music._id} 
              className={`music-card ${currentTrack?._id === music._id && isPlaying ? 'playing' : ''}`}
            >
              <div className="music-icon">🎵</div>
              <div className="music-info">
                <h3>{music.title}</h3>
                <p className="artist">{music.artist}</p>
                {music.duration && <p className="duration">Duration: {music.duration}</p>}
                {music.fileSize && <p className="file-size">Size: {music.fileSize}</p>}
              </div>
              <button 
                className="play-button"
                onClick={() => handlePlayPause(music)}
              >
                {currentTrack?._id === music._id && isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicList;
