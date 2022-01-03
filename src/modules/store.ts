import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import musicSlice from './music/slice';
import musicSaga from './music/saga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([musicSaga()]);
}

const makeStore = () => {
  const store = configureStore({
    reducer: { music: musicSlice.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
