import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import history from "../../utils/history";
import { notification } from "antd";
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from "../constants";
import { SERVER_API_URL } from "./apiUrl";

function* getUserListSaga(action) {
  try {
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: "get",
      url: `${SERVER_API_URL}/user`,
      params: {
        // // _sort: "id",
        // // _order: "desc",
        // _embed: "productOptions",
        ...(searchKey && { q: searchKey }),
      },
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log("lỗi");
    yield put({
      type: FAILURE(USER_ACTION.GET_USER_LIST),
      payload: e.message,
    });
  }
}

function* getUserDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `${SERVER_API_URL}/user/${id}`,
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.GET_USER_DETAIL),
      payload: e.message,
    });
  }
}
function* loginSaga(action) {
  try {
    const { data, prevPath } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/user/login`, data);

    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    if (result.data) {
      yield localStorage.setItem("userInfo", result.data._id);
      yield notification.success({
        message: "Đăng nhập thành công!",
      });
      if (result.data.role === "Admin") {
        yield history.push("/admin");
      } else {
        if (prevPath) {
          yield history.push(prevPath);
        } else {
          yield history.push("/");
        }
      }
    } else {
      yield notification.error({
        message: "Đăng nhập không thành công!",
      });
    }
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.CREATE_USER), payload: e.message });
  }
}

function* createUserSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/user`, data);
    yield put({
      type: SUCCESS(USER_ACTION.CREATE_USER),
      payload: {
        data: result.data,
      },
    });
    if (result.data) {
      yield localStorage.setItem("userInfo", result.data._id);
      yield notification.success({
        message: "Đăng ký thành công!",
      });

      yield history.push("/login");
    }
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.CREATE_USER), payload: e.message });
  }
}

function* editUserSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.put(`${SERVER_API_URL}/user/${id}`, data);
    yield put({
      type: SUCCESS(USER_ACTION.EDIT_USER),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.EDIT_USER), payload: e.message });
  }
}

function* deleteUserSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/user/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.DELETE_USER),
      payload: { id },
    });
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.DELETE_USER), payload: e.message });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_LIST), getUserListSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_DETAIL), getUserDetailSaga);
  yield takeEvery(REQUEST(USER_ACTION.CREATE_USER), createUserSaga);
  yield takeEvery(REQUEST(USER_ACTION.EDIT_USER), editUserSaga);
  yield takeEvery(REQUEST(USER_ACTION.DELETE_USER), deleteUserSaga);
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
}
