
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RB_LOGO from "../../assets/RB_100_New.png";
import { motion } from "framer-motion";

const VendorNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Logging out");
  };
  return (
    <>
      <div>
        {/* Header and Nav Section Start */}
        <div className="bg-white">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <header className=" flex items-center justify-between py-2 md:mb-4 md:py-4 xl:mb-4">
              <a
                href="/"
                className="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
                aria-label="logo"
              >
                <img className="w-1/2" src={RB_LOGO} alt="" />

              </a>

              <nav className="hidden gap-12 lg:flex items-center justify-center">
                <a href="#" className="text-lg font-semibold text-indigo-500">
                  Home
                </a>
                <Link
                  to={"/aboutus"}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                >
                  MyAffiliates
                </Link>
                <Link
                  to={"/services"}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                >
                  Closed leeds
                </Link>
                <a
                  href="#"
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                  onClick={handleLogout}
                >
                  Logout
                </a>

                <div className="relative">
                  {/* Notification Icon */}
                  <div className=" z-20 bg-red-700 text-center absolute bottom-4 right-3 rounded-full text-white text-sm px-1">1</div>
                  <button
                    className="relative z-10"
                    onMouseEnter={() => setShowNotification(true)}
                    onMouseLeave={() => setShowNotification(false)}
                  >
                    {/* Your notification icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>

                  {/* Notification Bubble */}
                  {showNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute z-20 top-full w-60 left-1/2 -ml-56 bg-gray-300 shadow-md text-gray-600 px-2 py-1 rounded-md shadow-md"
                      onMouseEnter={() => setShowNotification(true)}
                      onMouseLeave={() => setShowNotification(false)}
                    >
                      New notification! hii Zoya how are you ?
                    </motion.div>
                  )}
                </div>
              </nav>

              {/* <div className="hidden lg:inline-block md:hidden relative text-left" ref={dropdownRef}>
                <button type="button" class="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">View notifications</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
              </div> */}

              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Menu
              </button>
            </header>
            <ul
              className={`gap-10 ${menuOpen ? "block" : "hidden"
                } w-full flex flex-col items-center justify-center mb-14`}
            >
              <Link to={"/home-main"}>
                <li
                  className={`${menuOpen ? "block" : "hidden"
                    } transition ease-in-out delay-150 px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-250`}
                >
                  Home
                </li>
              </Link>
              <Link to={"/aboutus"}>
                <li
                  className={`${menuOpen ? "block" : "hidden"
                    } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
                >
                  MyAffiliates
                </li>
              </Link>
              <Link to={"/services"}>
                <li
                  className={`${menuOpen ? "block" : "hidden"
                    } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
                >
                  closed leeds
                </li>

              </Link>

              <Link to={'/'}>
                <li
                  className={`${menuOpen ? "block" : "hidden"
                    } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
                  onClick={handleLogout}
                >
                  Logout
                </li>

              </Link>

              <button type="button" class="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}

export default VendorNav