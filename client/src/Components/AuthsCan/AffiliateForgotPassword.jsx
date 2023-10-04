import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AffiliateForgotPassword = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [popUp, setPopUp] = useState(false);
  const [errShow, setErrShow] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", formValues.email);
    // Perform signup logic here
    try {
      const response = await axios.post(
        `https://referbiz-web.onrender.com:8080/api/candidates/forgot-password`,
        formValues,
      );

      if (response.status === 201) {
        console.log("OTP Sent Successfully!!!");
        setPopUp(true);
        setFormValues({
            email: "",
          });
          navigate('/affiliate-update-password')
      } else {
        console.log("Signup failed");
        setErrShow(true);
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
          Forgot Password
        </h1>

        <form
          onSubmit={handleSignup}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
        >
          <p className="text-center text-lg font-medium">
            Enter your registered email id 
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Your Email
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formValues.email}
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
            Send OTP
          </button>
        </form>

        {popUp ? (
            <h1 className="text-3xl text-green-500">OTP has been sent to your registered email id</h1>
        ) : ""}
        {errShow ? (
            <h1 className="text-3xl text-red-500">Something Went Wrong!!!</h1>
        ) : ""}
      </div>
    </div>
  );
};

export default AffiliateForgotPassword;
