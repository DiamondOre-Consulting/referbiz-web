import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "axios";
import Logo from "./Referbiz.png";
import FakeProfile from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/FakeProfile2.png";

const AdminNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userData, setUserData] = useState(null);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");;
    window.location.href = "/login";
    console.log("Logging out");
  };

  const { decodedToken } = useJwt(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

  const userName = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a GET request to retrieve the user data
        const response = await axios.get('http://localhost:8080/api/admin-rb/admin-user-data', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Replace '/api/user' with the appropriate endpoint

        // Set the user data in state
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 sm:py-3 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/">
              <img className="w-1/2" src={Logo} alt="Logo" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              
              <div className="sm:flex">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between rounded-md gap-2 px-5 text-sm font-medium text-teal-600 hover:bg-gray-100"
                >
                  <img
                      className="w-10 h-10 rounded-full"
                      src={FakeProfile}
                      alt="avatar"
                    />
                  {userName}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-[14.5rem] mt-12 py-2 w-[10rem] bg-gray-200 rounded-md shadow-lg">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleDropdown}
                    >
                      Edit Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>

              {/* <button
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-800"
                
              >
                Add CV
              </button> */}
              <Link
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-800"
                to={'/add-new-associate'}
              >
                Add New Associate
              </Link>
            </div>

            {/* <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleMobileNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileNavOpen && (
        <nav className="md:hidden bg-gray-100">
          <ul className="flex flex-col items-center gap-6 text-sm">
            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                Home
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/about"
              >
                About
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/careers"
              >
                Careers
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/history"
              >
                History
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/services"
              >
                Services
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/projects"
              >
                Projects
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/blog"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default AdminNav;