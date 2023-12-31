import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import AssocInfoEmployee from "../../Components/AdminDashComponents/AssosInfoEmployee";
import AffiInfoEmployee from "../../Components/AdminDashComponents/AffiInfoEmployee";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";
import CvInfoEmployee from "../../Components/AdminDashComponents/CvInfoEmployee";

const EachEmployee = () => {
  const [details, setDetails] = useState({});
  const [allAssos, setAllAssos] = useState([]);
  const [allAffils,setAllAffils]=useState([]);
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
          `https://api.referbiz.in/api/admin-rb/admin-employees-data/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        console.log(response.data);
        setDetails(data);
        const empAssos = response.data.myAsso;
        const empAffil = response.data.myAffil;
        setAllAffils(empAffil);
        setAllAssos(empAssos);
        console.log(allAssos);
        console.log(empAssos);
        console.log(data.totalJoined);
        const cvArr = response.data.allCvInfo;
        setAllCvs(cvArr);
        console.log(cvArr);
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
            {/* <img
              className="w-[100px] h-[100px] bg-indigo-400 rounded-full border-2 border-indigo-600"
              src={`https://api.referbiz.in/` + details?.profileImage}
              alt="Profile Image"
            /> */}
            <div className="flex flex-col items-left">
              <h1 className="text-4xl font-semibold text-indigo-600">
                {details.EmpName}
              </h1>
              <p className="text-xl text-gray-700">{details.EmpEmail}</p>
            </div>
          </div>
          {/* <div className="flex flex-wrap items-center gap-10">
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
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 my-5">Associates</h1>
          <div className="bg-gray-300 w-full shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg">
            {allAssos.map((allAsso) => (
              <AssocInfoEmployee key={allAsso} candDetails={allAsso} />
            ))}
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 my-5">Affiliates</h1>
          <div className="bg-gray-300 w-full shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg">
            {allAffils.map((allAffil) => (
              <AffiInfoEmployee key={allAffil} candDetails={allAffil} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-semibold text-gray-800 my-5">{details?.EmpName}'s CVs</h1>
          <div className="bg-gray-300 w-full shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg">
            {allCvs ? (allCvs.map((allCv) => (
            <CvInfoEmployee key={allCv} cand={allCv} />
          ))) : (<p className="text-2xl font-semibold text-red-500 text-center">No Candidates Found...</p>)}
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default EachEmployee;
