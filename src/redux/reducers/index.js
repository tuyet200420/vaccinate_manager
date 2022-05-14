import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import vaccinationPlanReducer from './vaccinationPlan.reducer';
import storageReducer from './storage.reducer';
import vaccineReducer from './vaccine.reducer';
import patientVaccinationReducer from './patientVaccination.reducer';
import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    storageReducer:storageReducer,
    vaccineReducer:vaccineReducer,
    vaccinationPlanReducer:vaccinationPlanReducer,
    patientVaccinationReducer:patientVaccinationReducer
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;