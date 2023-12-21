import React, { useState } from "react";
import { Link } from "react-router-dom";
import RB_LOGO from "../../assets/RB_100_New.png";
import HomeMainPic from "../../assets/homeCTA.jpg";

const HomeNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <div>
      {/* Header and Nav Section Start */}
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
              aria-label="logo"
            >
              {/* <svg
                  width="95"
                  height="94"
                  viewBox="0 0 95 94"
                  className="h-auto w-6 text-indigo-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                </svg> */}
              <img className="w-1/2" src={RB_LOGO} alt="" />
              {/* ReferBiz */}
            </a>

            <nav className="hidden gap-12 lg:flex">
              <a href="#" className="text-lg font-semibold text-indigo-500">
                Home
              </a>
              <Link
                to={"/aboutus"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                About Us
              </Link>
              <Link
                to={"/services"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Services
              </Link>
              <Link
                to={"/contactmain"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Contact Us
              </Link>
            </nav>

            <Link
  to={'/home-main'}
  className="rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
  style={{ display: 'inline-flex', alignItems: 'center' }}
>
  <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
  </svg>
  <span style={{ marginLeft: '8px' }}>Sign in</span>
</Link>


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
            className={`gap-10 ${
              menuOpen ? "block" : "hidden"
            } w-full flex flex-col items-center justify-center mb-14`}
          >
            <Link to={"/home-main"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } transition ease-in-out delay-150 px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Home
              </li>
            </Link>
            <Link to={"/aboutus"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                About Us
              </li>
            </Link>
            <Link to={"/services"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Services
              </li>
            </Link>
            <Link to={"/contactmain"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Contact Us
              </li>
            </Link>
            <Link to={"/home-main"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-lg font-semibold bg-indigo-500 text-white hover:bg-indigo-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Signin
              </li>
            </Link>
          </ul>
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                Very proud to introduce
              </p>

              <h1 className="text-black-800 mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
                Referral revolution where we play, earn, and learn
              </h1>

              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                Unleash the power of ReferBiz! It's not just a
                platform, it's a lifestyle that lets you play, earn, and learn,
                all in one place.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to={'/home-main'}
                  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Get Started
                </Link>

                {/* <a
                  href="#"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Take tour
                </a> */}
              </div>
            </div>

            <div className="h-40 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
              <img
                src={HomeMainPic}
                loading="lazy"
                alt="Photo by Fauxels"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>
        </div>
      </div>
      {/* Header and Nav Section End */}
    </div>
  );
};

export default HomeNav;
