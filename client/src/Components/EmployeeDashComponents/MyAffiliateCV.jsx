import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "axios";
import EditPopUp from "./EditPopUpAssociateCV";

const MyAffiliateCV = ({ candDetails}) => {
  console.log("details",candDetails);
  const [candidate, setCandidate] = useState({});
  const [shortlisting, setShortlisting] = useState("");
   const[offering,setOffering]=useState("");
  const [appearing, setAppearing] = useState("");
  const [joining, setJoining] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const { decodedToken } = useJwt(localStorage.getItem("token"));
  console.log("token console",decodedToken)
  // const userid = decodedToken ? decodedToken.EmpName : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/employee-login-confi");
      }
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Token not found in local storage, handle the error or redirect to the login page
          console.error("No token found");
          navigate("/employee-login-confi");
          return;
        }

        const response = await axios.get(
          `https://referbiz-web-backend.onrender.com/api/employee-rb/my-affiliates/get-cv-data/${candDetails}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidate(response.data); // Assuming the response data contains the card details
        console.log(response.data);
        const shorting = response.data.isShortlisted;
        const joint = response.data.isJoined;
        const appear=response.data.isAppeared;
        const offer=response.data.isOffered;
        setShortlisting(shorting ? "Yes" :"No");
        setJoining(joint ? "Yes" :"No");
        setOffering(offer ? "Yes" :"No");
        setAppearing(appear ? "Yes" :"No");
        console.log("reffered by id",response.data.referredById
        )
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
          to={`/my-affiliates/each-cv/cv-details/${candidate?._id}`}
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
                    const utcTime = new Date(candidate.createdAt);
                    const istTime = new Date(utcTime.getTime() + 19800000);
                    const formattedISTTime = istTime.toLocaleString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return formattedISTTime;
                  })()}
              </span>{" "}
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm"> Appeared</p>
              <span className="text-indigo-700 font-semibold">
                {/* {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false}  */}
                {appearing}
              </span>{" "}
            </div>

            
            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm">Shortlisted </p>
              <span className="text-indigo-700 font-semibold">
                {/* {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false}  */}
                {shortlisting}
              </span>{" "}
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm"> Offered </p>
              <span className="text-indigo-700 font-semibold">
                {/* {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false}  */}
                {offering}
              </span>{" "}
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto">
              <p className="text-sm"> Joined </p>
              <span className="text-indigo-700 font-semibold">
                {/* {candidate
                  ? candidate &&
                    candidate.isShortlisted &&
                    candidate.isShortlisted.toString()
                  : false} */}
                {joining}
              </span>{" "}
            </div>
            <Link to={`/my-affiliates/each-cv/${candDetails}`} className="flex flex-col items-center bg-indigo-500 px-5 py-2 rounded-md cursor-pointer hover:bg-indigo-700 w-full sm:w-auto">
              <p
                onClick={handleEditClick}
                className="text-sm flex justify-center text-gray-100"
              >
                Edit
              </p> 
            </Link>
          </Link>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {showEditForm && (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowEditForm(false)}>&times;</span>
          <EditPopUp candDetails={candDetails} update={update}  />
        </div>
      </div>
      )}
    </div>
  );
};

export default MyAffiliateCV;
