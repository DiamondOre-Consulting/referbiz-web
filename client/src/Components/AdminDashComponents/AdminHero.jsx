import React, {useState, useEffect} from "react";
import { useJwt } from "react-jwt";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Wave from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/wave.png";
import Forward from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/fast-forward.png";

const AdminHero = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.name : "No Name Found";

  // useEffect(() => {
  //   // Check if the user is authenticated (e.g., check token existence in localStorage)
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/auth-admin-login'); // Redirect to login page if not authenticated
  //     return;
  //   }

  //   // Make API request to fetch user data
  //   const fetchData = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:8080/api/candidates/user-data', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
      
  //         const { data } = response;
  //         setUserData(data);
  //         console.log(data);
  //         console.log(userData?.totalAmount)
  //       } catch (error) {
  //         console.error('Error fetching user data:', error);
  //         // Handle error and show appropriate message or redirect to login page
  //       }
  //     };
      
  //     // Call the fetchData function to fetch user data
  //     fetchData();
  // }, [navigate]);
  return (
    <section>
      <div className="w-max-auto flex items-center">
        <h2 className="text-6xl font-semibold text-gray-100 px-10 py-10">
          Welcome, {userName}
        </h2>
        <img className="w-[4rem] h-[4rem]" src={Wave} alt="waving" />
      </div>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
            <Link to={'/admin-all-associates'} className="flex items-center justify-center cursor-pointer rounded-lg gap-3 bg-gray-100 p-4 lg:p-8 hover:bg-gray-300 hover:gap-5">
              {/* <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {userData?.totalShared}
              </div> */}
              <div className="text-sm font-semibold sm:text-base">
                Check Associates Activities
              </div>
              <img className="w-4 h-4" src={Forward} alt="click to go" />
            </Link>

            <Link to={'/admin-all-affiliates'} className="flex items-center justify-center cursor-pointer rounded-lg gap-3 bg-gray-100 p-4 lg:p-8 hover:bg-gray-300 hover:gap-5">
              {/* <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              {userData?.totalShortlisted}
              </div> */}
              <div className="text-sm font-semibold sm:text-base">
                Check Affiliates Activities
              </div>
              <img className="w-4 h-4" src={Forward} alt="click to go" />
            </Link>

            <div className="flex items-center justify-center cursor-pointer rounded-lg gap-3 bg-gray-100 p-4 lg:p-8 hover:bg-gray-300 hover:gap-5">
              {/* <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              {userData?.totalJoined}
              </div> */}
              <div className="text-sm font-semibold sm:text-base">Check Employees Activities</div>
              <img className="w-4 h-4" src={Forward} alt="click to go" />
            </div>

            {/* <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                &#8377; {userData?.totalAmount}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Your Total Amount
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>  
  );
};

export default AdminHero;