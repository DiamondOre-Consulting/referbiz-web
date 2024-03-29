import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import { Link } from "react-router-dom";

const CvInfoEmployee = ({ cand }) => {
  console.log(cand);
  const [candidate, setCandidate] = useState({});
  const [shortlisting, setShortlisting] = useState("");
  const [joining, setJoining] = useState("");

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
          `api.referbiz.in/api/admin-rb/admin-associates-data/get-cv-data/${cand}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidate(response.data); // Assuming the response data contains the card details
        console.log(response.data);
        const shorting = response.data.isShortlisted.toString();
        const joint = response.data.isJoined.toString();
        setShortlisting(shorting);
        setJoining(joint);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, [cand]);

  return (
    <div>
      <div className="bg-gray-300 shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg my-7">
        {candidate ? (
          <div
            key={candidate?._id}
            className="flex justify-between gap-2 items-center mt-4"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Name </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refName}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Email </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refUniqueEmailId}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Phone </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refPhone}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Submission Date </p>
              <span className="text-indigo-700 font-semibold">
                {candidate &&
                  candidate.createdAt &&
                  candidate.createdAt.slice(8, 10) +
                    "-" +
                    candidate.createdAt.slice(5, 7) +
                    "-" +
                    candidate.createdAt.slice(0, 4)}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Submission Time </p>
              <span className="text-indigo-700 font-semibold">
              {candidate &&
                  candidate.createdAt &&
                  (() => {
                    const utcTime = new Date(candidate.createdAt);
                    const istTime = new Date(utcTime.getTime() + 19800000);
                    const formattedISTTime = istTime.toLocaleString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return formattedISTTime;
                  })()
                  }
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Shortlisted </p>
              <span className="text-indigo-700 font-semibold">
                {shortlisting}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Joined </p>
              <span className="text-indigo-700 font-semibold">
                {joining}
              </span>{" "}
            </div>
            {/* <Link to={`/admin-all-employees/update/${cand}`} className="flex flex-col items-center bg-indigo-500 px-5 py-2 rounded-md cursor-pointer hover:bg-indigo-700">
              <p
                
                className="text-sm flex justify-center text-gray-100"
              >
                Edit
              </p> 
            </Link> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CvInfoEmployee;
