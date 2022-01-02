import { useState, useEffect } from 'react';

import { IMusic } from 'interfaces/music';

const musics: Array<IMusic> = [
  {
    id: 1,
    title: '생명의 이름',
    url: 'http://127.0.0.1:8887/test.mp3',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Best Part',
    url: 'http://127.0.0.1:8887/best_part.mp3',
    createdAt: new Date(),
  },
];

export default function useFetchAudio() {
  const [playList, setPlayList] = useState<Array<IMusic>>([]);

  useEffect(() => {
    setPlayList([...musics]);
  }, []);

  return [playList] as const;
}
