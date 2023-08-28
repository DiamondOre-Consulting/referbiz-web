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
          `http://192.168.29.235:8080/api/admin-rb/admin-affiliates-data/get-cv-data/${cvId.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidate(response.data); // Assuming the response data contains the card details
        console.log(response.data);
        console.log(candidate?.isShortlisted)
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePreview = async () => {
    try {
      const preview = await axios.get(
        `http://192.168.29.235:8080/api/admin-rb/get-cv-preview/${cvId.id}`,
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

  const pdfUrl = `http://192.168.29.235:8080/api/admin-rb/get-asso-cv-preview/${cvId.id}`;
  return (
    <div>
      <AdminNav />
      {/* <h1>{candidate?.refName}</h1>
      <h4>{candidate?.PDF}</h4>
      <h4>{candidate?.refUniqueEmailId}</h4>
      <h4>{candidate?.refPhone}</h4> */}
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {candidate?.refName}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                candidate Name
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {candidate?.refUniqueEmailId}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Candidate Email
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {candidate?.refPhone}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Candidate Phone
              </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                  &#8377; {details?.totalAmount}
                </div>
                <div className="text-sm font-semibold sm:text-base">
                  Your Total Amount
                </div>
              </div> */}
          </div>
        </div>
      </div>
      {/* <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {candidate?.isShortlisted ? (true) : (false)}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Shortlisted
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {candidate.isJoined}
              </div>
              <div className="text-sm font-semibold sm:text-base">Joined</div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Link onClick={handlePreview}>Preview</Link> */}
      <div className="">
      <button type="button" className="">
        <a target="_blank" href={pdfUrl}>
          Download Resume
        </a>
      </button>
      </div>
      {/* <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px"></iframe> */}
      <AdminFooter />
    </div>
  );
};

export default CvInfoPageAsso;
