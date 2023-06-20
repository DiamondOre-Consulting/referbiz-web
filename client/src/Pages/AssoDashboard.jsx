import React, {useEffect} from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen bg-blue-900">
      <div className="flex justify-end px-4 py-5">
        <button className="bg-gray-300 px-10 py-15 text-gray-900" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="text-4xl text-gray-200">
          Welcome, <span className="text-white">{userEmail}</span>
        </h2>
        {/* Rest of the dashboard content */}
      </div>
    </div>
  );
};

export default AssoDashboard;
