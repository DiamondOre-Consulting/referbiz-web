import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPageCan";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Components/AuthsCan/Login";
import AssoAuthPage from "./Pages/AuthPageAsso";
import AssoLogin from "./Components/AuthsAsso/LoginAsso";
import AssoDashboard from "./Pages/AssoDashboard";
import AssoContact from "./Pages/AssoContact";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
