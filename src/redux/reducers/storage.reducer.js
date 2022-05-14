import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, STORAGE_ACTION } from '../constants';

const initialState = {
  storageList: {
    data: [],
    load: false,
    error: null,
  },
}

const storageReducer = createReducer(initialState, {
  [REQUEST(STORAGE_ACTION.GET_STORAGE_LIST)]: (state, action) => {
    return {
      ...state,
      storageList: {
        ...state.storageList,
        load: true,
      },
    };
  },
  [SUCCESS(STORAGE_ACTION.GET_STORAGE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      storageList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(STORAGE_ACTION.GET_STORAGE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      storageList: {
        ...state.storageList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(STORAGE_ACTION.CREATE_STORAGE)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      storageList: {
        ...state.storageList,
        data: [
          data,
          ...state.storageList.data,
        ],
      },
    }
  },

  [SUCCESS(STORAGE_ACTION.EDIT_STORAGE)]: (state, action) => {
    const { data } = action.payload;
    const newStorageList = [...state.storageList.data];

    const storageIndex = newStorageList.findIndex((storage) => storage._id === data._id);
    console.log(storageIndex)
    newStorageList.splice(storageIndex, 1, data);
    return {
      ...state,
      storageList: {
        ...state.storageList,
        data: newStorageList,
      },
    };
  },

  [SUCCESS(STORAGE_ACTION.DELETE_STORAGE)]: (state, action) => {
    const { id } = action.payload;
    console.log(id);
    const newStorageList = [...state.storageList.data];
    const storageIndex = newStorageList.findIndex((storage) => storage._id === id);
    newStorageList.splice(storageIndex, 1);
    return {
      ...state,
      storageList: {
        ...state.storageList,
        data: newStorageList,
      },
    };
  },
});

export default storageReducer;