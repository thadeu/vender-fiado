import { put, call } from 'redux-saga/effects'
import * as t from '@actions/actionTypes'

export function* watchFetchAll() {
  try {    
    yield put({ type: t.RELEASES_ALL.SUCCESS })

  } catch (error) {
    yield put({ type: t.RELEASES_ALL.ERROR })
  }
}

export function* watchSaveRelease(action) {
  try {    
    yield put({ type: t.RELEASES_NEW.SUCCESS, payload: action.payload })

  } catch (error) {
    yield put({ type: t.RELEASES_NEW.ERROR })
  }
}

export function* watchDeleteAllReleases() {
  try {
    yield put({ type: t.RELEASES_DELETE.SUCCESS })

  } catch( error ) {
    yield put({ type: t.RELEASES_DELETE.ERROR })

  }
}