import { useState, useEffect } from 'react';

export default function useFetchAudio() {
  const [playList, setPlayList] = useState<Array<string>>([]);

  useEffect(() => {
    setPlayList([
      'http://127.0.0.1:8887/test.mp3',
      'http://127.0.0.1:8887/best_part.mp3',
    ]);
  }, []);

  return [playList] as const;
}
