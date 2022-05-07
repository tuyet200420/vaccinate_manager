import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, VACCINE_ACTION } from '../constants';

const initialState = {
  vaccineList: {
    data: [],
    page: 1,
    load: false,
    error: null,
  },
  vaccineDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const vaccineReducer = createReducer(initialState, {
  [REQUEST(VACCINE_ACTION.GET_VACCINE_LIST)]: (state, action) => {
    return {
      ...state,
      vaccineList: {
        ...state.vaccineList,
        load: true,
      },
    };
  },
  [SUCCESS(VACCINE_ACTION.GET_VACCINE_LIST)]: (state, action) => {
    const { data} = action.payload;
      return {
        ...state,
        vaccineList: {
          ...state.vaccineList,
          data,
          page: 1,
          load: false,
          error: null,
        },
      }
    
  },
  [FAILURE(VACCINE_ACTION.GET_VACCINE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      vaccineList: {
        ...state.vaccineList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(VACCINE_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      vaccineDetail: {
        ...state.vaccineDetail,
        load: true,
      },
    };
  },
  [SUCCESS(VACCINE_ACTION.GET_VACCINE_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      vaccineDetail: {
        ...state.vaccineDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(VACCINE_ACTION.GET_VACCINE_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      vaccineDetail: {
        ...state.vaccineDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(VACCINE_ACTION.CREATE_VACCINE)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      vaccineList: {
        ...state.vaccineList,
        data: [
          data,
          ...state.vaccineList.data,
        ],
      },
    }
  },

  [SUCCESS(VACCINE_ACTION.EDIT_VACCINE)]: (state, action) => {
    const { data } = action.payload;
    const newVaccineList = [...state.vaccineList.data];
    const productIndex = newVaccineList.findIndex((product) => product.id === data.id);
    newVaccineList.splice(productIndex, 1, data);
    return {
      ...state,
      vaccineList: {
        ...state.vaccineList,
        data: newVaccineList,
      },
    };
  },

  [SUCCESS(VACCINE_ACTION.DELETE_VACCINE)]: (state, action) => {
    const { id } = action.payload;
    const newVaccineList = [...state.vaccineList.data];
    const vaccineIndex = newVaccineList.findIndex((vaccine) => vaccine._id === id);
    newVaccineList.splice(vaccineIndex, 1);
    return {
      ...state,
      vaccineList: {
        ...state.vaccineList,
        data: newVaccineList,
      },
    };
  },
});

export default vaccineReducer;