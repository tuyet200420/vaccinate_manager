import { put, takeEvery,debounce } from "redux-saga/effects";
import axios from "axios";
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  REGISTER_VACCINATION_ACTION,
} from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getRegisterVaccinationListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "get",
      url: `${SERVER_API_URL}/register_vaccination`,
      params: {
        // // _sort: "id",
        // // _order: "desc",
        // _embed: "productOptions",
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log("lỗi");
    yield put({
      type: FAILURE(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST),
      payload: e.message,
    });
  }
}

function* getRegisterVaccinationDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/register_vaccination/${id}`,
    });
    yield put({
      type: SUCCESS(
        REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL
      ),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(
        REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL
      ),
      payload: e.message,
    });
  }
}

function* createRegisterVaccinationSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(
      `${SERVER_API_URL}/register_vaccination`,
      data
    );
    yield put({
      type: SUCCESS(REGISTER_VACCINATION_ACTION.CREATE_REGISTER_VACCINATION),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(REGISTER_VACCINATION_ACTION.CREATE_REGISTER_VACCINATION),
      payload: e.message,
    });
  }
}

function* editRegisterVaccinationSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(
      `${SERVER_API_URL}/register_vaccination/${id}`,data
    );
    yield put({
      type: SUCCESS(REGISTER_VACCINATION_ACTION.EDIT_REGISTER_VACCINATION),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(REGISTER_VACCINATION_ACTION.EDIT_REGISTER_VACCINATION),
      payload: e.message,
    });
  }
}

function* deleteRegisterVaccinationSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/register_vaccination/${id}`);
    yield put({
      type: SUCCESS(REGISTER_VACCINATION_ACTION.DELETE_REGISTER_VACCINATION),
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: FAILURE(REGISTER_VACCINATION_ACTION.DELETE_REGISTER_VACCINATION),
      payload: e.message,
    });
  }
}

export default function* registerVaccinationSaga() {
  yield debounce(300,
    REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_LIST),
    getRegisterVaccinationListSaga
  );
  yield takeEvery(
    REQUEST(REGISTER_VACCINATION_ACTION.GET_REGISTER_VACCINATION_DETAIL),
    getRegisterVaccinationDetailSaga
  );
  yield takeEvery(
    REQUEST(REGISTER_VACCINATION_ACTION.CREATE_REGISTER_VACCINATION),
    createRegisterVaccinationSaga
  );
  yield takeEvery(
    REQUEST(REGISTER_VACCINATION_ACTION.EDIT_REGISTER_VACCINATION),
    editRegisterVaccinationSaga
  );
  yield takeEvery(
    REQUEST(REGISTER_VACCINATION_ACTION.DELETE_REGISTER_VACCINATION),
    deleteRegisterVaccinationSaga
  );
}
