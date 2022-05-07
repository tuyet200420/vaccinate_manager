import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, PATIENT_VACCINATION_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getPatientVaccinationListSaga(action) {
  // const departmentId = action.payload?.departmentId
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_API_URL}/patient_vaccination`,
      // params: {
      //   ...departmentId && {
      //     departmentId: departmentId,
      //   },
      // }
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

// function* createCategorySaga(action) {
//   try {
//     const { data } = action.payload;
//     const result = yield axios.post(`${SERVER_API_URL}/categories`, data);
//     yield put({
//       type: SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY),
//       payload: {
//         data: result.data
//       },
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(CATEGORY_ACTION.CREATE_CATEGORY), payload: e.message });
//   }
// }

// function* editCategorySaga(action) {
//   try {
//     const { id, data } = action.payload;
//     const result = yield axios.patch(`${SERVER_API_URL}/categories/${id}`, data);
//     yield put({
//       type: SUCCESS(CATEGORY_ACTION.EDIT_CATEGORY),
//       payload: {
//         data: result.data,
//       }
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(CATEGORY_ACTION.EDIT_CATEGORY), payload: e.message });
//   }
// }

// function* deleteStorageSaga(action) {
//   try {
//     const { id } = action.payload;
//     yield axios.delete(`${SERVER_API_URL}/storage/${id}`);
//     yield put({
//       type: SUCCESS(PATIENT_VACCINATION_ACTION.DELETE_STORAGE),
//       payload: { id }
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(PATIENT_VACCINATION_ACTION.DELETE_STORAGE), payload: e.message });
//   }
// }

export default function* patientVaccinationPlanSaga() {
  yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.GET_PATIENT_VACCINATION_LIST), getPatientVaccinationListSaga);
//   yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.CREATE_CATEGORY), createCategorySaga);
//   yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.EDIT_CATEGORY), editCategorySaga);
  // yield takeEvery(REQUEST(PATIENT_VACCINATION_ACTION.DELETE_STORAGE), deleteStorageSaga);
}