import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, MESSENGER_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

import { PRODUCT_LIMIT } from "../../constants/product";

function* getMessengerListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "get",
      url: `${SERVER_API_URL}/messenger`,
      params: {
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(MESSENGER_ACTION.GET_MESSENGER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log("lỗi");
    yield put({
      type: FAILURE(MESSENGER_ACTION.GET_MESSENGER_LIST),
      payload: e.message,
    });
  }
}

function* getMessengerDetailSaga(action) {
  try {
    const { id } = action.payload;
    const q = action.payload?.q;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/messenger/${id}`,
      params: {
        ...(q && { q: q }),
      },
    });
    yield put({
      type: SUCCESS(MESSENGER_ACTION.GET_MESSENGER_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(MESSENGER_ACTION.GET_MESSENGER_DETAIL),
      payload: e.message,
    });
  }
}

function* createMessengerSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/messenger`, data);
    yield put({
      type: SUCCESS(MESSENGER_ACTION.CREATE_MESSENGER),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(MESSENGER_ACTION.CREATE_MESSENGER), payload: e.message });
  }
}

function* editMessengerSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(`${SERVER_API_URL}/messenger/${id}`, data);
    yield put({
      type: SUCCESS(MESSENGER_ACTION.EDIT_MESSENGER),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(MESSENGER_ACTION.EDIT_MESSENGER), payload: e.message });
  }
}

function* deleteMessengerSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/messenger/${id}`);
    yield put({
      type: SUCCESS(MESSENGER_ACTION.DELETE_MESSENGER),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(MESSENGER_ACTION.DELETE_MESSENGER), payload: e.message });
  }
}

export default function* messengerSaga() {
  yield takeEvery(REQUEST(MESSENGER_ACTION.GET_MESSENGER_LIST), getMessengerListSaga);
  yield takeEvery(
    REQUEST(MESSENGER_ACTION.GET_MESSENGER_DETAIL),
    getMessengerDetailSaga
  );
  yield takeEvery(REQUEST(MESSENGER_ACTION.CREATE_MESSENGER), createMessengerSaga);
  yield takeEvery(REQUEST(MESSENGER_ACTION.EDIT_MESSENGER), editMessengerSaga);
  yield takeEvery(REQUEST(MESSENGER_ACTION.DELETE_MESSENGER), deleteMessengerSaga);
}
