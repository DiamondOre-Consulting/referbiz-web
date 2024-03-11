import React from 'react'

const AffTotalShortlisted = () => {
    return (
        <>
            <h1 className='text-center text-5xl font-bold mt-16 uppercase'> All Shortlisted candidates</h1>
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
                                Candidate Password
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Reffered By
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Zoya
                            </th>
                            <td class="px-6 py-4">
                                zoyas3423@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                398439473298
                            </td>
                            <td class="px-6 py-4">
                                <a href='' className='text-blue-600 underline'> veiw </a>
                            </td>
                            <td class="px-6 py-4">
                                Zoya
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AffTotalShortlisted