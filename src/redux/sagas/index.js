import { fork } from 'redux-saga/effects';

import vaccineSaga from './vaccine.saga';
// import departmentSaga from './department.saga';
import patientVaccinationPlanSaga from './PatientVaccination.saga';
import vaccinationPlanSaga from './vaccinationPlan.saga';
import storageSaga from './storage.saga';

export default function* rootSaga() {
  yield fork(vaccineSaga);
  yield fork(patientVaccinationPlanSaga);
  yield fork(vaccinationPlanSaga);
  yield fork(storageSaga);
}