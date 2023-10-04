import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";
import FakeProfile from "../../assets/FakeProfile2.png";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

const AllAffiliates = () => {
  const [affiliates, setAffiliates] = useState([]);
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

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
    const fetchAffiliates = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Token not found in local storage, handle the error or redirect to the login page
          console.error("No token found");
          return;
        }

        // Fetch associates data from the backend
        const response = await axios.get(
          "https://referbiz-web.onrender.com/api/admin-rb/admin-affiliates-data",
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

    fetchAffiliates();
  }, [decodedToken, navigate]);

  const handleClick= (userId) => {
    navigate(`/admin-all-affiliates/each-affiliate/${userId}`)
  } 

  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center py-10 px-10 bg-gray-200">
        <h2 className="text-6xl font-bold mb-4 text-indigo-600">
          Your Affiliates
        </h2>
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {affiliates?.map((affiliate) => (
              <Link
                to={`/admin-all-affiliates/each-affiliate/${affiliate._id}`}
                key={affiliate._id}
                className="bg-gray-300 shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg"
              >
                <div>
                  {affiliate?.profileImage ? (
                    <img
                      className="w-10 h-10 rounded-full border-2 border-indigo-600"
                      src={`https://referbiz-web.onrender.com/` + affiliate?.profileImage}
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
                  <p className="text-sm">
                    Total Shared:{" "}
                    <span className="text-indigo-700 font-semibold">
                      {affiliate.totalShared}
                    </span>{" "}
                  </p>
                  <p className="text-sm">
                    Total Shortlisted:{" "}
                    <span className="text-indigo-700 font-semibold">
                      {affiliate.totalShortlisted}
                    </span>
                  </p>
                  <p className="text-sm">
                    Total Joined:{" "}
                    <span className="text-indigo-700 font-semibold">
                      {affiliate.totalJoined}
                    </span>
                  </p>
                </div>
              </Link>
          ))}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AllAffiliates;
