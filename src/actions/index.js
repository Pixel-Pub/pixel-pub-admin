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

export const receiveClan = ({clanId, clanName, founder, memberCount}) => (dispatch) =>
  dispatch({
    type: CONSTANTS.CLAN_RECEIVED,
    payload: {clanId, clanName, founder, memberCount}
  })


export const receiveClanMembers = ({members}) => (dispatch) =>
  dispatch({
    type: CONSTANTS.CLAN_MEMBERS_RECEIVED,
    payload: {members}
  })

export const receiveClanListMembers = ({clanId, members}) => (dispatch) =>
  dispatch({
    type: CONSTANTS.CLAN_LIST_MEMBERS_LOADED,
    payload: {clanId, members}
  })

export const receiveClanList = ({clans}) => (dispatch) =>
  dispatch({
    type: CONSTANTS.CLAN_LIST_LOADED,
    payload: clans
  })
