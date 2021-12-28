import useBoolean from 'lib/hooks/useBoolean';
import { useRef } from 'react';

// "file:///Users/kyungminyang/Music/music/test.mp3"
export default function useAudio(url?: string) {
  const audioRef = useRef(url !== undefined ? new Audio(url) : null);
  const [isPlaying, , setTrueIsPlaying, setFalseIsPlaying] = useBoolean();

  const setAudioUrl = (url: string) => {
    audioRef.current = new Audio(url);
  };

  const onPlay = () => {
    setTrueIsPlaying();
    if (audioRef.current !== null) {
      console.log(audioRef.current.currentTime);
      console.log(audioRef.current.duration);
      audioRef.current.play();
    }
  };

  const onPause = () => {
    setFalseIsPlaying();
    if (audioRef.current !== null) {
      audioRef.current.pause();
    }
  };

  return [audioRef, isPlaying, onPlay, onPause, setAudioUrl] as const;
}
