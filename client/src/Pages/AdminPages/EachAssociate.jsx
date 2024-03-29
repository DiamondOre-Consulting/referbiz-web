import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";
import { useJwt } from "react-jwt";
import CvInfoAffiliate from "../../Components/AdminDashComponents/CvInfoAffiliate";
import CvInfoAssociate from "../../Components/AdminDashComponents/CvInfoAssociate";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const EachAssociate = () => {
  const [details, setDetails] = useState({});
  const [allCvs, setAllCvs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
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

    const fetchAffiliate = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Token not found in local storage, handle the error or redirect to the login page
          console.error("No token found");
          navigate("/auth-admin-login");
          return;
        }

        // Fetch associates data from the backend
        const response = await axios.get(
          `https://referbiz-web-backend.onrender.com/api/admin-rb/admin-associates-data/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        console.log(response.data);
        setDetails(data);
        const cvArr = response.data.allCvInfo;
        setAllCvs(cvArr);
        console.log(allCvs);
        console.log(data.totalJoined);
      } catch (error) {
        console.error("Error fetching associates:", error);
        // Handle error and show appropriate message
      }
    };

    fetchAffiliate();
  }, [decodedToken, navigate]);
  return (
    <>
      <AdminNav />
      <div className="px-[15rem] py-12 bg-gray-200 h-full">
        <div className="flex justify-between">
          <div className="flex flex-wrap items-center gap-10">
            <img
              className="w-[100px] h-[100px] bg-indigo-400 rounded-full border-2 border-indigo-600"
              src={`https://referbiz-web-backend.onrender.com/` + details?.profileImage}
              alt="Profile Image"
            />
            <div className="flex flex-col items-left">
              <h1 className="text-4xl font-semibold text-indigo-600">
                {details.name}
              </h1>
              <p className="text-xl text-gray-700">{details.email}</p>
              <div className="flex flex-col gap-4 my-4">
                <div className="flex flex-col items-left">
                  <h1 className="text-xl text-gray-900">
                    Mentor's Name:{" "}
                    <span className="text-indigo-600">
                      {details.mentorName}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-900">
                    Mentor's Email:{" "}
                    <span className="text-gray-700">{details.mentorEmail}</span>
                  </p>
                </div>
                <Link to={`/admin-all-associates/each-associate/update/${id}`}>
                <button className="text-xl text-gray-100 bg-gray-600 px-3 py-2 rounded-lg hover:bg-gray-800">Edit Profile</button>
                </Link>
                {/* <BorderColorIcon className="text-gray-600 hover:text-gray-800 cursor-pointer" /> */}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row items-center gap-10">
            <BorderColorIcon />
            <div className="flex flex-col items-left">
              <h1 className="text-4xl font-semibold text-gray-900">
                Mentor's Name: <span className="text-indigo-600">{details.mentorName}</span>
              </h1>
              <p className="text-xl text-gray-900">Mentor's Email: <span className="text-gray-700">{details.mentorEmail}</span></p>
            </div>
          </div> */}
        </div>
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {details?.totalShared}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Referrals
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {details?.totalShortlisted}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Shortlisted
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {details?.totalJoined}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Total Joined
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  &#8377; {details?.totalAmount}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Your Total Amount
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 w-full shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg">
          {allCvs.map((allCv) => (
            <CvInfoAssociate key={allCv} candDetails={allCv} />
          ))}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default EachAssociate;
