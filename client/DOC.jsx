import React from 'react'

function DOC() {
  return (
    <div>

        {/* Navbar starts  */}     
                                        {/* Notes and reminders */}

        {/* Navbar Ends  */}




        
        {/* Employee of Month starts */}
        <div className="flex items-start">
            <div className="mx-auto flex gap-4">
            <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="aspect-square w-40 h-40 rounded-lg object-cover"
            />

            <div className='my-auto'>
                <h3 className="text-lg/tight font-medium text-gray-900">Name Comes here</h3>

                <p className="mt-0.5 text-gray-700">
                Employee of the Month
                </p>
            </div>
            </div>
        </div>
        {/* Employee of month ends  */}






        {/* Top 5 HRs starts */}
        

        <div style={{display: 'grid', gridTemplateColumns:'1fr 2fr'}}>
            <div className=''>

            </div>
            <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm ">
                <thead >
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Salary</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-center">
                <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                </tr>

                <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                </tr>

                <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                </tr>
                </tbody>
            </table>
        </div>


        {/* Top 5 HRs and Clients ends */}







        {/* Top 5 Clients tarts */}


        {/* Top 5 Clients ends */}







        {/* R*R employee starts  */}


        {/* R*R employee ends  */}






        {/* R*R interns starts  */}


        {/* R*R interns ends  */}




        {/* Joinings for week start  */}


        {/* Joinings for week ends  */}



    </div>
  )
}

export default DOC
