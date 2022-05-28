import { fork } from 'redux-saga/effects';

import vaccineSaga from './vaccine.saga';
import patientVaccinationPlanSaga from './patientVaccination.saga';
import vaccinationPlanSaga from './vaccinationPlan.saga';
import storageSaga from './storage.saga';
import userSaga from './user.saga';
import registerVaccinationSaga from './register_vaccination.saga';

export default function* rootSaga() {
  yield fork(vaccineSaga);
  yield fork(patientVaccinationPlanSaga);
  yield fork(vaccinationPlanSaga);
  yield fork(storageSaga);
  yield fork(userSaga);
  yield fork(registerVaccinationSaga);
}