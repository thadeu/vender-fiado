import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import * as t from '@actions/actionTypes'

import { watchFetchAll, watchSaveRelease, watchDeleteAllReleases } from '@sagas/releases'

function* rootSaga() {
  yield all([
    takeLatest(t.RELEASES_ALL.REQUESTED, watchFetchAll),
    takeLatest(t.RELEASES_NEW.REQUESTED, watchSaveRelease),
    takeLatest(t.RELEASES_DELETE.REQUESTED, watchDeleteAllReleases)
  ]);
}

export default rootSaga;