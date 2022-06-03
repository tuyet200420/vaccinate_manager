import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch } from "react-router-dom";
import history from "./utils/history";
import AdminLayout from "./layouts/admin/AdminLayout";
import VaccinePage from "./pages/admin/Vaccine";
import StoragePage from "./pages/admin/Storage";
import VaccinationPlanPage from "./pages/admin/VaccinationPlan";
import DefaultLayout from "./layouts/user/DefaultLayout";
import UserPage from "./pages/admin/User";
import AfterInjectionPage from "./pages/admin/AfterInjection";
import PatientVaccinationPage from "./pages/admin/PatientVaccination";
import RegisterVaccinationPage from "./pages/admin/RegisterVaccination";
import DashboardPage from "./pages/admin/Dashboard";
import ModifyVaccine from "./pages/admin/ModifyVaccine";

import HomePage from "./pages/User/Home/Index";
import VaccineUserPage from "./pages/User/Vaccine";
import VaccineDetailPage from "./pages/User/VaccineDetail";
import VaccinationPlanUserPage from "./pages/User/VaccinationPlan";
import RegisterVaccinePage from "./pages/User/RegisterVaccine";
import HistoryVaccinationPage from "./pages/User/HistoryVaccination";
import PersonalInformationPage from "./pages/User/PersonalInformation";

import LayoutNone from "./layouts/LayoutNone";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import "antd/dist/antd.css";
import "./App.css";
import "./assets/css/base.css";
import { loginAction, getUserDetailAction } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(getUserDetailAction({ id: userInfo }));
    }
  }, []);
  return (
    <>
      <Router history={history}>
        <Switch>
          <LayoutNone exact path="/login" component={LoginPage} />
          <LayoutNone exact path="/register" component={RegisterPage} />

          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout exact path="/vaccine" component={VaccineUserPage} />
          <DefaultLayout exact path="/personal_information" component={PersonalInformationPage} />
          <DefaultLayout
            exact
            path="/register_vaccination"
            component={RegisterVaccinePage}
          />
          <DefaultLayout
            exact
            path="/history_vaccine"
            component={HistoryVaccinationPage}
          />
          <DefaultLayout
            exact
            path="/vaccine/:id"
            component={VaccineDetailPage}
          />
          <DefaultLayout
            exact
            path="/injection_schedule"
            component={VaccinationPlanUserPage}
          />

          <AdminLayout exact path="/admin" component={DashboardPage} />
          <AdminLayout exact path="/admin/vaccines" component={VaccinePage} />
          <AdminLayout
            exact
            path="/admin/vaccines/create"
            component={ModifyVaccine}
          />
          <AdminLayout
            exact
            path="/admin/vaccines/edit/:id"
            component={ModifyVaccine}
          />
          <AdminLayout exact path="/admin/storages" component={StoragePage} />
          <AdminLayout
            exact
            path="/admin/vaccinationPlans"
            component={VaccinationPlanPage}
          />
          <AdminLayout
            exact
            path="/admin/patientVaccines"
            component={PatientVaccinationPage}
          />
          <AdminLayout
            exact
            path="/admin/afterInjections"
            component={AfterInjectionPage}
          />
          <AdminLayout
            exact
            path="/admin/registerVaccinations"
            component={RegisterVaccinationPage}
          />
          <AdminLayout exact path="/admin/users" component={UserPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
