import {CLAN_LIST_LOADED} from '../constants'

const initialState = {}

const REDUCERS = {
  [CLAN_LIST_LOADED]: (state, clans) => {
    return {
      ...state, 
      ...clans
    }
  }
}

export default (state = initialState, {type, payload}) => {
  if (REDUCERS[type] !== undefined) {
    return REDUCERS[type](state, payload)
  }

  return state
}