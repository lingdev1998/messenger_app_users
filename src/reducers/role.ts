import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";
import { SERVER_API_URL } from "../config/constants";

export const ACTION_TYPES = {
  GET_ROLE: "GET_ROLE",
  RESET_OBJECT_MAP: "RESET_OBJECT_MAP",
  GET_OBJECT_MAP: "GET_OBJECT_MAP",
  ADD_OBJECT_MAP: "ADD_OBJECT_MAP",
  SAVE_OBJECT_MAP: "SAVE_OBJECT_MAP",
  REMOVE_OBJECT_MAP: "REMOVE_OBJECT_MAP"
};

const initialState = {
  loading: false,
  dataTable: {} as any,
  mapObjects: [] as any,
  errorMes: {} as any
};

// export type AuthenticationState = Readonly<typeof initialState>;
export type RoleState = Readonly<typeof initialState>;

// Reducer

export default (state: RoleState = initialState, action): RoleState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ROLE):
    case REQUEST(ACTION_TYPES.GET_OBJECT_MAP):
    case REQUEST(ACTION_TYPES.SAVE_OBJECT_MAP):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ROLE):
    case FAILURE(ACTION_TYPES.GET_OBJECT_MAP):
    case FAILURE(ACTION_TYPES.SAVE_OBJECT_MAP):
      return {
        ...state,
        loading: false,
        errorMes: action.payload
      };
    case SUCCESS(ACTION_TYPES.GET_ROLE):
      console.log(action.payload, 'action.payload')
      return {
        ...state,
        loading: false,
        dataTable: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_OBJECT_MAP):
      console.log(action.payload, 'action.payload')
      return {
        ...state,
        loading: false,
        mapObjects: action.payload.data
      };
    case ACTION_TYPES.ADD_OBJECT_MAP:
      var wanted = state.mapObjects.filter(function(item){
        return (item.objectCode == action.payload.objectCode);
      });
      if (wanted.length === 0) {
        state.mapObjects.splice(0, 0, action.payload);
      }
      return {
        ...state,
        loading: false,
        mapObjects: state.mapObjects
      };
    case ACTION_TYPES.REMOVE_OBJECT_MAP:
      state.mapObjects.splice(action.payload, 1);
      return {
        ...state,
        loading: false,
        mapObjects: state.mapObjects
      };
    case ACTION_TYPES.RESET_OBJECT_MAP:
      return {
        ...state,
        loading: false,
        mapObjects: []
      };
    default:
      return state;
  }
};

// get data
export const getRole = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_ROLE,
    payload: axios.post(
      SERVER_API_URL + "role/doSearch",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// reset object map
export const resetObjectMap = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.RESET_OBJECT_MAP
  });
};

// get object map
export const getObjectMap = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_OBJECT_MAP,
    payload: axios.post(
      SERVER_API_URL + "role/getListObjectByRoleId",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// add object map
export const addObjectMap = params => dispatch => {
  dispatch({
    type: ACTION_TYPES.ADD_OBJECT_MAP,
    payload: params
  });
};

// save object map
export const saveObjectMap = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.SAVE_OBJECT_MAP,
    payload: axios.post(
      SERVER_API_URL + "role/roleMapping",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

// remove object map
export const removeObjectMap = index => dispatch => {
  dispatch({
    type: ACTION_TYPES.REMOVE_OBJECT_MAP,
    payload: index
  });
};