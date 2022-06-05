import { createAction } from '@reduxjs/toolkit';
import { REQUEST,MESSENGER_ACTION  } from '../constants';

export const getMessengerListAction = createAction(REQUEST(MESSENGER_ACTION.GET_MESSENGER_LIST));
export const getMessengerDetailAction = createAction(REQUEST(MESSENGER_ACTION.GET_MESSENGER_DETAIL));
export const createMessengerAction = createAction(REQUEST(MESSENGER_ACTION.CREATE_MESSENGER));
export const editMessengerAction = createAction(REQUEST(MESSENGER_ACTION.EDIT_MESSENGER));
export const deleteMessengerAction = createAction(REQUEST(MESSENGER_ACTION.DELETE_MESSENGER));