import React from "react";
import RB_LOGO from "../../assets/RB_100_New.png";
import { Link } from "react-router-dom";

const VendorFooter = () => {
  return (
    <>
    <div>
      <div className="bg-white pt-4 sm:pt-10 lg:pt-12">
        <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 grid grid-cols-2 gap-12 border-t pt-10 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12">
            <div className="col-span-full lg:col-span-2">
              <div className="mb-4 lg:-mt-2">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl"
                  aria-label="logo"
                >

                  <img className="w-1/2" src={RB_LOGO} alt="Logo Here" />
                </a>
              </div>

              <p className="mb-6 text-gray-500 sm:pr-8">
                Unleash the power of ReferBiz! It's not just a platform, it's a
                lifestyle that lets you play, earn, and learn, all in one place.
              </p>

            </div>

            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                Products
              </div>

              <nav className="flex flex-col gap-4">
                <div>
                  <a
                    href="#"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Affiliate Model
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Associate Model
                  </a>
                </div>


                <div>
                  <a
                    href="#"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Internship Consultant
                  </a>
                </div>
              </nav>
            </div>

            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                Company
              </div>

              <nav className="flex flex-col gap-4">
                <div>
                  <Link
                    to={'/aboutus'}
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    About
                  </Link>
                </div>

                <div>
                  <Link
                    to={'/aboutus'}
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Team
                  </Link>
                </div>

                <div>
                  <Link
                    to={'/auth-admin-login'}
                    className="cursor-pointer text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Admin Login
                  </Link>
                </div>

                <div>
                  <Link
                    to={'/employee-login-confi'}
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Employee Login
                  </Link>
                </div>

                <div>
                  <Link
                    to={'/vendor-login'}
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Vendor Login
                  </Link>
                  </div>
              </nav>
            </div>

            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                Support
              </div>

              <nav className="flex flex-col gap-4">
                <div>
                  <a
                    href="#contact"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Contact
                  </a>
                </div>


                <div>
                  
                  <Link
                    to={'/FAQ'}
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    FAQ
                  </Link>
                </div>
              </nav>
            </div>

            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                Legal
              </div>

              <nav className="flex flex-col gap-4">
                <div>
                  <Link
                    to="/terms-and-conditions"
                    target="blank"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Terms of Service
                  </Link>
                </div>

                <div>
                  <Link
                    to="/privacy-policy"
                    target="blank"
                    className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          <div className="border-t pt-8 pb-2 text-center text-sm text-gray-400">
            © 2023 - ReferBiz. All rights reserved.
          </div>
          <div className="pb-8 pt-2 text-center text-sm text-gray-400">
            Developed by <Link className="no-underline hover:underline" target="_blank" to="https://www.linkedin.com/in/harsh-jha-0675b5171/">Harsh Jha</Link>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}

export default VendorFooter