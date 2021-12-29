import { useEffect } from 'react';
import styled from 'styled-components';

import useAudio from './hooks/useAudio';

import PlayerProgress from './PlayerProgress';

const Container = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 40px;

  background-color: #8b8b8b;
  color: white;
`;

function Navbar() {
  const { audioRef, onPlay, onPause, setAudioUrl, progress, duration } =
    useAudio();
  const defaultUrl = 'http://127.0.0.1:8887/test.mp3';

  useEffect(() => {
    setAudioUrl(defaultUrl);
  }, []);

  return (
    <Container>
      <PlayerProgress duration={duration} progress={progress} />
      <br />
      <audio ref={audioRef} />
      <button onClick={onPlay}>play</button>
      <button onClick={onPause}>pause</button>
      <button onClick={onPause}>previous</button>
      <button onClick={onPause}>next</button>
    </Container>
  );
}

export default Navbar;
