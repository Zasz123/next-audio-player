import { useRef, useState } from 'react';

import useBoolean from 'lib/hooks/useBoolean';
import useInterval from 'lib/hooks/useInterval';

export default function useAudio(url?: string) {
  const audioRef = useRef(url !== undefined ? new Audio(url) : null);
  const [isPlaying, , setTrueIsPlaying, setFalseIsPlaying] = useBoolean();

  const [selectedMusic, setSelectedMusic] = useState(url ?? '');
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const onChangeProgress = (value: number) => {
    if (audioRef.current === null) {
      return;
    }

    setProgress(value);
    audioRef.current.currentTime = value;
  };

  const onChangeSelectedMusic = (url: string) => {
    setSelectedMusic(url);
    audioRef.current = new Audio(url);

    audioRef.current.onloadeddata = () => {
      if (audioRef.current !== null) {
        setDuration(audioRef.current.duration);
      }
    };
  };

  const onPlay = () => {
    if (audioRef.current === null) {
      return;
    }

    setTrueIsPlaying();
    audioRef.current.play();
  };

  const onPause = () => {
    if (audioRef.current === null) {
      return;
    }

    setFalseIsPlaying();
    audioRef.current.pause();
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
        setProgress(audioRef.current.currentTime);
      }
    },
    isPlaying && audioRef.current !== null ? 1000 : null,
  );

  return {
    audioRef,
    isPlaying,
    onPlay,
    onPause,
    selectedMusic,
    onChangeSelectedMusic,
    progress,
    onChangeProgress,
    duration,
  };
}
