import * as actionType from "../actiontypes/ActionTypes";

const INITIAL_STATE = {
  users: [],
  loading: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.LOAD_USER_START:
    case actionType.CREATE_USER_START:
    case actionType.DELETE_USER_START:
    case actionType.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case actionType.CREATE_USER_SUCCESS:
    case actionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionType.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case actionType.LOAD_USER_ERROR:
    case actionType.CREATE_USER_ERROR:
    case actionType.DELETE_USER_ERROR:
    case actionType.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionType.SIGNIN_USER:
      return {
        ...state,
        uid: action.payload,
      };
    case actionType.SIGNOUT_USER:
      return {
        ...state,
        uid: action.payload
      };
    default:
      return state;
  }
};
