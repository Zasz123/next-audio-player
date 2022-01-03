import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMusic } from 'interfaces/music';

interface IMusicState {
  playList: { data: Array<IMusic>; loading: boolean; error: boolean };
}

const initialState: IMusicState = {
  playList: {
    data: [],
    loading: false,
    error: false,
  },
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setPlayListPending: (state) => {
      state.playList = {
        ...state.playList,
        loading: true,
      };
    },
    setPlayListSuccess: (state, { payload }: PayloadAction<Array<IMusic>>) => {
      state.playList.loading = false;
      state.playList.data = payload;
    },
    setPlayListFailure: (state) => {
      state.playList.loading = false;
      state.playList.error = true;
    },
  },
});

export default musicSlice;
