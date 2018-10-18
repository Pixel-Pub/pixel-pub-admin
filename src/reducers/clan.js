import {CLAN_RECEIVED, CLAN_MEMBERS_RECEIVED} from '../constants'

const initialState = {
  clanId:   '',
  clanName: '',
  members:  [],
  memberCount: 0,
  founder:  {}
}

const REDUCERS = {
  [CLAN_RECEIVED]: (state, {clanId, clanName, founder, memberCount}) => {
    return {
      ...state, 
      clanId,
      clanName,
      founder,
      memberCount
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