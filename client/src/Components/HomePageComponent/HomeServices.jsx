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
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-left text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              What RB Offers?
            </h2>

            <p class="max-w-screen-md text-left text-gray-500 md:text-lg">
              Explore our comprehensive suite of personalized services, each
              crafted to elevate your career and open doors to new
              opportunities, ensuring your success in today's competitive
              landscape.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border bg-white">
              <a
                href={'/services#affiliateModel'}
                class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={AffiliateServicePic}
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#affiliateModel'}
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Affiliate Model: The Refer & Earn Club (Lead Based)
                  </Link>
                </h2>

                <p class="mb-8 text-gray-500">
                  Introducing "Refer & Earn Club" – where you wield the power of
                  connections to earn rewards. Share freely, prosper together.
                  Join the revolution!
                </p>
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border bg-white">
              <a
                href={'/services#associateModel'}
                class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={AssociateServicePic}
                  loading="lazy"
                  alt="Photo by Lorenzo Herrera"
                  class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#associateModel'}
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Associate Model: The Pro Partnership (Time Based)
                  </Link>
                </h2>

                <p class="mb-8 text-gray-500">
                  Presenting "Pro Partnership," where users become esteemed
                  associates, partnering with our experts as mentors, unlocking
                  opportunities, and earning as valued collaborators.
                </p>
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border bg-white">
              <a
                href={'/services#resumeBuilding'}
                class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src={Employees}
                  loading="lazy"
                  alt="Image by standret on Freepik"
                  class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#resumeBuilding'}
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Employee Model: The Dedicated Team (Time & Lead Based)
                  </Link>
                </h2>

                <p class="mb-8 text-gray-500">
                  With the help of our "Employee Model" you are gonna unleash your potential market with the dedicated team helping with their leads and time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-left text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Our Vendor Partners
            </h2>

            <p class="max-w-screen-md text-left text-gray-500 md:text-lg">
              We have onboarded many vendors from different domains to be the partner of this fun way of lead generation. Refer and Earn for everyone. 
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <Link
                    to={'/services#resumeBuilding'}
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    CV Crafters
                  </Link>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    Service Based
                </p>

                {/* <p class="mb-8 text-gray-500">
                  CV Crafters is our prominent partner vendor who help you sculpt your career story into a
                  masterpiece, making your resume your strongest advocate. 
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Intern Linker
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    Job Consultancy
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    AgroBiz
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    FMCG Commodities
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Dimaond Ore Consulting 
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    SME
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    SwiftLane Motors
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    Automobile Dealers
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Midas Finserve
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    Financial Products
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border bg-gray-100 hover:shadow-lg">
              <div class="flex flex-1 flex-col p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Oasis Homes
                  </a>
                </h2>

                <p class="w-1/2 rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200">
                    Real Estate
                </p>

                {/* <p class="mb-8 text-gray-500">
                  Intern Linker bridges the gap between aspiring interns and
                  forward-thinking providers. Share your resume or share your
                  internship needs with them today to unlock your brightest future.
                </p> */}
              </div>
            </div>

            <div class="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg border">
              <div class="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                <h2 class="mb-2 text-2xl font-semibold text-gray-800">
                  <a
                    href="#"
                    class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    And many more...
                  </a>
                </h2>
                <p class="rounded-md bg-indigo-500 px-2 py-1 text-sm font-semibold text-gray-200 ">
                  <svg className="w-6 h-6 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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
