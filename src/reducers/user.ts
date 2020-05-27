import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";
import { SERVER_API_URL } from "../config/constants";

export const ACTION_TYPES = {
    GET_USER: "GET_USER",
    RESET_ROLE_MAP: "RESET_ROLE_MAP",
    GET_ROLE_MAP: "GET_ROLE_MAP",
    ADD_ROLE_MAP: "ADD_ROLE_MAP",
    SAVE_ROLE_MAP: "SAVE_ROLE_MAP",
    REMOVE_ROLE_MAP: "REMOVE_ROLE_MAP"
};

const initialState = {
  loading: false,
  dataTable: {} as any,
  mapRoles: [] as any,
  errorMes: {} as any,
  userInfo : {} as any
};

// export type AuthenticationState = Readonly<typeof initialState>;
export type UserState = Readonly<typeof initialState>;

// Reducer

export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_USER):
    case REQUEST(ACTION_TYPES.GET_ROLE_MAP):
    case REQUEST(ACTION_TYPES.SAVE_ROLE_MAP):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_USER):
    case FAILURE(ACTION_TYPES.GET_ROLE_MAP):
    case FAILURE(ACTION_TYPES.SAVE_ROLE_MAP):
      return {
        ...state,
        loading: false,
        errorMes: action.payload
      };
    case SUCCESS(ACTION_TYPES.GET_USER):
      console.log(action.payload, 'action.payload')
      return {
        ...state,
        loading: false,
        userInfo : action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_ROLE_MAP):
      console.log(action.payload, 'action.payload')
      return {
        ...state,
        loading: false,
        mapRoles: action.payload.data
      };
    case ACTION_TYPES.ADD_ROLE_MAP:
      var wanted = state.mapRoles.filter(function(item){
        return (item.objectCode == action.payload.objectCode);
      });
      if (wanted.length === 0) {
        state.mapRoles.splice(0, 0, action.payload);
      }
      return {
        ...state,
        loading: false,
        mapRoles: state.mapRoles
      };
    case ACTION_TYPES.REMOVE_ROLE_MAP:
      state.mapRoles.splice(action.payload, 1);
      return {
        ...state,
        loading: false,
        mapRoles: state.mapRoles
      };
    case ACTION_TYPES.RESET_ROLE_MAP:
      return {
        ...state,
        loading: false,
        mapRoles: []
      };
    default:
      return state;
  }
};

// get data
export const getUser = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_USER,
    payload: axios.get(
      SERVER_API_URL + "/users/getInfoUser",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// reset role map
export const resetRoleMap = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.RESET_ROLE_MAP
  });
};

// get role map
export const getRoleMap = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_ROLE_MAP,
    payload: axios.post(
      SERVER_API_URL + "user/getListRoleByUserId",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// add role map
export const addRoleMap = params => dispatch => {
  dispatch({
    type: ACTION_TYPES.ADD_ROLE_MAP,
    payload: params
  });
};

// save role map
export const saveRoleMap = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.SAVE_ROLE_MAP,
    payload: axios.post(
      SERVER_API_URL + "user/roleMapping",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// remove role map
export const removeRoleMap = index => dispatch => {
  dispatch({
    type: ACTION_TYPES.REMOVE_ROLE_MAP,
    payload: index
  });
};