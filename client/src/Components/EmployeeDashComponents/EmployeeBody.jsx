import React, { useEffect, useState } from "react";
import CvSharing from "../CvShareForm/CvSharingAff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeBody = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (e.g., check token existence in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/employee-login-confi"); // Redirect to login page if not authenticated
      return;
    }

    // Make API request to fetch user data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "api.referbiz.in/api/employee-rb/user-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response;
        setUserData(data);
        console.log(data);
        console.log(userData?.totalShortlisted);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error and show appropriate message or redirect to login page
      }
    };

    // Call the fetchData function to fetch user data
    fetchData();
  }, [navigate]);

  return (
    <section>
      <div className="w-max-auto flex flex-col items-center mt-10">
        <h2 className="text-6xl font-semibold text-gray-100 px-10 py-10">
          Your Numbers
        </h2>
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2  lg:gap-8">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {userData?.totalShared}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Referrals
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {userData?.totalAppeared}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Appeared
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

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {userData?.totalOffered}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Offered
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {userData?.totalJoined}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Joined
                </div>
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
        {/* <h2 className="text-6xl font-semibold text-gray-100 px-10 py-10">
          Refer More, Earn More
        </h2>
        <div>
          <CvSharing />
        </div> */}
      </div>
    </section>
  );
};

export default EmployeeBody;
