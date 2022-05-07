import { createAction } from '@reduxjs/toolkit';
import { REQUEST, VACCINE_ACTION } from '../constants';

export const getVaccineListAction = createAction(REQUEST(VACCINE_ACTION.GET_VACCINE_LIST));
export const uploadAction = createAction(REQUEST(VACCINE_ACTION.UPLOAD));
export const getVaccineDetailAction = createAction(REQUEST(VACCINE_ACTION.GET_VACCINE_DETAIL));
export const createVaccineAction = createAction(REQUEST(VACCINE_ACTION.CREATE_VACCINE));
export const editVaccineAction = createAction(REQUEST(VACCINE_ACTION.EDIT_VACCINE));
export const deleteVaccineAction = createAction(REQUEST(VACCINE_ACTION.DELETE_VACCINE));