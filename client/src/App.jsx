import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPageCan";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Components/AuthsCan/Login";
import AssoAuthPage from "./Pages/AuthPageAsso";
import AssoLogin from "./Components/AuthsAsso/LoginAsso";
import AssoDashboard from "./Pages/AssoDashboard";
import AssoContact from "./Pages/AssoContact";
// import AuthAdmin from "./Pages/AuthAdmin";
import SignupAdmin from "./Pages/AuthsAdmin/SignupAdmin";
import LoginAdmin from "./Pages/AuthsAdmin/LoginAdmin";
import AdminPanelDashbaord from "./Pages/AdminPanelDashbaord";
import AddAssociate from "./Pages/AdminPages/AddAssociate";
import AllAssociates from "./Pages/AdminPages/AllAssociates";
import AllAffiliates from "./Pages/AdminPages/AllAffiliates";

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
          <Route path="/contactus" element={<AssoContact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AssoDashboard" element={<AssoDashboard />} />
          <Route path="/auth-admin-signup-confi" element={<SignupAdmin />} />
          <Route path="/auth-admin-login" element={<LoginAdmin />} />
          <Route path="/admin-panel-confi" element={<AdminPanelDashbaord />} />
          <Route path="/add-new-associate" element={<AddAssociate />} />
          <Route path="/admin-all-associates" element={<AllAssociates />} />
          <Route path="/admin-all-affiliates" element={<AllAffiliates />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
