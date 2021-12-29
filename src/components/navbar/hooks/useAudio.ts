import useBoolean from 'lib/hooks/useBoolean';
import useInterval from 'lib/hooks/useInterval';
import { useRef, useState } from 'react';

export default function useAudio(url?: string) {
  const audioRef = useRef(url !== undefined ? new Audio(url) : null);
  const [isPlaying, , setTrueIsPlaying, setFalseIsPlaying] = useBoolean();

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const setAudioUrl = (url: string) => {
    audioRef.current = new Audio(url);

    audioRef.current.onloadeddata = () => {
      if (audioRef.current !== null) {
        setDuration(audioRef.current.duration);
      }
    };
  };

  const onPlay = () => {
    setTrueIsPlaying();

    if (audioRef.current !== null) {
      audioRef.current.play();
    }
  };

  const onPause = () => {
    setFalseIsPlaying();

    if (audioRef.current !== null) {
      audioRef.current.pause();
    }
  };

  // 재생 바를 위한 interval hooks
  useInterval(
    () => {
      if (audioRef.current === null) {
        return;
      }

      if (audioRef.current.ended) {
        onPause();
      } else {
        console.log(audioRef.current.currentTime);
        setProgress(audioRef.current.currentTime);
      }
    },
    isPlaying ? 500 : null,
  );

  return {
    audioRef,
    isPlaying,
    onPlay,
    onPause,
    setAudioUrl,
    progress,
    duration,
  };
}
