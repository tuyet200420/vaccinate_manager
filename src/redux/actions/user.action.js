import { createAction } from '@reduxjs/toolkit';
import { REQUEST, USER_ACTION } from '../constants';

export const getUserListAction = createAction(REQUEST(USER_ACTION.GET_USER_LIST));
export const getUserDetailAction = createAction(REQUEST(USER_ACTION.GET_USER_DETAIL));
export const createUserAction = createAction(REQUEST(USER_ACTION.CREATE_USER));
export const editUserAction = createAction(REQUEST(USER_ACTION.EDIT_USER));
export const deleteUserAction = createAction(REQUEST(USER_ACTION.DELETE_USER));