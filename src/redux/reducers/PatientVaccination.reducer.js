import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, PATIENT_VACCINATION_ACTION } from '../constants';

const initialState = {
  patientVaccinationList: {
    data: [],
    load: false,
    error: null,
  },
}

const PatientVaccinationReducer = createReducer(initialState, {
  [REQUEST(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST)]: (state, action) => {
    return {
      ...state,
      patientVaccinationList: {
        ...state.patientVaccinationList,
        load: true,
      },
    };
  },
  [SUCCESS(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      patientVaccinationList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      patientVaccinationList: {
        ...state.patientVaccinationList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(PATIENT_VACCINATION_ACTION.CREATE_PATIENT_VACCINATION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      patientVaccinationList: {
        ...state.patientVaccinationList,
        data: [
          data,
          ...state.patientVaccinationList.data,
        ],
      },
    }
  },

  [SUCCESS(PATIENT_VACCINATION_ACTION.EDIT_PATIENT_VACCINATION)]: (state, action) => {
    const { data } = action.payload;
    const newPatientVaccinationList = [...state.patientVaccinationList.data];
    const patientVaccinationIndex = newPatientVaccinationList.findIndex((patientVaccination) => patientVaccination._id === data._id);
    newPatientVaccinationList.splice(patientVaccinationIndex, 1, data);
    return {
      ...state,
      patientVaccinationList: {
        ...state.patientVaccinationList,
        data: newPatientVaccinationList,
      },
    };
  },

  [SUCCESS(PATIENT_VACCINATION_ACTION.DELETE_PATIENT_VACCINATION)]: (state, action) => {
    const { id } = action.payload;
    const newPatientVaccinationList = [...state.patientVaccinationList.data];
    const patientVaccinationIndex = newPatientVaccinationList.findIndex((patientVaccination) => patientVaccination._id === id);
    newPatientVaccinationList.splice(patientVaccinationIndex, 1);
    return {
      ...state,
      patientVaccinationList: {
        ...state.patientVaccinationList,
        data: newPatientVaccinationList,
      },
    };
  },
});

export default PatientVaccinationReducer;