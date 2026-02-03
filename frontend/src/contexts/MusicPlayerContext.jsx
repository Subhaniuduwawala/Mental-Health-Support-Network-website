import React, { useState, useRef, createContext } from 'react';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeTrack = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopTrack = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    playTrack,
    pauseTrack,
    resumeTrack,
    stopTrack,
    seek,
    setCurrentTime,
    setDuration,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerContext;
