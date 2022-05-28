import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, STORAGE_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getStorageListSaga(action) {
  // const departmentId = action.payload?.departmentId
  try {
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/storage`,
    });
    yield put({
      type: SUCCESS(STORAGE_ACTION.GET_STORAGE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(STORAGE_ACTION.GET_STORAGE_LIST),
      payload: e.message,
    });
  }
}

function* getStorageDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/storage/${id}`,
    });
    yield put({
      type: SUCCESS(STORAGE_ACTION.GET_STORAGE_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(STORAGE_ACTION.GET_STORAGE_DETAIL),
      payload: e.message,
    });
  }
}

function* createStorageSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/storage`, data);
    yield put({
      type: SUCCESS(STORAGE_ACTION.CREATE_STORAGE),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(STORAGE_ACTION.CREATE_STORAGE),
      payload: e.message,
    });
  }
}

function* editStorageSaga(action) {
  const status = action.payload?.status;
  if (status)
    try {
      const { id, data } = action.payload;
      const result = yield axios.patch(`${SERVER_API_URL}/storage/${id}`, data);
      yield put({
        type: SUCCESS(STORAGE_ACTION.EDIT_STORAGE),
        payload: {
          data: result.data,
        },
      });
    } catch (e) {
      yield put({
        type: FAILURE(STORAGE_ACTION.EDIT_STORAGE),
        payload: e.message,
      });
    }
  else
    try {
      const { id, data } = action.payload;
      const result = yield axios.put(`${SERVER_API_URL}/storage/${id}`, data);
      yield put({
        type: SUCCESS(STORAGE_ACTION.EDIT_STORAGE),
        payload: {
          data: result.data,
        },
      });
    } catch (e) {
      yield put({
        type: FAILURE(STORAGE_ACTION.EDIT_STORAGE),
        payload: e.message,
      });
    }
}

function* deleteStorageSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/storage/${id}`);
    yield put({
      type: SUCCESS(STORAGE_ACTION.DELETE_STORAGE),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(STORAGE_ACTION.DELETE_STORAGE),
      payload: e.message,
    });
  }
}

export default function* storageSaga() {
  yield takeEvery(REQUEST(STORAGE_ACTION.GET_STORAGE_LIST), getStorageListSaga);
  yield takeEvery(REQUEST(STORAGE_ACTION.CREATE_STORAGE), createStorageSaga);
  yield takeEvery(REQUEST(STORAGE_ACTION.EDIT_STORAGE), editStorageSaga);
  yield takeEvery(REQUEST(STORAGE_ACTION.DELETE_STORAGE), deleteStorageSaga);
  yield takeEvery(REQUEST(STORAGE_ACTION.GET_STORAGE_DETAIL), getStorageDetailSaga);
}
