import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPageCan";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Components/AuthsCan/Login";
import AssoAuthPage from "./Pages/AuthPageAsso";
import AssoLogin from "./Components/AuthsAsso/LoginAsso";
import AssoDashboard from "./Pages/AssoDashboard";
import AssoContact from "./Pages/AssoContact";
import SignupAdmin from "./Pages/AuthsAdmin/SignupAdmin";
import LoginAdmin from "./Pages/AuthsAdmin/LoginAdmin";
import AdminPanelDashbaord from "./Pages/AdminPanelDashbaord";
import AddAssociate from "./Pages/AdminPages/AddAssociate";
import AllAssociates from "./Pages/AdminPages/AllAssociates";
import AllAffiliates from "./Pages/AdminPages/AllAffiliates";
import EachAffiliate from "./Pages/AdminPages/EachAffiliate";
import AllCVs from "./Pages/AdminPages/AllCVs";
import EachAssociate from "./Pages/AdminPages/EachAssociate";
import AuthEmployee from "./Pages/AuthEmployee";
import SignupEmployee from "./Pages/EmployeesPages/EmpSignup";
import LoginEmployee from "./Pages/EmployeesPages/EmpLogin";
import EmployeePanelDashboard from "./Pages/EmployeePanelDashboard";
import MyAssociates from "./Pages/EmployeesPages/MyAssociates";
import MyEachAssociate from "./Pages/EmployeesPages/MyEachAssociate";
import AllEmployees from "./Pages/AdminPages/AllEmployees";
import EachEmployee from "./Pages/AdminPages/EachEmployee";
import EmployeeAssoCv from "./Pages/AdminPages/EmployeeAssoCv";
import UpdateProfile from "./Components/AffDashComponents/UpdateProfile";
import UpdateProfileAsso from "./Components/AssoDashComponents/UpdateProfile";
import UpdateProfileAdmin from "./Components/AdminDashComponents/UpdateProfile";
import UpdateProfileEmployee from "./Components/EmployeeDashComponents/UpdateProfile";
import EditPopUp from "./Components/EmployeeDashComponents/EditPopUp";
import EditPopUpAffiliate from "./Components/AdminDashComponents/EditPopUpAffiliate";
import EditPopUpAssociate from "./Components/AdminDashComponents/EditPopUpAssociate";
import EditPopUpEmployee from "./Components/AdminDashComponents/EditPopUpEmployee";
import TopLists from "./Components/Instructions/TopList";
import AdminForgotPassword from "./Components/AdminDashComponents/AdminForgotPassword";
import AffiliateForgotPassword from "./Components/AuthsCan/AffiliateForgotPassword";
import VerifyOTPAndUpdate from "./Components/AuthsCan/VerifyOTPAndUpdate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/AssoAuth" element={<AssoAuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AssoLogin" element={<AssoLogin />} />
          <Route path="/affiliate-forgot-password" element={<AffiliateForgotPassword />} />
          <Route path="/affiliate-update-password" element={<VerifyOTPAndUpdate />} />
          <Route path="/contactus" element={<AssoContact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/AssoDashboard" element={<AssoDashboard />} />
          <Route path="/update-profile-asso/:id" element={<UpdateProfileAsso />} />
          <Route path="/auth-admin-signup-confi" element={<SignupAdmin />} />
          <Route path="/auth-admin-login" element={<LoginAdmin />} />
          <Route path="/admin-panel-confi" element={<AdminPanelDashbaord />} />
          <Route path="/update-profile-admin/:id" element={<UpdateProfileAdmin />} />
          <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
          <Route path="/add-new-associate" element={<AddAssociate />} />
          <Route path="/admin-all-associates" element={<AllAssociates />} />
          <Route path="/admin-all-affiliates" element={<AllAffiliates />} />
          <Route path="/admin-all-employees" element={<AllEmployees />} />
          <Route path="/admin-all-cvs" element={<AllCVs />} />
          <Route path="/admin-all-affiliates/each-affiliate/:id" element={<EachAffiliate />} />
          <Route path="/admin-all-affiliates/each-affiliate/each-cv/:id" element={<EditPopUpAffiliate />} />
          <Route path="/admin-all-associates/each-associate/:id" element={<EachAssociate />} />
          <Route path="/admin-all-associates/each-associate/update/:id" element={<EditPopUpAssociate />} />
          <Route path="/admin-all-employees/:id" element={<EachEmployee />} />
          <Route path="/admin-all-employees/update/:id" element={<EditPopUpEmployee />} />
          <Route path="/admin-all-employees/each-associate/:id" element={<EmployeeAssoCv />} />
          <Route path="/employee-signup-confi" element={<SignupEmployee />} />
          <Route path="/employee-login-confi" element={<LoginEmployee />} />
          <Route path="/employee-panel-confi" element={<EmployeePanelDashboard />} />
          <Route path="/update-profile-employee/:id" element={<UpdateProfileEmployee />} />
          <Route path="/my-associates" element={<MyAssociates />} />
          <Route path="/my-associates/:id" element={<MyEachAssociate />} />
          <Route path="/my-associates/each-cv/:id" element={<EditPopUp />} />

          {/* ------------------------------------------------------------------------------- */}

          <Route path="/top-lists" element={<TopLists />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
