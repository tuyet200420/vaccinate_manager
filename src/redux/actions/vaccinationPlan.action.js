import { createAction } from '@reduxjs/toolkit';
import { REQUEST, VACCINATION_PLAN_ACTION } from '../constants';

export const getVaccinationPlanListAction = createAction(REQUEST(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST));
export const createVaccinationPlanAction = createAction(REQUEST(VACCINATION_PLAN_ACTION.CREATE_VACCINATION_PLAN));
export const editVaccinationPlanAction = createAction(REQUEST(VACCINATION_PLAN_ACTION.EDIT_VACCINATION_PLAN));
export const deleteVaccinationPlanAction = createAction(REQUEST(VACCINATION_PLAN_ACTION.DELETE_VACCINATION_PLAN));