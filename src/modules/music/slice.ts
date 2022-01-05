import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMusicState {
  selectedMusicId: number;
  playingInfo: {
    isPlaying: boolean;
    duration: number;
    progress: number;
    volume: number;
    isPlayingBeforeSwipe: boolean;
  };
}

const initialState: IMusicState = {
  selectedMusicId: 0,
  playingInfo: {
    isPlaying: false,
    duration: 0,
    progress: 0,
    volume: 0.5,
    isPlayingBeforeSwipe: false,
  },
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    playMusic: (state) => {
      state.playingInfo.isPlaying = true;
    },
    pauseMusic: (state) => {
      state.playingInfo.isPlaying = false;
    },
    setIsPlayingBeforeSwipe: (state, { payload }: PayloadAction<boolean>) => {
      state.playingInfo.isPlayingBeforeSwipe = payload;
    },
    setSelectedMusic: (
      state,
      { payload }: PayloadAction<{ id: number; duration: number }>,
    ) => {
      state.selectedMusicId = payload.id;
      state.playingInfo.duration = payload.duration;
    },
    setProgress: (state, { payload }: PayloadAction<number>) => {
      state.playingInfo.progress = payload;
    },
    setVolume: (state, { payload }: PayloadAction<number>) => {
      state.playingInfo.volume = payload;
    },
  },
});

export default musicSlice;
