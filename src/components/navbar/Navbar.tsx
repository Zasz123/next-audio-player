import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useGetPlayListQuery } from 'services/musicApi';

import useAudio from './hooks/useAudio';

import MusicProgress from './MusicProgress';
import { AppState } from 'modules/store';

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
  useGetPlayListQuery();
  const { duration, progress, volume } = useSelector(
    (state: AppState) => state.music.playingInfo,
  );

  const {
    audioRef,
    onPlay,
    onPause,
    onChangeVolume,
    onChangeProgress,
    onChangeSelectedMusicToNext,
    onChangeSelectedMusicToPrevious,
    onMouseDownMusicProgress,
    onMouseUpMusicProgress,
  } = useAudio();

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
        onMouseDown={onMouseDownMusicProgress}
        onMouseUp={onMouseUpMusicProgress}
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
