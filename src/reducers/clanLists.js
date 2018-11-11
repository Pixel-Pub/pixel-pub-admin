import {CLAN_LIST_MEMBERS_LOADED} from '../constants'

const initialState = {}

const REDUCERS = {
  [CLAN_LIST_MEMBERS_LOADED]: (state, {clanId, members}) => {
    return {
      ...state, 
      [clanId]: members
    }
  }
}

export default (state = initialState, {type, payload}) => {
  if (REDUCERS[type] !== undefined) {
    return REDUCERS[type](state, payload)
  }

  return state
}