const createAsyngActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`, 
    SUCCESS: `${type}_SUCCESS`, 
    ERROR: `${type}_ERROR`
  }
}

export const RELEASES_ALL = createAsyngActionType('releases_all')
export const RELEASES_NEW = createAsyngActionType('releases_new')
export const RELEASES_DELETE = createAsyngActionType('releases_delete')