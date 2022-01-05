import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import musicSlice from './music/slice';
import baseApi from 'services/baseApi';

const makeStore = () => {
  const store = configureStore({
    reducer: {
      music: musicSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  return store;
};

export const wrapper = createWrapper(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
