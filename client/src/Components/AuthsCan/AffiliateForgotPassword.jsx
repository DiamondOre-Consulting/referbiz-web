import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AffiliateForgotPassword = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [errShow, setErrShow] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", formValues.email);
    // Perform signup logic here
    try {
      const response = await axios.post(
        `api.referbiz.in/api/candidates/forgot-password`,
        formValues
      );

      if (response.status === 201) {
        console.log("OTP Sent Successfully!!!");
        setPopUp(true);
        setFormValues({
          email: "",
        });
        setTimeout(() => {
          navigate("/affiliate-update-password");
        }, 1000);
      } else {
        console.log("Update failed");
        setErrShow(true);
        // Handle signup error
      }
    } catch (error) {
      console.error("Error updating:", error);
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
          {loading && (
            <div className="absolute inset-0 bg-gray-800 text-gray-300 text-5xl font-bold opacity-75 flex items-center justify-center">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              {/* <p>Loading</p> */}
              <span class="sr-only">Loading...</span>
            </div>
          )}
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
          <h1 className="text-3xl text-green-500">
            OTP has been sent to your registered email id
          </h1>
        ) : (
          ""
        )}
        {errShow ? (
          <h1 className="text-3xl text-red-500">Something Went Wrong!!!</h1>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AffiliateForgotPassword;
