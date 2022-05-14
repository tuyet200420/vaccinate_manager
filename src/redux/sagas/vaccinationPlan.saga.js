import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, VACCINATION_PLAN_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getVaccinationPlanListSaga(action) {
  // const departmentId = action.payload?.departmentId
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_API_URL}/vaccination_plan`,
      // params: {
      //   ...departmentId && {
      //     departmentId: departmentId,
      //   },
      // }
    })
    yield put({
      type: SUCCESS(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST), payload: e.message });
  }
}

function* createVaccinationPlanSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/vaccination_plan`, data);
    yield put({
      type: SUCCESS(VACCINATION_PLAN_ACTION.CREATE_VACCINATION_PLAN),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINATION_PLAN_ACTION.CREATE_VACCINATION_PLAN), payload: e.message });
  }
}

function* editVaccinationPlanSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(`${SERVER_API_URL}/vaccination_plan/${id}`, data);
    yield put({
      type: SUCCESS(VACCINATION_PLAN_ACTION.EDIT_VACCINATION_PLAN),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINATION_PLAN_ACTION.EDIT_VACCINATION_PLAN), payload: e.message });
  }
}

function* deleteVaccinationPlanSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/vaccination_plan/${id}`);
    yield put({
      type: SUCCESS(VACCINATION_PLAN_ACTION.DELETE_VACCINATION_PLAN),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(VACCINATION_PLAN_ACTION.DELETE_VACCINATION_PLAN), payload: e.message });
  }
}

export default function* vaccinationPlanSaga() {
  yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST), getVaccinationPlanListSaga);
  yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.CREATE_VACCINATION_PLAN), createVaccinationPlanSaga);
  yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.EDIT_VACCINATION_PLAN), editVaccinationPlanSaga);
  yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.DELETE_VACCINATION_PLAN), deleteVaccinationPlanSaga);
}