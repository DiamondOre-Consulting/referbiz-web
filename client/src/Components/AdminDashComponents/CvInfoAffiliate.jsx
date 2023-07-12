import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";

const CvInfoAffiliate = ({ candDetails }) => {
  console.log(candDetails);
  const [candidate, setCandidate] = useState({});
  const [shortlistig, setShortlisting] = useState("");
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
          `http://localhost:8080/api/admin-rb/admin-affiliates-data/get-cv-data/${candDetails}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidate(response.data); // Assuming the response data contains the card details
        console.log(response.data);
        console.log(candidate.isShortlisted);
        // const stringShortlisted = candidate.isShortlisted.toString();
        // const stringJoined = candidate.isJoined.toString();
        // setShortlisting(candidate?.isShortlisted?.toString());
        // setJoining(candidate?.isJoined?.toString());
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
                  candidate.createdAt.slice(0, 10)}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Submission Time </p>
              <span className="text-indigo-700 font-semibold">
                {candidate &&
                  candidate.createdAt &&
                  candidate.createdAt.slice(11, 16)}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Shortlisted </p>
              <span className="text-indigo-700 font-semibold">
                {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Candidate Joined </p>
              <span className="text-indigo-700 font-semibold">
                {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false}
              </span>{" "}
            </div>
            {/* <p className="text-sm">
              Candidate Email:{" "}
              <span className="text-indigo-700 font-semibold">
                {candidate?.refUniqueEmailId}
              </span>
            </p>
            <p className="text-sm">
              Candidate Phone Number:{" "}
              <span className="text-indigo-700 font-semibold">
                {candidate?.refPhone}
              </span>
            </p>
            <p className="text-sm">
              Submission Date:{" "}
              <span className="text-indigo-700 font-semibold">
                {candidate &&
                  candidate.createdAt &&
                  candidate.createdAt.slice(0, 10)}
              </span>
            </p>
            <p className="text-sm">
              Submission Time:{" "}
              <span className="text-indigo-700 font-semibold">
                {candidate &&
                  candidate.createdAt &&
                  candidate.createdAt.slice(11, 16)}
              </span>
            </p> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <h3 className="text-4xl">{candDetails}</h3> */}
    </div>
  );
};

export default CvInfoAffiliate;
