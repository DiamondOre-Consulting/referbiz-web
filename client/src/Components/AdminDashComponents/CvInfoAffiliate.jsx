import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment-timezone';

const CvInfoAffiliate = ({ candDetails }) => {
  console.log("desh details",candDetails);
  const [candidate, setCandidate] = useState({});
  const [shortlisting, setShortlisting] = useState("No");
  const[offering,setOffering]=useState("NO");
  const [appearing, setAppearing] = useState("No");
  const [joining, setJoining] = useState("No");

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
        const shorting = response.data.isShortlisted;
        const appear = response.data.isAppeared;
        console.log("isAppeared:", appear);
        const offer=response.data.isOffered;
        const joint = response.data.isJoined;
        setAppearing(appear ? "Yes" : "No");
        setShortlisting(shorting ? "Yes": "No");
        setJoining(joint ? "Yes": "No");
        setOffering(offer? "Yes" : "No");
        console.log("isOffered",offer)
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, [candDetails]);

  return (
    <div>
      <div className="shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg my-7">
        {candidate ? (
          <Link
            to={`/admin-all-affiliates/each-affiliate/cv-details/${candidate?._id}`}
            key={candidate?._id}
            className="flex flex-wrap justify-between gap-2 mt-4"
          >
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Name </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refName}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Email </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refUniqueEmailId}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Phone </p>
              <span className="text-indigo-700 font-semibold">
                {candidate?.refPhone}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
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
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Submission Time </p>
              <span className="text-indigo-700 font-semibold">
                {candidate &&
                  candidate.createdAt &&
                  (() => {
                    const utcTime = moment.utc(candidate.createdAt); // Creating moment object for UTC timestamp
                    const istTime = utcTime.tz('Asia/Kolkata'); // Converting to IST timezone
                    const formattedISTTime = istTime.format('hh:mm A'); // Formatting IST time
                    return formattedISTTime;
                  })()}
              </span>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Appered </p>
              <span className="text-indigo-700 font-semibold">
                 {appearing} 
              </span>{" "}  
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Shortlisted </p>
              <span className="text-indigo-700 font-semibold">
                {shortlisting}
              </span>{" "}
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Offered </p>
              <span className="text-indigo-700 font-semibold">
                {offering}
              </span>{" "}
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Joined </p>
              <span className="text-indigo-700 font-semibold">
                {joining}
              </span>{" "}
            </div>
            <Link to={`/admin-all-affiliates/each-affiliate/each-cv/${candDetails}`} className="flex flex-col items-center bg-indigo-500 px-5 py-2 rounded-md cursor-pointer hover:bg-indigo-700 w-full sm:w-auto">
              <p className="text-sm flex justify-center text-gray-100">
                Edit
              </p>
            </Link>
          </Link>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* <h3 className="text-4xl">{candDetails}</h3> */}
    </div>
  );
};

export default CvInfoAffiliate;
