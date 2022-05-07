import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, STORAGE_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getStorageListSaga(action) {
  // const departmentId = action.payload?.departmentId
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_API_URL}/storage`,
      // params: {
      //   ...departmentId && {
      //     departmentId: departmentId,
      //   },
      // }
    })
    yield put({
      type: SUCCESS(STORAGE_ACTION.GET_STORAGE_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(STORAGE_ACTION.GET_STORAGE_LIST), payload: e.message });
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

function* deleteStorageSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/storage/${id}`);
    yield put({
      type: SUCCESS(STORAGE_ACTION.DELETE_STORAGE),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(STORAGE_ACTION.DELETE_STORAGE), payload: e.message });
  }
}

export default function* storageSaga() {
  yield takeEvery(REQUEST(STORAGE_ACTION.GET_STORAGE_LIST), getStorageListSaga);
//   yield takeEvery(REQUEST(STORAGE_ACTION.CREATE_CATEGORY), createCategorySaga);
//   yield takeEvery(REQUEST(STORAGE_ACTION.EDIT_CATEGORY), editCategorySaga);
  yield takeEvery(REQUEST(STORAGE_ACTION.DELETE_STORAGE), deleteStorageSaga);
}