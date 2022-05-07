import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAILURE, VACCINE_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

import { PRODUCT_LIMIT } from "../../constants/product";

function* getVaccineListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "get",
      url: `${SERVER_API_URL}/vaccine`,
      params: {
        // // _sort: "id",
        // // _order: "desc",
        // _embed: "productOptions",
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(VACCINE_ACTION.GET_VACCINE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log("lỗi");
    yield put({
      type: FAILURE(VACCINE_ACTION.GET_VACCINE_LIST),
      payload: e.message,
    });
  }
}

function* getVaccineDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/vaccine/${id}`,
    });
    yield put({
      type: SUCCESS(VACCINE_ACTION.GET_VACCINE_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(VACCINE_ACTION.GET_VACCINE_DETAIL),
      payload: e.message,
    });
  }
}

function* createVaccineSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/vaccine`, data);
    yield put({
      type: SUCCESS(VACCINE_ACTION.CREATE_VACCINE),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINE_ACTION.CREATE_VACCINE), payload: e.message });
  }
}

function* editVaccineSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(`${SERVER_API_URL}/vaccine/${id}`, data);
    yield put({
      type: SUCCESS(VACCINE_ACTION.EDIT_VACCINE),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINE_ACTION.EDIT_VACCINE), payload: e.message });
  }
}

function* deleteVaccineSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/vaccine/${id}`);
    yield put({
      type: SUCCESS(VACCINE_ACTION.DELETE_VACCINE),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINE_ACTION.DELETE_VACCINE), payload: e.message });
  }
}

export default function* vaccineSaga() {
  yield takeEvery(REQUEST(VACCINE_ACTION.GET_VACCINE_LIST), getVaccineListSaga);
  yield takeEvery(
    REQUEST(VACCINE_ACTION.GET_VACCINE_DETAIL),
    getVaccineDetailSaga
  );
  yield takeEvery(REQUEST(VACCINE_ACTION.CREATE_VACCINE), createVaccineSaga);
  yield takeEvery(REQUEST(VACCINE_ACTION.EDIT_VACCINE), editVaccineSaga);
  yield takeEvery(REQUEST(VACCINE_ACTION.DELETE_VACCINE), deleteVaccineSaga);
}
