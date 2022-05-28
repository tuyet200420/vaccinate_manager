import { createAction } from '@reduxjs/toolkit';
import { REQUEST, REGISTER_VACCINATION_ACTION } from '../constants';

export const getRegisterVaccinationListAction = createAction(REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST));
export const getRegisterVaccinationDetailAction = createAction(REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL));
export const createRegisterVaccinationAction = createAction(REQUEST(REGISTER_VACCINATION_ACTION.CREATE_REGISTER_VACCINATION));
export const editRegisterVaccinationAction = createAction(REQUEST(REGISTER_VACCINATION_ACTION.EDIT_REGISTER_VACCINATION));
export const deleteRegisterVaccinationAction = createAction(REQUEST(REGISTER_VACCINATION_ACTION.DELETE_REGISTER_VACCINATION));