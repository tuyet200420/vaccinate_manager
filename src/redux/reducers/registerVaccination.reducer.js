import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, REGISTER_VACCINATION_ACTION } from '../constants';

const initialState = {
  registerVaccinationList: {
    data: [],
    page: 1,
    load: false,
    error: null,
  },
  registerVaccinationDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const registerVaccinationReducer = createReducer(initialState, {
  [REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST)]: (state, action) => {
    return {
      ...state,
      registerVaccinationList: {
        ...state.registerVaccinationList,
        load: true,
      },
    };
  },
  [SUCCESS(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST)]: (state, action) => {
    const { data} = action.payload;
      return {
        ...state,
        registerVaccinationList: {
          ...state.registerVaccinationList,
          data,
          page: 1,
          load: false,
          error: null,
        },
      }
    
  },
  [FAILURE(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      registerVaccinationList: {
        ...state.registerVaccinationList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL)]: (state, action) => {
    return {
      ...state,
      registerVaccinationDetail: {
        ...state.registerVaccinationDetail,
        load: true,
      },
    };
  },
  [SUCCESS(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      registerVaccinationDetail: {
        ...state.registerVaccinationDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      registerVaccinationDetail: {
        ...state.registerVaccinationDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(REGISTER_VACCINATION_ACTION.CREATE_REGISTER_VACCINATION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      registerVaccinationList: {
        ...state.registerVaccinationList,
        data: [
          data,
          ...state.registerVaccinationList.data,
        ],
      },
    }
  },

  [SUCCESS(REGISTER_VACCINATION_ACTION.EDIT_REGISTER_VACCINATION)]: (state, action) => {
    const { data } = action.payload;
    const newRegisterVaccinationList = [...state.registerVaccinationList.data];
    const userIndex = newRegisterVaccinationList.findIndex((user) => user._id === data._id);
    newRegisterVaccinationList.splice(userIndex, 1, data);
    return {
      ...state,
      registerVaccinationList: {
        ...state.registerVaccinationList,
        data: newRegisterVaccinationList,
      },
    };
  },

  [SUCCESS(REGISTER_VACCINATION_ACTION.DELETE_REGISTER_VACCINATION)]: (state, action) => {
    const { id } = action.payload;
    const newRegisterVaccinationList = [...state.registerVaccinationList.data];
    const userIndex = newRegisterVaccinationList.findIndex((user) => user._id === id);
    newRegisterVaccinationList.splice(userIndex, 1);
    return {
      ...state,
      registerVaccinationList: {
        ...state.registerVaccinationList,
        data: newRegisterVaccinationList,
      },
    };
  },
});

export default registerVaccinationReducer;