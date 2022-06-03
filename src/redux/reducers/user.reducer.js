import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';

const initialState = {
  userList: {
    data: [],
    page: 1,
    load: false,
    error: null,
  },
  userDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    return {
      ...state,
      userList: {
        ...state.userList,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { data} = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          data,
          page: 1,
          load: false,
          error: null,
        },
      }
    
  },
  [FAILURE(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: false,
        error,
      },
    }
  },
  [REQUEST(USER_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        data:{},
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(USER_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(USER_ACTION.CREATE_USER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        data: [
          data,
          ...state.userList.data,
        ],
      },
    }
  },

  

  [SUCCESS(USER_ACTION.EDIT_USER)]: (state, action) => {
    const { data } = action.payload;
    const newUserList = [...state.userList.data];
    const userIndex = newUserList.findIndex((user) => user._id === data._id);
    newUserList.splice(userIndex, 1, data);
    return {
      ...state,
      userList: {
        ...state.userList,
        data: newUserList,
      },
    };
  },

  [SUCCESS(USER_ACTION.DELETE_USER)]: (state, action) => {
    const { id } = action.payload;
    const newUserList = [...state.userList.data];
    const userIndex = newUserList.findIndex((user) => user._id === id);
    newUserList.splice(userIndex, 1);
    return {
      ...state,
      userList: {
        ...state.userList,
        data: newUserList,
      },
    };
  },
});

export default userReducer;