/**
 * Reducers related to authentification handling
 */

import { LOGIN, LOGOUT, SET_USER } from "../actions/auth";

const initialState = {}

/* reducer responsible for auth management */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    
    case SET_USER:
      const { password, ...userInfos } = action.payload;
      return {
        ...state,
        ...userInfos,
      }
    default:
      return state;
  }
};

export default authReducer;
