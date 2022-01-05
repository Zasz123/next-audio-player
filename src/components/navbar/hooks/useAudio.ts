import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import musicSlice from 'modules/music/slice';
import { musicApi } from 'services/musicApi';
import { AppState } from 'modules/store';

import useInterval from 'lib/hooks/useInterval';

export default function useAudio() {
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: playList = [] } = useSelector(
    musicApi.endpoints.getPlayList.select(),
  );
  const { playingInfo, selectedMusicId } = useSelector(
    (state: AppState) => state.music,
  );

  const onChangeProgress = (value: number) => {
    if (audioRef.current === null || value > playingInfo.duration) {
      return;
    }

    dispatch(musicSlice.actions.setProgress(value));
    audioRef.current.currentTime = value;
  };

  const onChangeVolume = (value: number) => {
    if (audioRef.current === null) {
      return;
    }

    dispatch(musicSlice.actions.setVolume(value));
    audioRef.current.volume = value / 100;
  };

  const onChangeSelectedMusic = (newMusicId: number) => {
    const newMusic = playList.find((item) => item.id === newMusicId);

    if (!newMusic) {
      return;
    }

    audioRef.current = new Audio(newMusic.url);

    audioRef.current.onloadeddata = () => {
      if (audioRef.current !== null) {
        dispatch(
          musicSlice.actions.setSelectedMusic({
            id: newMusicId,
            duration: audioRef.current.duration,
          }),
        );
        audioRef.current.volume = playingInfo.volume / 100;
      }
    };
  };

  const onPlay = () => {
    if (audioRef.current === null) {
      return;
    }

    dispatch(musicSlice.actions.playMusic());
    audioRef.current.play();
  };

  const onPause = () => {
    if (audioRef.current === null) {
      return;
    }

    dispatch(musicSlice.actions.pauseMusic());
    audioRef.current.pause();
  };

  const onMouseDownMusicProgress = () => {
    dispatch(musicSlice.actions.setIsPlayingBeforeSwipe(playingInfo.isPlaying));
    onPause();
  };

  const onMouseUpMusicProgress = () =>
    playingInfo.isPlayingBeforeSwipe ? onPlay() : undefined;

  const onChangeSelectedMusicToPrevious = () => {
    const newMusicIndex = playList.findIndex(
      (item) => item.id === selectedMusicId,
    );

    if (newMusicIndex - 1 === -1) {
      return;
    }

    const isPlayingBeforeChange = playingInfo.isPlaying;

    onPause();
    onChangeProgress(0);
    onChangeSelectedMusic(playList[newMusicIndex - 1].id);

    if (isPlayingBeforeChange) {
      onPlay();
    }
  };

  const onChangeSelectedMusicToNext = () => {
    const newMusicIndex = playList.findIndex(
      (item) => item.id === selectedMusicId,
    );

    if (newMusicIndex + 1 === playList.length) {
      return;
    }

    const isPlayingBeforeChange = playingInfo.isPlaying;

    onPause();
    onChangeProgress(0);
    onChangeSelectedMusic(playList[newMusicIndex + 1].id);

    if (isPlayingBeforeChange) {
      onPlay();
    }
  };

  // TODO: 현재는 테스트를 위해 play list 변화시마다 입력중
  // 나중에 곡 선택하면 onChangeSelectedMusic 호출되도록 수정
  useEffect(() => {
    if (playList.length > 0) {
      onChangeSelectedMusic(playList[0].id);
    }
  }, [playList]);

  // 재생 바를 위한 interval hooks
  useInterval(
    () => {
      if (audioRef.current === null) {
        return;
      }

      if (audioRef.current.ended) {
        onPause();
      } else {
        dispatch(musicSlice.actions.setProgress(audioRef.current.currentTime));
      }
    },
    playingInfo.isPlaying && audioRef.current !== null ? 1000 : null,
  );

  return {
    audioRef,
    onPlay,
    onPause,
    onChangeProgress,
    onChangeVolume,
    onChangeSelectedMusicToPrevious,
    onChangeSelectedMusicToNext,
    onMouseDownMusicProgress,
    onMouseUpMusicProgress,
  };
}
