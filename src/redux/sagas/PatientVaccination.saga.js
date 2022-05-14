import { put, takeEvery,debounce } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, PATIENT_VACCINATION_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getPatientVaccinationListSaga(action) {
  const filter = action.payload?.filter
  const status = action.payload?.status
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_API_URL}/patient_vaccination`,
      params: {
        ...filter && {
          q: filter,
        },
        ...status && {
          status: status,
        },
      }
    })
    yield put({
      type: SUCCESS(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST), payload: e.message });
  }
}

function* createPatientVaccinationSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/patient_vaccination`, data);
    yield put({
      type: SUCCESS(PATIENT_VACCINATION_ACTION.CREATE_PATIENT_VACCINATION),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PATIENT_VACCINATION_ACTION.CREATE_PATIENT_VACCINATION), payload: e.message });
  }
}

function* editPatientVaccinationSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(`${SERVER_API_URL}/patient_vaccination/${id}`, data);
    yield put({
      type: SUCCESS(PATIENT_VACCINATION_ACTION.EDIT_PATIENT_VACCINATION),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(PATIENT_VACCINATION_ACTION.EDIT_PATIENT_VACCINATION), payload: e.message });
  }
}

function* deletePatientVaccinationSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/patient_vaccination/${id}`);
    yield put({
      type: SUCCESS(PATIENT_VACCINATION_ACTION.DELETE_PATIENT_VACCINATION),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(PATIENT_VACCINATION_ACTION.DELETE_PATIENT_VACCINATION), payload: e.message });
  }
}

export default function* patientVaccinationPlanSaga() {
  yield debounce(300,REQUEST(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST), getPatientVaccinationListSaga);
  yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.CREATE_PATIENT_VACCINATION), createPatientVaccinationSaga);
  yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.EDIT_PATIENT_VACCINATION), editPatientVaccinationSaga);
  yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.DELETE_PATIENT_VACCINATION), deletePatientVaccinationSaga);
}