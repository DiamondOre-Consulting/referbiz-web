import React, {useState, useEffect} from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Wave from "../../assets/wave.png";

const AssoHero = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    // Check if the user is authenticated (e.g., check token existence in localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    // Make API request to fetch user data
    const fetchData = async () => {
        try {
          const response = await axios.get('https://referbiz-web.onrender.com/api/associates/user-data', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const { data } = response;
          setUserData(data);
          console.log(data);
          console.log(userData?.totalAmount)
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error and show appropriate message or redirect to login page
        }
      };
      
      // Call the fetchData function to fetch user data
      fetchData();
  }, [navigate]);
  return (
    <section>
      <div className="w-full md:flex items-center justify-between">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-100 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 md:py-10">
          Welcome, {userName}
          <img
            className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 inline-block ml-4"
            src={Wave}
            alt="waving"
          />
        </h2>
      </div>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {userData?.totalShared}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Total Referrals
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              {userData?.totalShortlisted}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Total Shortlisted
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
              {userData?.totalJoined}
              </div>
              <div className="text-sm font-semibold sm:text-base">Total Joined</div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                &#8377; {userData?.totalAmount}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Your Total Amount
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssoHero;
