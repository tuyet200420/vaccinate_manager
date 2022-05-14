import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, VACCINATION_PLAN_ACTION } from '../constants';

const initialState = {
  vaccinationPlanList: {
    data: [],
    load: false,
    error: null,
  },
}

const vaccinationPlanReducer = createReducer(initialState, {
  [REQUEST(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST)]: (state, action) => {
    return {
      ...state,
      vaccinationPlanList: {
        ...state.vaccinationPlanList,
        load: true,
      },
    };
  },
  [SUCCESS(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      vaccinationPlanList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      vaccinationPlanList: {
        ...state.vaccinationPlanList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(VACCINATION_PLAN_ACTION.CREATE_VACCINATION_PLAN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      vaccinationPlanList: {
        ...state.vaccinationPlanList,
        data: [
          data,
          ...state.vaccinationPlanList.data,
        ],
      },
    }
  },

  [SUCCESS(VACCINATION_PLAN_ACTION.EDIT_VACCINATION_PLAN)]: (state, action) => {
    const { data } = action.payload;
    const newVaccinationPlanList = [...state.vaccinationPlanList.data];
    const vaccinationPlanIndex = newVaccinationPlanList.findIndex((vaccinationPlan) => vaccinationPlan._id === data._id);
    newVaccinationPlanList.splice(vaccinationPlanIndex, 1, data);
    return {
      ...state,
      vaccinationPlanList: {
        ...state.vaccinationPlanList,
        data: newVaccinationPlanList,
      },
    };
  },

  [SUCCESS(VACCINATION_PLAN_ACTION.DELETE_VACCINATION_PLAN)]: (state, action) => {
    const { id } = action.payload;
    console.log(id);
    const newVaccinationPlanList = [...state.vaccinationPlanList.data];
    const vaccinationPlanIndex = newVaccinationPlanList.findIndex((vaccinationPlan) => vaccinationPlan._id === id);
    newVaccinationPlanList.splice(vaccinationPlanIndex, 1);
    return {
      ...state,
      vaccinationPlanList: {
        ...state.vaccinationPlanList,
        data: newVaccinationPlanList,
      },
    };
  },
});

export default vaccinationPlanReducer;