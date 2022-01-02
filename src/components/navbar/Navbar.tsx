import { useEffect } from 'react';
import styled from 'styled-components';

import useAudio from './hooks/useAudio';
import useFetchAudio from './hooks/useFetchAudio';

import MusicProgress from './MusicProgress';

const Container = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 70px;

  background-color: #8b8b8b;
  color: white;
`;

function Navbar() {
  const [playList] = useFetchAudio();
  const {
    volume,
    onChangeVolume,
    selectedMusic,
    isPlaying,
    audioRef,
    onPlay,
    onPause,
    onChangeSelectedMusic,
    progress,
    onChangeProgress,
    duration,
    isPlayingBeforeSwipe,
    onChangeIsPlayingBeforeSwipe,
  } = useAudio();

  const onChangeSelectedMusicToPrevious = () => {
    const newMusicIndex = playList.findIndex(
      (item) => item.id === selectedMusic?.id,
    );

    if (newMusicIndex - 1 === -1) {
      return;
    }

    const isPlayingBeforeChange = isPlaying;

    onPause();
    onChangeProgress(0);
    onChangeSelectedMusic(playList[newMusicIndex - 1]);

    if (isPlayingBeforeChange) {
      onPlay();
    }
  };

  const onChangeSelectedMusicToNext = () => {
    const newMusicIndex = playList.findIndex(
      (item) => item.id === selectedMusic?.id,
    );

    if (newMusicIndex + 1 === playList.length) {
      return;
    }

    const isPlayingBeforeChange = isPlaying;

    onPause();
    onChangeProgress(0);
    onChangeSelectedMusic(playList[newMusicIndex + 1]);

    if (isPlayingBeforeChange) {
      onPlay();
    }
  };

  // TODO: 현재는 테스트를 위해 play list 변화시마다 입력중
  // 나중에 곡 선택하면 onChangeSelectedMusic 호출되도록 수정
  useEffect(() => {
    if (playList.length > 0) {
      onChangeSelectedMusic(playList[0]);
    }
  }, [playList]);

  return (
    <Container>
      {/* music progress */}
      <MusicProgress
        width={700}
        progress={(progress / duration || 0) * 10000}
        progressMin={0}
        progressMax={10000}
        onChangeProgress={(event) =>
          onChangeProgress((event.target.valueAsNumber / 10000) * duration)
        }
        onMouseDown={() => {
          onChangeIsPlayingBeforeSwipe(isPlaying);
          onPause();
        }}
        onMouseUp={isPlayingBeforeSwipe ? onPlay : undefined}
      />
      {/* volume progress */}
      <MusicProgress
        width={100}
        progressMin={0}
        progressMax={100}
        progress={volume}
        onChangeProgress={(event) => onChangeVolume(event.target.valueAsNumber)}
      />
      <br />
      <audio ref={audioRef} />
      <button onClick={onPlay}>play</button>
      <button onClick={onPause}>pause</button>
      <button onClick={onChangeSelectedMusicToPrevious}>previous</button>
      <button onClick={onChangeSelectedMusicToNext}>next</button>
    </Container>
  );
}

export default Navbar;
