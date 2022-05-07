import { createAction } from '@reduxjs/toolkit';
import { REQUEST, PATIENT_VACCINATION_ACTION } from '../constants';

export const getPatientVaccinationListAction = createAction(REQUEST(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST));
export const createPatientVaccinationAction = createAction(REQUEST(PATIENT_VACCINATION_ACTION.CREATE_PATIENT_VACCINATION));
export const editPatientVaccinationAction = createAction(REQUEST(PATIENT_VACCINATION_ACTION.EDIT_PATIENT_VACCINATION));
export const deletePatientVaccinationAction = createAction(REQUEST(PATIENT_VACCINATION_ACTION.DELETE_PATIENT_VACCINATION));