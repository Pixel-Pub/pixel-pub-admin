import {getCookie} from '../utils/cookie'
import {AUTH_RECEIVED} from '../constants'

const cookie = getCookie()

const initialState = {
  accessToken  : cookie.access_token,
  membershipId : cookie.membership_id,
  refreshToken : cookie.refresh_token
}

const REDUCERS = {
  [AUTH_RECEIVED]: (state, payload) => {
    return {
      ...state, 
      accessToken: payload.accessToken,
      membershipId: payload.membershipId,
      refreshToken: payload.refershToken
    }
  }
}

export default (state = initialState, {type, payload}) => {
  if (REDUCERS[type] !== undefined) {
    return REDUCERS[type](state, payload)
  }

  return state
}