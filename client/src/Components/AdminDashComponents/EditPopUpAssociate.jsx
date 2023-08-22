import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";

const EditPopUpAssociate = () => {
  const [formValues, setFormValues] = useState({
    mentorName: "",
    mentorEmail: "",
  });

  const [userData, setUserData] = useState(null);

  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.name : "No Name Found";

  const { id } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormValues({ ...formValues, profileImage: file });
//   };

  const navigate = useNavigate();

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
    const fetchUserData = async () => {
      try {
        // Make a GET request to retrieve the user data
        const response = await axios.get(
          `http://192.168.29.235:8080/api/admin-rb/admin-associates-data/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace '/api/user' with the appropriate endpoint

        // Set the user data in state
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [decodedToken]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/auth-admin-login");
    }

    const formData = new FormData();
    formData.append("mentorName", formValues.mentorName);
    formData.append("mentorEmail", formValues.mentorEmail);
    // Perform signup logic here
    try {
      const response = await axios.put(
        `http://192.168.29.235:8080/api/admin-rb/admin-associates-data/update/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated Profile Successfully!!");
        localStorage.removeItem("token");
        window.location.href = "/auth-admin-login";
        console.log("Logging out");
        // Redirect to login page or perform other actions
      } else {
        console.log("Signup failed");
        // Handle signup error
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Update Your Associate
        </h1>

        <form
          onSubmit={handleSignup}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
        >
          <p className="text-center text-lg font-medium">
            You can update Mentor's Name or Mentor's Email
          </p>

          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="text"
                id="name"
                name="mentorName"
                placeholder={userData?.mentorName}
                value={formValues.mentorName}
                onChange={handleInputChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="email"
                id="email"
                name="mentorEmail"
                placeholder={userData?.mentorEmail}
                value={formValues.mentorEmail}
                onChange={handleInputChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Update
          </button>

          {/* <p className="text-center text-sm text-gray-500">
            Have account already?
            <a className="underline cursor-pointer" onClick={toggleForm}>
              Sign in
            </a>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default EditPopUpAssociate;
