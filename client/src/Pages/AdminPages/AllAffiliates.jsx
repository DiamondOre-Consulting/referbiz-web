import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";
import FakeProfile from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/FakeProfile2.png";

const AllAffiliates = () => {
  const [affiliates, setAffiliates] = useState([]);

//   const token = localStorage.getItem("token");
//   if (!token) {
//     navigate("/LoginAdmin"); // Redirect to login page if not authenticated
//     return;
//   }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth-admin-login"); // Redirect to login page if not authenticated
      return;
    }
    const fetchAssociates = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Token not found in local storage, handle the error or redirect to the login page
          console.error("No token found");
          return;
        }

        // Fetch associates data from the backend
        const response = await axios.get(
          "http://localhost:8080/api/admin-rb/admin-affiliates-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        console.log(response.data);
        setAffiliates(data);
      } catch (error) {
        console.error("Error fetching associates:", error);
        // Handle error and show appropriate message
      }
    };

    fetchAssociates();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center py-10 px-10 bg-gray-200">
        <h2 className="text-6xl font-bold mb-4 text-indigo-600">
          Your Affiliates
        </h2>
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {affiliates?.map((affiliate) => (
            <div
              key={affiliate._id}
              className="bg-gray-300 shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg"
            >
              <div>
              {affiliate?.profileImage ? (
                    <img
                      className="w-10 h-10 rounded-full border-2 border-indigo-600"
                      src={`http://localhost:8080/` + affiliate?.profileImage}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="w-10 h-10 bg-gray-100 rounded-full border-2 border-indigo-600"
                      src={FakeProfile}
                      alt="avatar"
                    />
                  )}
                <div>
                  <h3 className="text-lg font-semibold">{affiliate.name}</h3>
                  <p className="text-sm text-gray-600">{affiliate.email}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2 items-center mt-4">
                <p className="text-sm">Total Shared: <span className="text-indigo-700 font-semibold">{affiliate.totalShared}</span> </p>
                <p className="text-sm">
                  Total Shortlisted: <span className="text-indigo-700 font-semibold">{affiliate.totalShortlisted}</span>
                </p>
                <p className="text-sm">Total Joined: <span className="text-indigo-700 font-semibold">{affiliate.totalJoined}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AllAffiliates;
