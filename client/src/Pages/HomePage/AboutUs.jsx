import React from "react";
import { Link } from "react-router-dom";
import HomeAbout from "../../Components/HomePageComponent/HomeAbout";
import HomeFooter from "../../Components/HomePageComponent/HomeFooter";

const AboutUs = () => {
  return (
    <div className="px-12">
      {/* Navbar Start */}
      <div className="bg-white pb-1 sm:pb-1 lg:pb-1">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
              aria-label="logo"
            >
              <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="h-auto w-6 text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              Flowrift
            </a>

            <nav className="hidden gap-12 lg:flex">
              <Link
                to={"/home-main"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500"
              >
                Home
              </Link>
              <Link
                to={"/aboutus"}
                className="text-lg font-semibold text-indigo-500 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                About Us
              </Link>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Services
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Contact Us
              </a>
            </nav>

            <a
              href="#"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Signin
            </a>

            <button
              type="button"
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
        </div>
      </div>
      {/* Navbar End */}

      {/* About Content Start */}
      <HomeAbout />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Our Competitive Advantage
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Elevate your expectations as we pave the way for a brighter
              tomorrow. Join our journey – where excellence meets results.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16">
            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Growth</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Security</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Cloud</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Speed</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Support</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">Dark Mode</h3>
                <p className="mb-2 text-gray-500">
                  Filler text is dummy text which has no meaning however looks
                  very similar to real text.
                </p>
                {/* <a href="#" className="font-bold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Content End */}

      {/* Team Start */}
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Meet our Team
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Meet our exceptional minds, the driving force behind our success.
              A diverse blend of talent, united by passion and a shared vision
              to exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Radu Florin"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  John McCulling
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  Founder / CEO
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by christian ferrer"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  Kate Berg
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  CFO
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Ayo Ogunseinde"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  Greg Jackson
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  CTO
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Midas Hofstra"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  Robert Greyson
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  Creative Director
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Elizeu Dias"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  John Roberts
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  Investor Relations
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Matheus Ferrero"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  Judy Amandez
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  Senior Art Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      {/* Footer Start */}
      <HomeFooter />
      {/* Footer End */}
    </div>
  );
};

export default AboutUs;