import styled from 'styled-components';

const Progress = styled.input<{ width?: number }>`
  width: 500px;
  height: 5px;

  background-color: #ff8080;
`;

interface IProps {
  duration: number;
  progress: number;
}

function PlayerProgress({ duration, progress }: IProps) {
  return (
    // TODO: input range 사용하지 않고 구현하기.
    <Progress
      type="range"
      min={0}
      max={10000}
      value={(progress / duration || 0) * 10000} // 0 / 0 = NaN임.
      onChange={(e) => console.log(e.target.value)}
    />
  );
}

export default PlayerProgress;
