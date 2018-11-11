import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import clan from './clan'
import clanLists from './clanLists'

export default combineReducers({
  auth,
  user,
  clan,
  clanLists
})
