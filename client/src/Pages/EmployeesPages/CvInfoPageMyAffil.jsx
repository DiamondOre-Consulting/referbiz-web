import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { Document, Page } from "react-pdf";
import axios from "axios";
import EmployeeNav from "../../Components/EmployeeDashComponents/EmployeeNav";
import EmployeeFooter from "../../Components/EmployeeDashComponents/EmployeeFooter";

const CvInfoPageMyAffil = () => {
  const cvId = useParams();
  const navigate = useNavigate();
  console.log(cvId);
  const [candidate, setCandidate] = useState({});
  const [pdfPath, setPdfPath] = useState('');
  const [shortlisting, setShortlisting] = useState("");
  const [joining, setJoining] = useState("");
  const [appearing, setAppearing]=useState("");
  const[offering,setOffering]=useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const token = localStorage.getItem("token");

  const handleEditClick = () => {
    setShowEditForm(true);
  };
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
          `https://api.referbiz.in/api/employee-rb/my-affiliates/get-cv-data/${cvId.id}`,
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
        setShortlisting(shorting ? "Yes" : "No");
        setJoining(joint ? "Yes" : "No");
        setAppearing(appear ? "Yes" : "No");
        setOffering(offer ? "Yes" : "No");
        console.log("apper details",appearing);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, [decodedToken,navigate]);

  const handlePreview = async () => {
    try{
      const preview = await axios.get(
        `https://api.referbiz.in/api/employee-rb/my-affiliates/get-cv-data/${cvId.id}`,
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

  const pdfUrl = `https://api.referbiz.in/api/employee-rb/my-affiliates/get-cv-data/${cvId.id}`;
  return (
    <div>
      <EmployeeNav />
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
          <div className="grid grid-cols-4 gap-4 md:grid-cols-4 lg:gap-8">

          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {appearing}
              </div>
              <div className="text-sm font-semibold sm:text-base">
               Appeared
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {shortlisting}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Shortlisted
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-4 lg:p-8">
              <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">
                {offering}
              </div>
              <div className="text-sm font-semibold sm:text-base">
                Offered
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

        <Link to={`/my-affiliates/each-cv/${candidate?._id}`} className="flex justify-center">
              <p
                onClick={handleEditClick}
                className="px-5 py-3 w-2/3 rounded-md bg-blue-400 text-gray-100 text-center hover:bg-red-600"
              >
                Edit
              </p> 
            </Link>
    

        {showEditForm && (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowEditForm(false)}>&times;</span>
          <EditPopUp candDetails={candDetails} update={update}  />
        </div>
      </div>
      )}
        {/* <Link 
        onClick={handlePreview}>Preview</Link> */}
        <div className="flex justify-center py-10">
          <button
            type="button"
            className="px-5 py-3 w-2/3 rounded-md bg-red-400 text-gray-100 hover:bg-red-600"
          >
            <a className="text-lg" target="_blank" href={candidate?.PDF}>
              Download Resume
            </a>
          </button>
        </div>
      </div>
      {/* <iframe title="PDF Viewer" src={candidate?.PDF} width="100%" height="600px"></iframe> */}
      <EmployeeFooter />
    </div>
  );
};

export default CvInfoPageMyAffil;