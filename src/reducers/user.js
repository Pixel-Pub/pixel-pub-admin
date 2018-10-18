import {USER_RECEIVED} from '../constants'

const initialState = {
  name: '',
  id:   '',
  type: ''
}

const REDUCERS = {
  [USER_RECEIVED]: (state, {name, id, type}) => {
    return {
      ...state, 
      name,
      id,
      type
    }
  }
}

export default (state = initialState, {type, payload}) => {
  if (REDUCERS[type] !== undefined) {
    return REDUCERS[type](state, payload)
  }

  return state
}