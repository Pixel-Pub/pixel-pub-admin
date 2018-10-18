import * as CONSTANTS from '../constants'

export const receiveAuthData = (data) => (dispatch) => {
  dispatch({
    type: CONSTANTS.AUTH_RECEIVED,
    payload: data
  })

  return Promise.resolve(data)
}

export const receiveUserData = (data) => (dispatch) => {
  dispatch({
    type: CONSTANTS.USER_RECEIVED,
    payload: data
  })

  return Promise.resolve(data)
}

export const receiveClan = ({clanId, clanName, founder}) => (dispatch) => {
  dispatch({
    type: CONSTANTS.CLAN_RECEIVED,
    payload: {clanId, clanName, founder}
  })
}

export const receiveClanMembers = ({members}) => (dispatch) => {
  dispatch({
    type: CONSTANTS.CLAN_RECEIVED,
    payload: {members}
  })
}