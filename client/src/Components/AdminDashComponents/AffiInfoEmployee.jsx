import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import FakeProfile from "../../assets/FakeProfile2.png";
import { Link } from "react-router-dom";

const AffilInfoEmployee = ({ candDetails }) => {
  console.log(candDetails);
  const [candidate, setCandidate] = useState({});
  const [shortlisting, setShortlisting] = useState("");
  const [joining, setJoining] = useState("");
  const [candidatesData, setCandidatesData] = useState([]);

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

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Token not found in local storage, handle the error or redirect to the login page
          console.error("No token found");
          navigate("/auth-admin-login");
          return;
        }

        const response = await axios.get(
          `https://api.referbiz.in/api/admin-rb/admin-affiliates-data/${candDetails}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidate(response.data); // Assuming the response data contains the card details
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, [candDetails]);

  return (
    <div>
      <div className="bg-gray-300 shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg my-7">
        {candidate ? (
          <Link
            key={candidate?._id}
            to={`/admin-all-employees/each-affiliate/${candidate?._id}`}
            className="flex justify-between gap-1 items-center mt-4 px-5"
          >
            {candidate?.profileImage ? (
              <img
                className="w-20 h-20 rounded-full border-2 border-indigo-600"
                src={candidate?.profileImage}
                alt="avatar"
              />
            ) : (
              <img
                className="w-20 h-20 bg-gray-100 rounded-full border-2 border-indigo-600"
                src={FakeProfile}
                alt="avatar"
              />
            )}

            <div className="flex flex-col items-center">
              <p className="text-sm">Affiliate Name </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.name}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Affiliate Email </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.email}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Total Shared</p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.totalShared}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Total Shortlisted</p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.totalShortlisted}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Total Joined</p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.totalJoined}
              </span>{" "}
            </div>
          </Link>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AffilInfoEmployee;
