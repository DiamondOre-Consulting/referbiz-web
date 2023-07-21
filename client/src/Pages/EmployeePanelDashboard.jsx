import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import EmployeeNav from "../Components/EmployeeDashComponents/EmployeeNav";
import EmployeeHero from "../Components/EmployeeDashComponents/EmployeeHero";
import EmployeeBody from "../Components/EmployeeDashComponents/EmployeeBody";
import EmployeeFooter from "../Components/EmployeeDashComponents/EmployeeFooter";
import PopupCard from "../Components/Instructions/PopupCard";

const EmployeePanelDashboard = () => {
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userEmail = decodedToken ? decodedToken.EmpName : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/employee-login-confi");
      }
    }
  }, [decodedToken, navigate]);

  return (
    <>
      <EmployeeNav />
      <div className="h-full bg-gray-700 px-10 py-10">
        <EmployeeHero />
        <EmployeeBody />
      </div>
      <EmployeeFooter />
      <PopupCard />
    </>
  );
};

export default EmployeePanelDashboard;
