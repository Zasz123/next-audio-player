import { useRef, useState } from 'react';

import useBoolean from 'lib/hooks/useBoolean';
import useInterval from 'lib/hooks/useInterval';

import { IMusic } from 'interfaces/music';

export default function useAudio(initialMusic?: IMusic) {
  const audioRef = useRef(
    initialMusic !== undefined ? new Audio(initialMusic.url) : null,
  );

  const [isPlaying, , setTrueIsPlaying, setFalseIsPlaying] = useBoolean();
  const [isPlayingBeforeSwipe, onChangeIsPlayingBeforeSwipe] =
    useBoolean(isPlaying);
  const [selectedMusic, setSelectedMusic] = useState<IMusic | null>(
    initialMusic || null,
  );
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(10);

  const onChangeProgress = (value: number) => {
    if (audioRef.current === null || value > duration) {
      return;
    }

    setProgress(value);
    audioRef.current.currentTime = value;
  };

  const onChangeVolume = (value: number) => {
    if (audioRef.current === null) {
      return;
    }

    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  const onChangeSelectedMusic = (newMusic: IMusic) => {
    setSelectedMusic(newMusic);
    audioRef.current = new Audio(newMusic.url);

    audioRef.current.onloadeddata = () => {
      if (audioRef.current !== null) {
        setDuration(audioRef.current.duration);
        audioRef.current.volume = volume / 100;
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
    volume,
    onChangeVolume,
    isPlayingBeforeSwipe,
    onChangeIsPlayingBeforeSwipe,
  };
}
