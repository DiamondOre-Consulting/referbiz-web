import React, {useEffect} from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import AssoNav from "../AssoDashComponents/AssoNav";
import AssoHero from "../AssoDashComponents/AssoHero";
import AssoBody from "../AssoDashComponents/AssoBody";
import AssoFooter from "../AssoDashComponents/AssoFooter";
import PopupCard from "../Components/Instructions/PopupCard";

const AssoDashboard = () => {
  const navigate = useNavigate();

  const { decodedToken } = useJwt(localStorage.getItem('token'));

  const userEmail = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token found, redirect to login page
      navigate('/AssoLogin');
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem('token');
        navigate('/AssoLogin');
      }
    }
  }, [decodedToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/AssoLogin';
    console.log("Logging out")
  }

  return (
    <>
      <AssoNav />
      <div className="h-full bg-gray-700 px-10 py-10">
        <AssoHero />
        <AssoBody />
      </div>
      <AssoFooter />
      <PopupCard />
    </>
  );
};

export default AssoDashboard;
