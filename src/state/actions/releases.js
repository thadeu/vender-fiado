import { RELEASES_ALL, RELEASES_NEW, RELEASES_DELETE } from '@actions/actionTypes'

export function fetchAll() {
  return {
    type: RELEASES_ALL.REQUESTED
  }
}

export function save(params) {
  return {
    type: RELEASES_NEW.REQUESTED,
    payload: params
  }
}

export function deleteAll() {
  return {
    type: RELEASES_DELETE.REQUESTED
  }
}