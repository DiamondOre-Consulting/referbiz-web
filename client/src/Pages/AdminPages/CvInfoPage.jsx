import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { Document, Page } from "react-pdf";
import axios from "axios";
import AdminNav from "../../Components/AdminDashComponents/AdminNav";
import AdminFooter from "../../Components/AdminDashComponents/AdminFooter";

const CvInfoPage = () => {
  const cvId = useParams();
  const navigate = useNavigate();
  console.log(cvId);
  const [candidate, setCandidate] = useState({});
  const [pdfPath, setPdfPath] = useState('');

  const token = localStorage.getItem("token");

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/document-1692947028426-435422778.pdf'; // Replace with the actual path to your PDF file
    link.download = 'document.pdf'; // Change the desired download filename
    link.click();
  };

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
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePreview = async () => {
    try{
      const preview = await axios.get(
        `http://192.168.29.235:8080/api/admin-rb/get-cv-preview/${cvId.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setPdfPath(preview.data);
      console.log("This is Path: ",pdfPath)
    } catch(error) {
      console.log("Error fetching CV Preview: ", error)
    }
  }

  const pdfUrl = `http://192.168.29.235:8080/api/admin-rb/get-cv-preview/${cvId.id}`;
  return (
    <div>
      <AdminNav />
      <h1>{candidate?.refName}</h1>
      <h4>{candidate?.PDF}</h4>
      <h4>{candidate?.refEmail}</h4>
      {/* <Link onClick={handlePreview}>Preview</Link> */}
      <button type="button"><a target="_blank" href={pdfUrl} >Download Resume</a></button>
      {/* <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600px"></iframe> */}
      <AdminFooter />
    </div>
  );
};

export default CvInfoPage;
