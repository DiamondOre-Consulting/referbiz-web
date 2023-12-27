import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";
import FakeProfile from "../../assets/FakeProfile2.png";
import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";

const AllAssociates = () => {
  const [associates, setAssociates] = useState([]);
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
          "https://api.referbiz.in/api/admin-rb/admin-associates-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        console.log(response.data);
        setAssociates(data);
      } catch (error) {
        console.error("Error fetching associates:", error);
        // Handle error and show appropriate message
      }
    };

    fetchAssociates();
  }, [decodedToken,navigate]);

  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center py-10 px-10 bg-gray-200">
        <h2 className="text-6xl font-bold mb-4 text-indigo-600">
          Your Associates
        </h2>
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {associates?.map((associate) => (
            <Link
              to={`/admin-all-associates/each-associate/${associate._id}`}
              key={associate._id}
              className="bg-gray-300 shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg"
            >
              <div>
                {associate?.profileImage ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-indigo-600"
                    src={`https://api.referbiz.in/` + associate?.profileImage}
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
                  <h3 className="text-lg font-semibold">{associate.name}</h3>
                  <p className="text-sm text-gray-600">{associate.email}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2 items-center mt-4">
                <p className="text-sm">
                  Total Shared:{" "}
                  <span className="text-indigo-700 font-semibold">
                    {associate.totalShared}
                  </span>{" "}
                </p>
                <p className="text-sm">
                  Total Shortlisted:{" "}
                  <span className="text-indigo-700 font-semibold">
                    {associate.totalShortlisted}
                  </span>
                </p>
                <p className="text-sm">
                  Total Joined:{" "}
                  <span className="text-indigo-700 font-semibold">
                    {associate.totalJoined}
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

export default AllAssociates;
