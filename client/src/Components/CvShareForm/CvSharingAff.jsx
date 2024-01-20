import React, { useState,useEffect } from "react";
import axios from "axios";
import { Navigate,useNavigate } from "react-router";
import { useJwt } from "react-jwt";
import Dropzone from "react-dropzone";

const CvSharing = () => {

  // const referredByOptions = [
  //   'Swati Chauhan',
  //   'Gayatri Rawat',
  //   'Nidhi Srivastva',
  //   'Priyanka Vishwakrma',
  //   'Pinky Yadav',
  //   'Megha Rajput',
  //   'Jyoti Malakar',
  //   'Alpna Bharti',
  //   'Anjali Sharma',
  //   'Bhavya Thakur',
  //   'Manpreet Kaur',
  //   'Sakshi Singh',
  //   'Mohd Amaan',
  //   'Sarfarz Alvi',
  //   'Sourav Sivach',
  //   'Muskan Jain',
  //   'Kesreen Saifi',
  //   'Ashwini Bhaskar',
  //   'Saksham Sharma',
  //   'Harsh Kumar Jha',
  // ];

  // const sortedReferredByOptions = referredByOptions.sort();

  const [empData,setEmpData]=useState([])

  const [showPopup, setShowPopup] = useState(true);
  const [submitted, setSubmitted] = useState(null);


  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userEmail = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/login");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/login");
      }
      
      const fetchUserData = async () => {
        try {
          // Make a GET request to retrieve the user data
          const response = await axios.get('https://api.referbiz.in/api/candidates/employees-data', 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }); // Replace '/api/user' with the appropriate endpoint
  
          // Set the user data in state
          // setPopUp(response.data.count);
          console.log(response.data)
          setEmpData(response.data);
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserData();
    }
  }, [decodedToken, navigate])




  const handleClose = () => {
    setShowPopup(false);
    setSubmitted(null);
  };

  const [formValues, setFormValues] = useState({
    refName: "",
    refPhone: "",
    refUniqueEmailId: "",
    document: null,
    referredById: "",
  });
  //   const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormValues({ ...formValues, document: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    const formData = new FormData();
    formData.append("refName", formValues.refName);
    formData.append("refPhone", formValues.refPhone);
    formData.append("refUniqueEmailId", formValues.refUniqueEmailId);
    formData.append("document", formValues.document);
    formData.append("referredById", formValues.referredById);

    try {
      const response = await axios.post(
        "https://api.referbiz.in/api/candidates/affiliate-contact-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setFormValues({
        refName: "",
        refPhone: "",
        refUniqueEmailId: "",
        document: null,
        referredById: "",
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div class="bg-gray-500"> */}
      <div className="mx-auto max-w-screen-2xl bg-gray-200 rounded-lg">
        <form
          className="mx-auto max-w-lg rounded-lg border"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
              >
                Candidate Name
              </label>
              <input
                type="text"
                id="refName"
                name="refName"
                value={formValues.refName}
                onChange={handleInputChange}
                className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
              >
                Candidate Email
              </label>
              <input
                type="email"
                id="refUniqueEmailId"
                name="refUniqueEmailId"
                value={formValues.refUniqueEmailId}
                onChange={handleInputChange}
                className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
              >
                Candidate Phone Number
              </label>
              <input
                type="text"
                id="refPhone"
                name="refPhone"
                value={formValues.refPhone}
                onChange={handleInputChange}
                className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="document"
                className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
              >
                Candidate Resume
              </label>
              <input
                type="file"
                id="document"
                name="document"
                onChange={handleFileChange}
                className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
          <label
            htmlFor="referredById"
            className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
          >
            Referred By
          </label>
          <br />
          <span className="text-red-600 inline-block text-xs mb-4 font-semibold">
            Please choose "var19" if you are not in contact with any of our team member
          </span>
          <select
            id="referredById"
            name="referredById"
            value={formValues.referredById}
            onChange={handleInputChange}
            className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
          >
            <option value="">Select</option>
            {empData.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.UniqueCode ? `${emp.UniqueCode}` : `${emp.EmpName}, ${emp._id}`} 
              </option>
            ))}
          </select>
        </div>

            <button className="block rounded-lg mt-4 bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
              Submit
            </button>
          </div>
        </form>
        {submitted ? (
          <div
            className={`fixed inset-0 flex items-center justify-center ${
              showPopup ? "visible" : "hidden"
            }`}
          >
            <section className="rounded-3xl shadow-2xl bg-gray-200">
              <div className="p-8 text-center sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                  Submitted Successfully!!!
                </p>

                <h2 className="mt-6 text-3xl font-bold">
                  Thanks for sharing resume, we'll get back to you soon!
                </h2>

                <button
                  className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
                  onClick={handleClose}
                >
                  OK
                </button>
              </div>
            </section>
          </div>
        ) : (
          ""
        )}
        {submitted === false ? <h1>Something went wrong</h1> : ""}
      </div>
    </>
  );
};

export default CvSharing;
