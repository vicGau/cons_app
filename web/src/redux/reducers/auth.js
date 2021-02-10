/**
 * Reducers related to authentification handling
 */

import { LOGIN, LOGOUT } from "../actions/auth";

const initialState = {}

/* reducer responsible for auth.user management */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

/* Combine all reducers into the auth reducers */
export default authReducer;
