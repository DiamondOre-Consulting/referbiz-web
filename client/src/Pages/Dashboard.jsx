import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupCard from "../Components/Instructions/PopupCard";
import AffNav from "../Components/AffDashComponents/AffNav";
import AffHero from "../Components/AffDashComponents/AffHero";
import AffBody from "../Components/AffDashComponents/AffBody";
import AffFooter from "../Components/AffDashComponents/AffFooter";

const Dashboard = () => {
  const [popUp, setPopUp] = useState(0);
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
      
      const fetchUserData = async () => {
        try {
          // Make a GET request to retrieve the user data
          const response = await axios.get('https://api.referbiz.in/api/candidates/user-data', 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }); // Replace '/api/user' with the appropriate endpoint
          if(response.status === 200){

            setPopUp(response.data.count);
            console.log(response.data)

          }
          // Set the user data in state
         
          
        } catch (error) {
          console.error(error);
          if(error.response){
            const status = error.response.status;
            if(status === 500){
              alert("server error");
            }
          }
        }
      };
  
      fetchUserData();
    }
  }, [decodedToken, navigate]);

  console.log(popUp)

  return (
    <>
      <AffNav />
      <div className="h-full bg-gray-700 px-10 py-10">
        <AffHero />
        <AffBody />
      </div>
      <AffFooter />
      {(popUp === 1) ? <PopupCard/> : " " }
    </>
  );
};

export default Dashboard;
