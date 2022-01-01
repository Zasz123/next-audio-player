import styled from 'styled-components';

const Progress = styled.input`
  width: 200px;
  height: 5px;
`;

interface IProps {
  volume: number;
  onChangeVolume: (value: number) => void;
}

function VolumeProgress({ volume, onChangeVolume }: IProps) {
  return (
    <Progress
      type="range"
      min={0}
      max={100}
      value={volume}
      onChange={(e) => onChangeVolume(e.target.valueAsNumber)}
    />
  );
}

export default VolumeProgress;
