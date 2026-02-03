import { useContext } from 'react';
import MusicPlayerContext from '../contexts/MusicPlayerContext.jsx';

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
};
