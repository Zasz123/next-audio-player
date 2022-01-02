import styled from 'styled-components';

const Progress = styled.input<{ width?: number; height?: number }>`
  width: ${({ width }) => (width !== undefined ? `${width}px` : '100%')};
  height: ${({ height }) => (height !== undefined ? `${height}px` : undefined)};
`;

interface IProps {
  width?: number;
  height?: number;
  progressMin: number;
  progressMax: number;
  progress: number;
  onChangeProgress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: () => void;
  onMouseDown?: () => void;
}

function MusicProgress({
  progressMin,
  progressMax,
  progress,
  onChangeProgress,
  onMouseDown,
  onMouseUp,
  ...styleProps
}: IProps) {
  return (
    <Progress
      type="range"
      min={progressMin}
      max={progressMax}
      value={progress}
      onChange={onChangeProgress}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      {...styleProps}
    />
  );
}

export default MusicProgress;
