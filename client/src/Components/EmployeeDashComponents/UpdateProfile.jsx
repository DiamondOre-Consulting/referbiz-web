import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";

const UpdateProfileEmployee = () => {
  const [formValues, setFormValues] = useState({
    EmpName: "",
    EmpEmail: "",
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
      navigate("/employee-login-confi");
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/employee-login-confi");
      }
    }
    const fetchUserData = async () => {
      try {
        // Make a GET request to retrieve the user data
        const response = await axios.get(
          "https://referbiz-web.onrender.com:8080/api/employee-rb/user-data",
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
      navigate("/employee-login-confi");
    }

    // const formData = new FormData();
    // formData.append("EmpName", formValues.EmpName);
    // formData.append("EmpEmail", formValues.EmpEmail);
    // formData.append("profileImage", formValues.profileImage);
    // Perform signup logic here
    try {
      const response = await axios.put(
        `https://referbiz-web.onrender.com:8080/api/employee-rb/employee-user-data/update/${id}`,
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
        window.location.href = "/employee-login-confi";
        console.log("Logging out");
        console.log(response.data);
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
          Update Your Info As Employee
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSignup}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
        >
          <p className="text-center text-lg font-medium">
            Sign up to your account
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
                name="EmpName"
                placeholder={userData?.EmpName}
                value={formValues.EmpName}
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
                name="EmpEmail"
                placeholder={userData?.EmpEmail}
                value={formValues.EmpEmail}
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

          {/* <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div> */}

          {/* <div>
            <label htmlFor="document" className="sr-only">
              Your Profile Image
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="file"
                id="profileImage"
                name="profileImage"
                placeholder={userData?.profileImage}
                onChange={handleFileChange}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div> */}

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

export default UpdateProfileEmployee;
