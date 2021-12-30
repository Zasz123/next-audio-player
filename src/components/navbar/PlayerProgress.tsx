import useBoolean from 'lib/hooks/useBoolean';
import styled from 'styled-components';

const Progress = styled.input<{ width?: number }>`
  width: 100%;
  height: 5px;

  background-color: #ff8080;
`;

interface IProps {
  isPlaying: boolean;
  duration: number;
  progress: number;
  onChangeProgress: (value: number) => void;
  onPlay: () => void;
  onPause: () => void;
}

function PlayerProgress({
  isPlaying,
  duration,
  progress,
  onChangeProgress,
  onPlay,
  onPause,
}: IProps) {
  const [isPlayingBeforeSwipe, setIsPlayingBeforeSwipe] = useBoolean(isPlaying);

  return (
    // TODO: input range 사용하지 않고 구현하기.
    <Progress
      type="range"
      min={0}
      max={10000}
      value={(progress / duration || 0) * 10000} // 0 / 0 = NaN임.
      onChange={(e) =>
        onChangeProgress((e.target.valueAsNumber / 10000) * duration)
      }
      onMouseDown={() => {
        setIsPlayingBeforeSwipe(isPlaying);
        onPause();
      }}
      onMouseUp={isPlayingBeforeSwipe ? onPlay : undefined}
    />
  );
}

export default PlayerProgress;
