import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from "react-jwt";

const TopLists = () => {
  const navigate = useNavigate();

  const { decodedToken } = useJwt(localStorage.getItem('token'));

  const userEmail = decodedToken ? decodedToken.name : "No Name Found";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token found, redirect to login page
      navigate('/AssoLogin');
    } else {
      const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

      if (tokenExpiration && tokenExpiration < Date.now()) {
        // Token expired, remove from local storage and redirect to login page
        localStorage.removeItem('token');
        navigate('/AssoLogin');
      }
    }
  }, [decodedToken, navigate]);


  return (
    // <div className="w-[50%] flex justify-center rounded-lg border border-gray-200 dark:border-gray-700">
    //   <table className=" divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
    //     <thead className="ltr:text-left rtl:text-right">
    //       <tr>
    //         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Name
    //         </th>
    //         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Date of Birth
    //         </th>
    //         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Role
    //         </th>
    //         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Salary
    //         </th>
    //       </tr>
    //     </thead>

    //     <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    //       <tr>
    //         <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           John Doe
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           24/05/1995
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           Web Developer
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           $120,000
    //         </td>
    //       </tr>

    //       <tr className="[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:py-2">
    //         <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Jane Doe
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           04/11/1980
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           Web Designer
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           $100,000
    //         </td>
    //       </tr>

    //       <tr className="[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:py-2">
    //         <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
    //           Gary Barlow
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           24/05/1995
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           Singer
    //         </td>
    //         <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
    //           $20,000
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
    <div className="mx-auto max-w-full-3xl max-h-screen-3xl px-4 py-16 sm:px-6 lg:px-8 bg-gray-100">
      <h2 className="text-4xl font-semibold flex justify-center">Top Lists</h2>
      <div className="flex justify-center flex-col items-center px-5 py-5 mt-6">
        <h3 className="text-2xl font-semibold px-4 py-3 rounded-md text-gray-800 bg-indigo-300">Top HRs (DIRECT CHANNEL)</h3>
        <table className="mt-5 bg-gray-300 rounded-md">
        <thead className="">
          <tr>
            <th className="px-5 text-xl text-gray-800">Name</th>
            <th className="px-5 text-xl text-gray-800">Company Name</th>
            <th className="px-5 text-xl text-gray-800">Total Joining</th>
            <th className="px-5 text-xl text-gray-800">Conversion Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="flex justify-center flex-col items-center px-5 py-5 mt-6">
        <h3 className="text-2xl font-semibold px-4 py-3 rounded-md text-gray-800 bg-indigo-300">Top Recruiters (DIRECT CHANNEL)</h3>
        <table className="mt-5 bg-gray-300 rounded-md">
        <thead className="">
          <tr>
            <th className="px-5 text-xl text-gray-800">Name</th>
            <th className="px-5 text-xl text-gray-800">Company Name</th>
            <th className="px-5 text-xl text-gray-800">Total Joining</th>
            <th className="px-5 text-xl text-gray-800">Conversion Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="flex justify-center flex-col items-center px-5 py-5 mt-6">
        <h3 className="text-2xl font-semibold px-4 py-3 rounded-md text-gray-800 bg-indigo-300">Top Interns (DIRECT CHANNEL)</h3>
        <table className="mt-5 bg-gray-300 rounded-md">
        <thead className="">
          <tr>
            <th className="px-5 text-xl text-gray-800">Name</th>
            <th className="px-5 text-xl text-gray-800">Company Name</th>
            <th className="px-5 text-xl text-gray-800">Total Joining</th>
            <th className="px-5 text-xl text-gray-800">Conversion Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="flex justify-center flex-col items-center px-5 py-5 mt-6">
        <h3 className="text-2xl font-semibold px-4 py-3 rounded-md text-gray-800 bg-indigo-300">No. Of References Turned Into Joining</h3>
        <table className="mt-5 bg-gray-300 rounded-md">
        <thead className="">
          <tr>
            <th className="px-5 text-xl text-gray-800">Name</th>
            <th className="px-5 text-xl text-gray-800">Company Name</th>
            <th className="px-5 text-xl text-gray-800">Total Joining</th>
            <th className="px-5 text-xl text-gray-800">Conversion Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
          <tr>
            <td className="px-5">Hemant Kumar</td>
            <td className="px-5">Aviva India</td>
            <td className="px-5">1</td>
            <td className="px-5">--</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TopLists;
