import { createAction } from '@reduxjs/toolkit';
import { REQUEST, STORAGE_ACTION } from '../constants';

export const getStorageListAction = createAction(REQUEST(STORAGE_ACTION.GET_STORAGE_LIST));
export const createStorageAction = createAction(REQUEST(STORAGE_ACTION.CREATE_STORAGE));
export const editStorageAction = createAction(REQUEST(STORAGE_ACTION.EDIT_STORAGE));
export const deleteStorageAction = createAction(REQUEST(STORAGE_ACTION.DELETE_STORAGE));
export const getStorageDetailAction = createAction(REQUEST(STORAGE_ACTION.GET_STORAGE_DETAIL));