import React, { useEffect, useState } from 'react'
import { useJwt } from "react-jwt";
import axios from "axios";
import AffNav from './AffNav';
import AffFooter from './AffFooter';

const AffTotalReferal = () => {

    const [afftototalref, setAffTotalRef] = useState([]);
    const { decodedToken } = useJwt(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login"); // Redirect to login page if not authenticated
        return;
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // No token found, redirect to login page
            navigate("/login");
        }

        const fetchAllReferal = async () => {
            try {
                // Make a GET request to retrieve the user data
                const response = await axios.get('https://api.referbiz.in/api/candidates/my-refs', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); // Replace '/api/user' with the appropriate endpoint

                if (response.status === 200) {

                    setAffTotalRef(response.data);
                    console.log("all ref", response.data)

                }

            } catch (error) {
                console.error("error in finding refferels", error);
            }
        };

        fetchAllReferal();
    }, []);
    return (
        <>
            <AffNav />
            <h1 className='text-center text-5xl font-bold mt-16'> Total Referrals</h1>
            <div class="relative overflow-x-auto px-0 sm:px-0 lg:px-16 md:px-0 my-12">
                <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-50 uppercase bg-gray-700 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Candidate Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Candidate Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Candidate Phone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Candidate Resume
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            afftototalref.map((ref) => {
                                return (
                                    <tr class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {ref.refName}
                                        </th>
                                        <td class="px-6 py-4">
                                            {ref.refUniqueEmailId}
                                        </td>
                                        <td class="px-6 py-4">
                                            {ref.refPhone}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href={ref.PDF} target="_blank" className='text-blue-600 underline'> veiw </a>
                                        </td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
            <AffFooter />
        </>
    )
}

export default AffTotalReferal