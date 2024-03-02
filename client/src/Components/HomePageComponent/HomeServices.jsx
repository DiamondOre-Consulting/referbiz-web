import React from "react";
import InternPic from "../../assets/handshaking.jpg";
import ResumeBuildingPic from "../../assets/resumeBuilding.jpg";
import AssociateServicePic from "../../assets/associateModel.jpg";
import AffiliateServicePic from "../../assets/affiliatePic.jpg";
import Employees from "../../assets/Employees.jpg";
import { Link } from "react-router-dom";

const HomeServices = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-left text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              What RB Offers?
            </h2>

            <p className="max-w-screen-md text-left text-gray-500 md:text-lg">
              Explore our comprehensive suite of personalized services, each
              crafted to elevate your career and open doors to new
              opportunities, ensuring your success in today's competitive
              landscape.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
            <div className="flex flex-col overflow-hidden rounded-lg hover:shadow-lg border bg-white">
              <a
                href={'/services#affiliateModel'}
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={AffiliateServicePic}
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#affiliateModel'}
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Affiliate Model: The Refer & Earn Club (Lead Based)
                  </Link>
                </h2>

                <p className="mb-8 text-gray-500">
                  Introducing "Refer & Earn Club" – where you wield the power of
                  connections to earn rewards. Share freely, prosper together.
                  Join the revolution!
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg hover:shadow-lg border bg-white">
              <a
                href={'/services#associateModel'}
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={AssociateServicePic}
                  loading="lazy"
                  alt="Photo by Lorenzo Herrera"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#associateModel'}
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Associate Model: The Pro Partnership (Time Based)
                  </Link>
                </h2>

                <p className="mb-8 text-gray-500">
                  Presenting "Pro Partnership," where users become esteemed
                  associates, partnering with our experts as mentors, unlocking
                  opportunities, and earning as valued collaborators.
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg hover:shadow-lg border bg-white">
              <a
                href={'/services#resumeBuilding'}
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={Employees}
                  loading="lazy"
                  alt="Image by standret on Freepik"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#resumeBuilding'}
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Employee Model: The Dedicated Team (Time & Lead Based)
                  </Link>
                </h2>

                <p className="mb-8 text-gray-500">
                  With the help of our "Employee Model" you are gonna unleash your potential market with the dedicated team helping with their leads and time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-left text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Our Vendor Partners
            </h2>

            <p className="max-w-screen-md text-left text-gray-500 md:text-lg">
              We have onboarded many vendors from different domains to be the partner of this fun way of lead generation. Refer and Earn for everyone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    CV~Genie
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>
                <p className="w-1/2 rounded-md bg-indigo-500 px-1 py-1 text-sm font-semibold text-gray-200 text-center">
                  Service Based
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    DOC_Labz
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>
                <p className=" rounded-md bg-indigo-500 px-4 py-1 text-sm font-semibold text-gray-200 text-center">
                  IT Cunsulting Service
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-3xl  shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    Intern Linker
                  </a>
                </h2>

                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 text-center">
                  Job Consultancy
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg  shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    AgroBiz
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className=" rounded-md bg-indigo-500 py-1 px-2 text-sm font-semibold text-gray-200 text-center">
                  FMCG Commodities
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg  shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800 text-center">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    Diamond Ore Consulting
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className="rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 text-center">
                  Management Consulting
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    SwiftLane Motors
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className="rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 text-center">
                  Automobile Dealers
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg shadow-lg shadow-gray-300 mb-4">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    Midas Finserve
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className=" rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 text-center">
                  Financial Products
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg shdow-lg shadow-gray-300">
              <div className="flex flex-1 flex-col p-4 sm:p-6 justify-center items-center">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600 font-serif"
                  >
                    Oasis Homes
                  </a>
                </h2>
                <div className="flex items-center justify-around mb-4">
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg><span>(300)</span></div>
                  <div className="flex items-center mx-3"><svg class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span>(50)</span></div>
                  <div className="flex items-center"> <svg class="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>1020,40/-</span></div>
                </div>

                <p className=" rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 text-center">
                  Real Estate
                </p>

                {/* <p className="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    And many more...
                  </a>
                </h2>
                <p className="rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 ">
                  <svg className="w-6 h-6 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
