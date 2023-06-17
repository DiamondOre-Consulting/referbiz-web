import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-gray-900 text-white h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            ReferBiz
            {/* <span className="sm:block"> Make Yourself Count </span> */}
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Gamify your work here and earn rewards with it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to={"/auth"}
            >
              Get Started as Affiliate
            </Link>

            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to={"/"}
            >
              Get Started as Associate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
