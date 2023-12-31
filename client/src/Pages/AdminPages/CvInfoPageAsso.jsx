import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { Document, Page } from "react-pdf";
import axios from "axios";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";

const CvInfoPageAsso = () => {
  const cvId = useParams();
  const navigate = useNavigate();
  console.log(cvId);
  const [candidate, setCandidate] = useState({});
  const [pdfPath, setPdfPath] = useState("");
  const [shortlisting, setShortlisting] = useState("");
  const [joining, setJoining] = useState("");

  const token = localStorage.getItem("token");

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
          `https://api.referbiz.in/api/admin-rb/admin-affiliates-data/get-cv-data/${cvId.id}`,
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
  }, [decodedToken,navigate]);

  const handlePreview = async () => {
    try {
      const preview = await axios.get(
        `https://api.referbiz.in/api/admin-rb/get-cv-preview/${cvId.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPdfPath(preview.data);
      console.log("This is Path: ", pdfPath);
    } catch (error) {
      console.log("Error fetching CV Preview: ", error);
    }
  };

  const pdfUrl = `https://api.referbiz.in/api/admin-rb/get-asso-cv-preview/${cvId.id}`;
  return (
    <div>
      <AdminNav />
      <div className="my-7">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 lg:p-8">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {candidate?.refName}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Candidate Name
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 md:p-8">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {candidate?.refUniqueEmailId}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Candidate Email
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 md:p-8">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  {candidate?.refPhone}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Candidate Phone
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 md:p-8">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
          &#8377; {details?.totalAmount}
        </div>
        <div className="text-sm font-semibold sm:text-base">
          Your Total Amount
        </div>
      </div>
    </div> */}
          </div>
        </div>

        <div className="mx-auto max-w-screen-lg px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {shortlisting}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Shortlisted
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {joining}
              </div>
              <div className="text-sm font-semibold sm:text-base">Joined</div>
            </div>
          </div>
        </div>
        {/* <Link onClick={handlePreview}>Preview</Link> */}
        <div className="flex justify-center py-10">
          <button
            type="button"
            className="px-5 py-3 w-2/3 rounded-md bg-red-400 text-gray-100 hover:bg-red-600"
          >
            <a className="text-lg" target="_blank" href={pdfUrl}>
              Download Resume
            </a>
          </button>
        </div>
      </div>
      {/* <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px"></iframe> */}
      <AdminFooter />
    </div>
  );
};

export default CvInfoPageAsso;
