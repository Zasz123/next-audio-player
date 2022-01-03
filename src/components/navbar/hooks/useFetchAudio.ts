import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IMusic } from 'interfaces/music';

import { AppState } from 'modules/store';
import musicSlice from 'modules/music/slice';

export const musics: Array<IMusic> = [
  {
    id: 1,
    title: '생명의 이름',
    url: 'http://127.0.0.1:8887/test.mp3',
    createdAt: '2022-01-03 12:12:12',
  },
  {
    id: 2,
    title: 'Best Part',
    url: 'http://127.0.0.1:8887/best_part.mp3',
    createdAt: '2022-01-03 12:12:12',
  },
];

export default function useFetchAudio() {
  const { playList } = useSelector((state: AppState) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(musicSlice.actions.setPlayListPending());
  }, [dispatch]);

  return [playList] as const;
}
