import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import AdminNav from "../Components/AdminDashComponents/AdminNav";
import AdminHero from "../Components/AdminDashComponents/AdminHero";
import AdminBody from "../Components/AdminDashComponents/AdminBody";
import AdminFooter from "../Components/AdminDashComponents/AdminFooter";
import PopupCard from "../Components/Instructions/PopupCard";

const AdminPanelDashboard = () => {
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.name : "No Name Found";
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/auth-admin-login");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/auth-admin-login");
      }
    }
  }, [decodedToken, navigate]);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem("hasShownPopup");
    if (!hasShownPopup) {
      setShowPopup(true); // Popup hasn't been shown before, show it
      localStorage.setItem("hasShownPopup", "true");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth-admin-login";
    console.log("Logging out");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <AdminNav />
      <div className="h-full bg-gray-700 px-10 py-10">
        <AdminHero />
        <AdminBody />
      </div>
      <AdminFooter />
      {showPopup && <PopupCard onClose={closePopup} />}
    </>
  );
};

export default AdminPanelDashboard;
