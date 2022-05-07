// import { put, takeEvery } from "redux-saga/effects";
// import axios from 'axios';
// import { REQUEST, SUCCESS, FAILURE, DEPARTMENT_ACTION } from '../constants';
// import { SERVER_API_URL } from './apiUrl';

// function* getDepartmentListSaga(action) {
//   try {
//     const result = yield axios.get(`${SERVER_API_URL}/departments?_embed=categories`);
//     yield put({
//       type: SUCCESS(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST),
//       payload: {
//         data: result.data
//       },
//     });
//   } catch (e) {
//     yield put({ type: FAILURE(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST), payload: e.message });
//   }
// }

// export default function* departmentSaga() {
//   yield takeEvery(REQUEST(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST), getDepartmentListSaga);
// }