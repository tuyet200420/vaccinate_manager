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
//       type: SUCCESS(VACCINATION_PLAN_ACTION.DELETE_STORAGE),
//       payload: { id }
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(VACCINATION_PLAN_ACTION.DELETE_STORAGE), payload: e.message });
//   }
// }

export default function* vaccinationPlanSaga() {
  yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.GET_VACCINATION_PLAN_LIST), getVaccinationPlanListSaga);
//   yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.CREATE_CATEGORY), createCategorySaga);
//   yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.EDIT_CATEGORY), editCategorySaga);
  // yield takeEvery(REQUEST(VACCINATION_PLAN_ACTION.DELETE_STORAGE), deleteStorageSaga);
}