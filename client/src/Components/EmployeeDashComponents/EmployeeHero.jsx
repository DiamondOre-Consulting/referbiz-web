import React, {useState, useEffect} from "react";
import { useJwt } from "react-jwt";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Wave from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/wave.png";
import Forward from "C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/client/src/assets/fast-forward.png";

const EmployeeHero = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { decodedToken } = useJwt(localStorage.getItem("token"));

  const userName = decodedToken ? decodedToken.EmpName : "No Name Found";

  return (
    <section>
      <div className="w-max-auto flex items-center">
        <h2 className="text-6xl font-semibold text-gray-100 px-10 py-10">
          Welcome, {userName}
        </h2>
        <img className="w-[4rem] h-[4rem]" src={Wave} alt="waving" />
      </div>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-md px-4 md:px-8">
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:gap-4"> */}
            <Link to={'/my-associates'} className="flex items-center justify-center cursor-pointer rounded-lg gap-3 bg-gray-100 p-4 lg:p-8 hover:bg-gray-300 hover:gap-5">
              <div className="text-sm font-semibold sm:text-base">
                Check Associates Activities
              </div>
              <img className="w-4 h-4" src={Forward} alt="click to go" />
            </Link>
        </div>
      </div>
    </section>  
  );
};

export default EmployeeHero;
