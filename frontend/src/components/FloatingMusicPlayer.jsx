import React, { useEffect } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import './FloatingMusicPlayer.css';

const FloatingMusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    pauseTrack,
    resumeTrack,
    stopTrack,
    seek,
    setCurrentTime,
    setDuration,
  } = useMusicPlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => stopTrack();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, setCurrentTime, setDuration, stopTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioData;
    audio.type = currentTrack.mimeType || 'audio/mpeg';
    
    if (isPlaying) {
      audio.play().catch(err => console.error('Playback error:', err));
    }
  }, [currentTrack, audioRef, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.error('Playback error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying, audioRef]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    seek(newTime);
  };

  if (!currentTrack) return null;

  return (
    <div className="floating-music-player">
      <audio ref={audioRef} />
      
      <div className="player-content">
        <div className="track-info">
          <div className="track-icon">🎵</div>
          <div className="track-details">
            <div className="track-title">{currentTrack.title}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </div>
        </div>

        <div className="player-controls">
          <button 
            className="control-btn"
            onClick={isPlaying ? pauseTrack : resumeTrack}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-btn" onClick={stopTrack}>
            ⏹️
          </button>
        </div>

        <div className="progress-section">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleSeek}>
            <div 
              className="progress-fill"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;
