import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import Signup from "../AuthsCan/Signup";

const EditPopUpAffiliateCV = () => {
  const [formValues, setFormValues] = useState({
    isShortlisted: null,
    isJoined: null,
    isAppeared: null,
    isOffered: null,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    // Disable the button
    setIsButtonDisabled(true);
  };


  const [userData, setUserData] = useState(null);


  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.name : "No Name Found";

  const { id } = useParams();
  console.log(id);

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormValues({ ...formValues, [name]: value });
  //   };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Convert the string value to a boolean (true/false)
    setFormValues({ ...formValues, [name]: value === "true" });
  };

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
          `https://referbiz-web-backend.onrender.com/api/employee-rb/my-associates/get-cv-data/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace '/api/user' with the appropriate endpoint

        // Set the user data in state
        setUserData(response.data);
        const user = userData?.name;
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [decodedToken, id]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!userData.isAppeared) {
      alert("Please fill the Appeared field first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    }

    const formData = new FormData();
    formData.append("isShortlisted", formValues.isShortlisted);
    // formData.append("isJoined", formValues.isJoined);
    try {
      const response = await axios.put(
        `https://referbiz-web-backend.onrender.com/api/employee-rb/my-affiliates-data/update-shortlisted-cv-sharing/${id}`,
        { isShortlisted: formValues.isShortlisted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated Profile Successfully!!");
        window.alert(`${userData?.refName} is shortlisted`)
        // localStorage.removeItem("token");
        // window.location.href = "/employee-login-confi";
        // console.log("Logging out");
        navigate(`/my-affiliates/each-cv/cv-details/${userId}`)
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

  const handleJoined = async (e) => {
    e.preventDefault();
    if (!userData.isOffered) {
      alert("Please fill the Offered field first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    }

    const formData = new FormData();
    formData.append("isSJoined", formValues.isShortlisted);
    // formData.append("isJoined", formValues.isJoined);
    try {
      const response = await axios.put(
        `https://referbiz-web-backend.onrender.com/api/employee-rb/my-affiliates-data/update-joined-cv-sharing/${id}`,
        { isJoined: formValues.isJoined },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.alert(`${userData?.refName} is Joined`)
        // console.log("Updated Profile Successfully!!");
        // localStorage.removeItem("token");
        // window.location.href = "/employee-login-confi";
        // console.log("Logging out");
        navigate(`/my-affiliates/each-cv/cv-details/${userId}`)
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

  //isappeared
  const handleappeared = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    }

    try {
      const response = await axios.put(
        `https://referbiz-web-backend.onrender.com/api/employee-rb/my-affiliates-data/update-appeared-cv-sharing/${id}`,
        { isAppeared: formValues.isAppeared },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.alert(`${userData?.refName} is Appeared`)
        console.log("Updated Profile Successfully!!");
        navigate(`/my-affiliates/each-cv/cv-details/${userId}`)
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };



  // isOfferedf
  const handleoffered = async (e) => {
    e.preventDefault();
    if (!userData.isShortlisted) {
      alert("Please fill the Shortlisted field first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      navigate("/employee-login-confi");
    }

    try {
      const response = await axios.put(
        `https://referbiz-web-backend.onrender.com/api/employee-rb/my-affiliates-data/update-offering-cv-sharing/${id}`,
        { isOffered: formValues.isOffered },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.alert(`${userData?.refName} is Offered`)
        console.log("Updated Profile Successfully!!");
        navigate(`/my-affiliates/each-cv/cv-details/${userId}`)
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  console.log()
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Update Your{" "}
          <span className="text-gray-800">{userData?.refName}'s</span> CV
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-red-500 font-semibold">
          You can edit a particular field only once
        </p>

        {userData?.isAppeared ? (
          <h1 className="text-center my-5 text-lg font-bold">
            {userData?.refName} is already Appeared
          </h1>
        ) : (
          <form
            onSubmit={handleappeared}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
          >
            <p className="text-center text-lg font-medium">
              Update Appeared Status
            </p>

            <div>
              <label htmlFor="isShortlisted" className="sr-only">
                Appeared Status
              </label>

              <div className="relative">
                <select
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  id="isAppeared"
                  name="isAppeared"
                  onChange={handleInputChange}
                >
                  <option >
                    Select
                  </option>

                  <option value={true}>True</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={userData?.isAppeared === formValues.isAppeared}
              className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white `}
            >
              Update
            </button>
          </form>
        )}


        {userData?.isShortlisted ? (
          <h1 className="text-center my-5 text-lg font-bold">
            {userData?.refName} is already Shortlisted
          </h1>
        ) : (
          <form
            onSubmit={handleSignup}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
          >
            <p className="text-center text-lg font-medium">
              Update Shortlisting Status
            </p>

            <div>
              <label htmlFor="isShortlisted" className="sr-only">
                Shortlisted Status
              </label>

              <div className="relative">
                <select
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  id="isShortlisted"
                  name="isShortlisted"
                  onChange={handleInputChange}
                >
                  <option >
                    Select
                  </option>

                  <option value={true}>True</option>
                </select>
              </div>
            </div>
            {


              (!userData?.isAppeared) ? (

                <button
                  type="submit"
                  disabled={userData?.isShortlisted === formValues.isShortlisted}
                  className={`block w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white`}
                >
                  Update
                </button>
              )

                : (

                  <button
                    type="submit"
                    disabled={userData?.isShortlisted === formValues.isShortlisted}
                    className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
                  >
                    Update
                  </button>

                )
            }


          </form>
        )}

        {userData?.isOffered ? (
          <h1 className="text-center my-5 text-lg font-bold">
            {userData?.refName} is already Offered
          </h1>
        ) : (
          <form
            onSubmit={handleoffered}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
          >
            <p className="text-center text-lg font-medium">
              Update Offered Status
            </p>

            <div>
              <label htmlFor="isOffered" className="sr-only">
                Offered Status
              </label>

              <div className="relative">
                <select
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  id="isOffered"
                  name="isOffered"
                  onChange={handleInputChange}
                >
                  <option >
                    Select
                  </option>

                  <option value={true}>True</option>
                </select>
              </div>
            </div>
            {
              (!userData?.isShortlisted) ? (
                <button
                  type="submit"
                  disabled={userData?.isOffered === formValues.isOffered}
                  className={`block w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white`}
                >
                  Update
                </button>) : (
                <button
                  type="submit"
                  disabled={userData?.isOffered === formValues.isOffered}
                  className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
                >Update</button>
              )

            }

          </form>
        )}

        {userData?.isJoined ? (
          <h1 className="text-center my-5 text-lg font-bold">
            {userData?.refName} is already Joined
          </h1>
        ) : (
          <form
            onSubmit={handleJoined}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
          >
            <p className="text-center text-lg font-medium">
              Update Joining Status
            </p>

            <div>
              <label htmlFor="isJoined" className="sr-only">
                Joined Status
              </label>

              <div className="relative">
                <select
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  id="isJoined"
                  name="isJoined"
                  // placeholder={userData?.isJoined}
                  // value={formValues?.isJoined}
                  onChange={handleInputChange}
                >
                  <option >
                    Select
                  </option>

                  <option value={true}>True</option>
                </select>
              </div>
            </div>

            {
              (!userData?.isOffered) ? (
                <button
                  type="submit"
                  disabled={userData?.isJoined === formValues.isJoined}
                  className={`block w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white`}
                >
                  Update
                </button>
              )
                : (
                  <button
                    type="submit"
                    disabled={userData?.isJoined === formValues.isJoined}
                    className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white`}
                  >
                    Update
                  </button>
                )
            }

          </form>
        )}
      </div>
    </div>
  );
};

export default EditPopUpAffiliateCV;
