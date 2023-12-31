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
import EditPopUpAssociateCV from "./Components/EmployeeDashComponents/EditPopUpAssociateCV";
import EditPopUpAffiliate from "./Components/AdminDashComponents/EditPopUpAffiliate";
import EditPopUpAssociate from "./Components/AdminDashComponents/EditPopUpAssociate";
import EditPopUpEmployee from "./Components/AdminDashComponents/EditPopUpEmployee";
import AddEmployee from "./Pages/AdminPages/AddEmployee";
import AdminForgotPassword from "./Components/AdminDashComponents/AdminForgotPassword";
import AffiliateForgotPassword from "./Components/AuthsCan/AffiliateForgotPassword";
import VerifyOTPAndUpdate from "./Components/AuthsCan/VerifyOTPAndUpdate";
import HomeMain from "./Pages/HomePage/HomeMain";
import AboutUs from "./Pages/HomePage/AboutUs";
import Services from "./Pages/HomePage/Services";
import ContactUs from "./Pages/HomePage/ContactUs";
import CvInfoPage from "./Pages/AdminPages/CvInfoPage";
import CvInfoPageAsso from "./Pages/AdminPages/CvInfoPageAsso";
import ResumeBuilding from "./Pages/HomePage/ResumeBuilding";
import FAQ from "./Pages/FAQ";
import Error from "./Pages/Error";
import TermsAndConditions from "./Pages/TermsConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy"
import MyAffiliates from "./Pages/EmployeesPages/MyAffiliates";
import MyEachAffiliate from "./Pages/EmployeesPages/MyEachAffiliate";
import EditPopUpAffiliateCV from "./Components/EmployeeDashComponents/EditPopUpAffiliateCV";
import EmployeeAffiCv from "./Pages/AdminPages/EmployeeAffiCv";
import CvInfoAssociate from "./Components/AdminDashComponents/CvInfoAssociate";
import CvInfoAffiliate from "./Components/AdminDashComponents/CvInfoAffiliate";
import CvInfoPageMyAsso from "./Pages/EmployeesPages/CvInfoPageMyAsso";
import CvInfoPageMyAffil from "./Pages/EmployeesPages/CvInfoPageMyAffil";


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/">
            <Route index element={<HomeMain />} />
            <Route path="/home-main" element={<Home />} />
            <Route path="/resume-building" element={<ResumeBuilding />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contactmain" element={<ContactUs />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/AssoAuth" element={<AssoAuthPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AssoLogin" element={<AssoLogin />} />
            <Route
              path="/affiliate-forgot-password"
              element={<AffiliateForgotPassword />}
            />
            <Route
              path="/affiliate-update-password"
              element={<VerifyOTPAndUpdate />}
            />
            <Route path="/FAQ" element={<FAQ/>}/>
            <Route path="/contactus" element={<AssoContact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path="/AssoDashboard" element={<AssoDashboard />} />
            <Route
              path="/update-profile-asso/:id"
              element={<UpdateProfileAsso />}
            />
            <Route path="/auth-admin-signup-confi" element={<SignupAdmin />} />
            <Route path="/auth-admin-login" element={<LoginAdmin />} />
            <Route
              path="/admin-panel-confi"
              element={<AdminPanelDashbaord />}
            />
            <Route
              path="/update-profile-admin/:id"
              element={<UpdateProfileAdmin />}
            />
            <Route
              path="/admin-forgot-password"
              element={<AdminForgotPassword />}
            />
            <Route path="/add-new-associate" element={<AddAssociate />} />
            <Route path="/admin-all-associates" element={<AllAssociates />} />
            <Route path="/admin-all-affiliates" element={<AllAffiliates />} />
            <Route path="/admin-all-employees" element={<AllEmployees />} />
            <Route path="/admin-all-cvs" element={<AllCVs />} />
            <Route
              path="/admin-all-affiliates/each-affiliate/:id"
              element={<EachAffiliate />}
            />
            <Route
              path="/admin-all-affiliates/each-affiliate/each-cv/:id"
              element={<EditPopUpAffiliate />}
            />
            <Route
              path="/admin-all-affiliates/each-affiliate/cv-details/:id"
              element={<CvInfoPage />}
            />
            <Route
              path="/admin-all-associates/each-associate/cv-details/:id"
              element={<CvInfoPageAsso />}
            />
            <Route
              path="/admin-all-associates/each-associate/:id"
              element={<EachAssociate />}
            />
            <Route
              path="/admin-all-associates/each-associate/update/:id"
              element={<EditPopUpAssociate />}
            />
            <Route path="/admin-all-employees/:id" element={<EachEmployee />} />
            <Route
              path="/admin-all-employees/update/:id"
              element={<EditPopUpEmployee />}
            />
            <Route
              path="/admin-all-employees/each-associate/:id"
              element={<EmployeeAssoCv />}
            />
            <Route
              path="/admin-all-employees/each-affiliate/:id"
              element={<EmployeeAffiCv />}
            />
            <Route path="/employee-signup-confi" element={<SignupEmployee />} />
            <Route path="/employee-login-confi" element={<LoginEmployee />} />
            <Route
              path="/employee-panel-confi"
              element={<EmployeePanelDashboard />}
            />
            <Route
              path="/update-profile-employee/:id"
              element={<UpdateProfileEmployee />}
            />
            <Route path="/my-associates" element={<MyAssociates />} />
            <Route path="/my-associates/:id" element={<MyEachAssociate />} />
            <Route path="/my-associates/each-cv/:id" element={<EditPopUpAssociateCV />} />
            <Route path="/my-associates/each-cv/cv-details/:id" element={<CvInfoPageMyAsso />} />

            <Route path="/my-affiliates" element={<MyAffiliates />} />
            <Route path="/my-affiliates/:id" element={<MyEachAffiliate />} />
            <Route path="/my-affiliates/each-cv/:id" element={<EditPopUpAffiliateCV />} />
            <Route path="/my-affiliates/each-cv/cv-details/:id" element={<CvInfoPageMyAffil />} />

            {/* ------------------------------------------------------------------------------- */}

            <Route path="/add-new-employee" element={<SignupEmployee/>} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
