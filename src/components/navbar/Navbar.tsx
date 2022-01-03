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
    isPlaying,
    audioRef,
    onPlay,
    onPause,
    progress,
    onChangeProgress,
    duration,
    isPlayingBeforeSwipe,
    onChangeIsPlayingBeforeSwipe,
    onChangeSelectedMusicToNext,
    onChangeSelectedMusicToPrevious,
  } = useAudio(playList.data);

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
