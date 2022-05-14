// import logo from './logo.svg';
import { Router, Switch } from "react-router-dom";
import history from "./utils/history";
import AdminLayout from "./layouts/admin/AdminLayout";
import VaccinePage from "./pages/admin/Vaccine";
import StoragePage from "./pages/admin/Storage";
import VaccinationPlanPage from "./pages/admin/VaccinationPlan";
// import DefaultLayout from './layouts/user/DefaultLayout';
import AfterInjectionPage from "./pages/admin/AfterInjection";
import PatientVaccinationPage from "./pages/admin/PatientVaccination";
import DashboardPage from './pages/admin/Dashboard';
import ModifyVaccine from "./pages/admin/ModifyVaccine";

import 'antd/dist/antd.css'
import './App.css';
import './assets/css/base.css'

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
        
          <AdminLayout exact path="/admin" component={DashboardPage} />
          <AdminLayout exact path="/admin/vaccines" component={VaccinePage} />
          <AdminLayout exact path="/admin/vaccines/create" component={ModifyVaccine} />
          <AdminLayout exact path="/admin/vaccines/edit/:id" component={ModifyVaccine} />
          <AdminLayout exact path="/admin/storages" component={StoragePage} />
          <AdminLayout exact path="/admin/vaccinationPlans" component={VaccinationPlanPage} />
          <AdminLayout exact path="/admin/patientVaccines" component={PatientVaccinationPage} />
          <AdminLayout exact path="/admin/afterInjections" component={AfterInjectionPage} />
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
