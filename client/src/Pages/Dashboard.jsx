import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import PopupCard from "../Components/Instructions/PopupCard";
import AffNav from "../Components/AffDashComponents/AffNav";
import AffHero from "../Components/AffDashComponents/AffHero";
import AffBody from "../Components/AffDashComponents/AffBody";
import AffFooter from "../Components/AffDashComponents/AffFooter";

const Dashboard = () => {
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userEmail = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/login");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [decodedToken, navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");;
  //   window.location.href = "/login";
  //   console.log("Logging out");
  // };

  return (
    <>
      <AffNav />
      <div className="h-full bg-gray-700 px-10 py-10">
        <AffHero />
        <AffBody />
      </div>
      <AffFooter />
      <PopupCard/>
    </>
  );
};

export default Dashboard;
