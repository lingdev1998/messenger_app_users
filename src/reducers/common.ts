  import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";
import { SERVER_API_URL } from "../config/constants";

export const ACTION_TYPES = {

  GET_LIST_LOCATION_FOR_AUTO_COMPLETE: "GET_LIST_LOCATION_FOR_AUTO_COMPLETE",
  GET_LIST_PRODUCT_FOR_AUTO_COMPLETE: "GET_LIST_PRODCUT_FOR_AUTO_COMPLETE",
  GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE: "GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE",
  GET_LIST_COMPANY_FOR_AUTO_COMPLETE: "GET_LIST_COMPANY_FOR_AUTO_COMPLETE",
  GET_LIST_USER_FOR_AUTO_COMPLETE: "GET_USER_FOR_AUTO_COMPLETE",

  GET_LIST_LOCATION: "GET_LIST_LOCATION",
  GET_LIST_PRODUCT_CATEGORY: "GET_LIST_PRODUCT_CATEGORY",
  GET_LIST_PRODUCT_TYPE: "GET_LIST_PRODUCT_TYPE",
  GET_LIST_CRM_PHASE_BY_PHASE_TYPE: "GEt_CRM_PHASE_BY_PHASE_TYPE",
  GET_ALL_PRODUCT_TYPE: "GET_ALL_PRODUCT_TYPE",



};

const initialState = {
  loading: false,
  listLocationForAutoComplete: [] as any,
  listProductForAutoComplete: [] as any,
  listProductTypeForAutoComplete: [] as any,
  listCompanyForAutoComplete: [] as any,
  listUserForAutoComplete: [] as any,
  listLocation: [] as any,
  listProductCategory: [] as any,
  listProductType: [] as any,
  listCrmPhaseByPhaseType: [] as any,
  errorMes: {} as any
};

// export type AuthenticationState = Readonly<typeof initialState>;
export type CommonState = Readonly<typeof initialState>;

// Reducer

export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_LIST_LOCATION_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_PRODUCT_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_COMPANY_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_USER_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_LOCATION):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_PRODUCT_CATEGORY):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_PRODUCT_TYPE):
      return {
        ...state,
        loading: true
      };
    case REQUEST(ACTION_TYPES.GET_LIST_CRM_PHASE_BY_PHASE_TYPE):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_LIST_LOCATION_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_PRODUCT_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_COMPANY_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_USER_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_LOCATION):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_PRODUCT_CATEGORY):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_PRODUCT_TYPE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };
    case FAILURE(ACTION_TYPES.GET_LIST_CRM_PHASE_BY_PHASE_TYPE):
      return {
        ...state,
        loading: true,
        errorMes: action.payload
      };


    //success
    case SUCCESS(ACTION_TYPES.GET_LIST_LOCATION_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        listLocationForAutoComplete:action.payload.data

      };
    case SUCCESS(ACTION_TYPES.GET_LIST_PRODUCT_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        listProductForAutoComplete : action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        listProductTypeForAutoComplete:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_COMPANY_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        listCompanyForAutoComplete:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_USER_FOR_AUTO_COMPLETE):
      return {
        ...state,
        loading: true,
        listUserForAutoComplete:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_LOCATION):
      return {
        ...state,
        loading: true,
        listLocation:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_PRODUCT_CATEGORY):
      return {
        ...state,
        loading: true,
        listProductCategory:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_PRODUCT_TYPE):
      return {
        ...state,
        loading: true,
        listProductType:action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_LIST_CRM_PHASE_BY_PHASE_TYPE):
      return {
        ...state,
        loading: true,
        listCrmPhaseByPhaseType:action.payload.data
      };

    default:
      return state;
  }
};

// get dataLocation
export const getListCrmPhaseByPhaseType = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_CRM_PHASE_BY_PHASE_TYPE,
    payload: axios.get(
      SERVER_API_URL + "common/getCrmPhaseByPhaseType?"+
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};
export const getListProductType = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_PRODUCT_TYPE,
    payload: axios.get(
      SERVER_API_URL + "common/getListProductType",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};
export const getListProductCategory = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_PRODUCT_CATEGORY,
    payload: axios.get(
      SERVER_API_URL + "common/getListProductCategory",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

export const getListLocation = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_LOCATION,
    payload: axios.get(
      SERVER_API_URL + "common/getListLocation",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

export const getListUserForAutoComplete = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_USER_FOR_AUTO_COMPLETE,
    payload: axios.post(
      SERVER_API_URL + "common/getProductTypeForAutocomplete",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};
export const getListProductTypeForAutoComplete = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_PRODUCT_TYPE_FOR_AUTO_COMPLETE,
    payload: axios.post(
      SERVER_API_URL + "common/getProductTypeForAutocomplete",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};
export const getListProductForAutoComplete = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_PRODUCT_FOR_AUTO_COMPLETE,
    payload: axios.post(
      SERVER_API_URL + "common/getProductForAutocomplete",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};

export const getListLocationForAutoComplete = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_LOCATION_FOR_AUTO_COMPLETE,
    payload: axios.post(
      SERVER_API_URL + "common/getLocationForAutocomplete",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};


export const getListCompanyForAutoComplete = params => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.GET_LIST_COMPANY_FOR_AUTO_COMPLETE,
    payload: axios.post(
      SERVER_API_URL + "common/getCompanyForAutocomplete",
      params
    ),
    meta: {
      successMessage: "Login success"
    }
  });
};


