import { takeLatest, put } from 'redux-saga/effects';

import musicSlice from './slice';
import { musics } from 'components/navbar/hooks/useFetchAudio';

function* setPlayListSaga() {
  try {
    yield put(musicSlice.actions.setPlayListSuccess(musics));
  } catch (error) {
    yield put(musicSlice.actions.setPlayListFailure);
  }
}

export default function* musicSaga() {
  yield takeLatest(musicSlice.actions.setPlayListPending, setPlayListSaga);
}
