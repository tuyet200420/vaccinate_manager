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

//   [SUCCESS(VACCINATION_PLAN_ACTION.CREATE_CATEGORY)]: (state, action) => {
//     const { data } = action.payload;
//     return {
//       ...state,
//       categoryList: {
//         ...state.categoryList,
//         data: [
//           data,
//           ...state.categoryList.data,
//         ],
//       },
//     }
//   },

//   [SUCCESS(VACCINATION_PLAN_ACTION.EDIT_CATEGORY)]: (state, action) => {
//     const { data } = action.payload;
//     const newCategoryList = [...state.categoryList.data];
//     const categoryIndex = newCategoryList.findIndex((category) => category.id === data.id);
//     newCategoryList.splice(categoryIndex, 1, data);
//     return {
//       ...state,
//       categoryList: {
//         ...state.categoryList,
//         data: newCategoryList,
//       },
//     };
//   },

//   [SUCCESS(VACCINATION_PLAN_ACTION.DELETE_vaccinationPlan)]: (state, action) => {
//     const { id } = action.payload;
//     console.log(id);
//     const newvaccinationPlanList = [...state.vaccinationPlanList.data];
//     const vaccinationPlanIndex = newStorageList.findIndex((storage) => storage._id === id);
//     newStorageList.splice(storageIndex, 1);
//     return {
//       ...state,
//       storageList: {
//         ...state.storageList,
//         data: newStorageList,
//       },
//     };
//   },
});

export default vaccinationPlanReducer;