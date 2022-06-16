import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, MESSENGER_ACTION } from '../constants';

const initialState = {
  messengerList: {
    data: [],
    page: 1,
    load: false,
    error: null,
  },
  messengerDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const messengerReducer = createReducer(initialState, {
  [REQUEST(MESSENGER_ACTION.GET_MESSENGER_LIST)]: (state, action) => {
    return {
      ...state,
      messengerList: {
        ...state.messengerList,
        load: true,
      },
    };
  },
  [SUCCESS(MESSENGER_ACTION.GET_MESSENGER_LIST)]: (state, action) => {
    const { data} = action.payload;
      return {
        ...state,
        messengerList: {
          ...state.messengerList,
          data,
          page: 1,
          load: false,
          error: null,
        },
      }
    
  },
  [FAILURE(MESSENGER_ACTION.GET_MESSENGER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      messengerList: {
        ...state.messengerList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(MESSENGER_ACTION.GET_MESSENGER_DETAIL)]: (state, action) => {
    return {
      ...state,
      messengerDetail: {
        ...state.messengerDetail,
        load: true,
      },
    };
  },
  [SUCCESS(MESSENGER_ACTION.GET_MESSENGER_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      messengerDetail: {
        ...state.messengerDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(MESSENGER_ACTION.GET_MESSENGER_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      messengerDetail: {
        ...state.messengerDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(MESSENGER_ACTION.CREATE_MESSENGER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      messengerList: {
        ...state.messengerList,
        data: [
          data,
          ...state.messengerList.data,
        ],
      },
      messengerDetail: {
        ...state.messengerDetail,
        data:data
      },
    }
  },

  [SUCCESS(MESSENGER_ACTION.EDIT_MESSENGER)]: (state, action) => {
    const { data } = action.payload;
    const newMessengerList = [...state.messengerList.data];
    const messengerIndex = newMessengerList.findIndex((messenger) => messenger._id === data._id);
    newMessengerList.splice(messengerIndex, 1);
    return {
      ...state,
      messengerList: {
        ...state.messengerList,
        data: [data,...newMessengerList],
      },
      messengerDetail: {
        ...state.messengerDetail,
        data:data
      },
    };
  },

  [SUCCESS(MESSENGER_ACTION.DELETE_MESSENGER)]: (state, action) => {
    const { id } = action.payload;
    const newMessengerList = [...state.messengerList.data];
    const messengerIndex = newMessengerList.findIndex((messenger) => messenger._id === id);
    newMessengerList.splice(messengerIndex, 1);
    return {
      ...state,
      messengerList: {
        ...state.messengerList,
        data: newMessengerList,
      },
    };
  },
});

export default messengerReducer;