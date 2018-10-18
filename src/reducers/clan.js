import {CLAN_RECEIVED, CLAN_MEMBERS_RECEIVED} from '../constants'

const initialState = {
  clanId:   '',
  clanName: '',
  members:  [],
  founder:  {}
}

const REDUCERS = {
  [CLAN_RECEIVED]: (state, {clanId, clanName, founder}) => {
    return {
      ...state, 
      clanId,
      clanName,
      founder
    }
  },
  [CLAN_MEMBERS_RECEIVED]: (state, {members}) => {
    return {
      ...state,
      members
    }
  }
}

export default (state = initialState, {type, payload}) => {
  if (REDUCERS[type] !== undefined) {
    return REDUCERS[type](state, payload)
  }

  return state
}