import { useRef, useState } from 'react';

import useBoolean from 'lib/hooks/useBoolean';
import useInterval from 'lib/hooks/useInterval';

export default function useAudio(url?: string) {
  const audioRef = useRef(url !== undefined ? new Audio(url) : null);
  const [isPlaying, , setTrueIsPlaying, setFalseIsPlaying] = useBoolean();
  const [
    isPlayingBeforeSwipe,
    ,
    setTrueIsPlayingBeforeSwipe,
    setFalseIsPlayingBeforeSwipe,
  ] = useBoolean();

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const onChangeProgress = (value: number) => {
    setProgress(value);
    if (audioRef.current !== null) {
      audioRef.current.currentTime = value;
    }
  };

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
        setProgress(audioRef.current.currentTime);
      }
    },
    isPlaying ? 1000 : null,
  );

  return {
    audioRef,
    isPlaying,
    isPlayingBeforeSwipe,
    setTrueIsPlayingBeforeSwipe,
    setFalseIsPlayingBeforeSwipe,
    onPlay,
    onPause,
    setAudioUrl,
    progress,
    onChangeProgress,
    duration,
  };
}
