import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VendorNav from './VendorNav';

const EachVendoraffi = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const description = "Passionate and driven professional seeking new challenges and growth opportunities. Experienced in [relevant field/industry] with a strong track record of [key skills/accomplishments]. Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey.";
    const shortenedDescription = isExpanded ? description : description.slice(0, 100) + '...';



    return (
        <>
            <VendorNav/>
            <div className="container mx-auto p-4 ">
                {/* Profile Info */}
                <div className="my-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center">
                            <div className="mr-4">
                                {/* Profile Image */}
                                <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="Profile" className="h-24 w-24 rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">John Doe</h3>
                                <p className="text-gray-600">john@example.com</p>
                                <p className="text-gray-600">123-456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Sections */}
                <div className="my-8">
                    <h2 className="text-xl font-semibold mb-4">All Leads</h2>
                    <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
                        <div className='border border-1 rounded-md shadow-md  bg-white'>
                            <div className='p-4'>
                                <div>
                                    <p>Zoya</p>
                                    <p className='text-gray-600'>Zoya@1223</p>
                                    <p>87899798998</p>
                                </div>
                                <div className='border-t-2 border-gray-200 mt-2 '>
                                    <p className="text-sm text-gray-500 md:mt-2 mt-2">
                                        {isExpanded ? description : shortenedDescription}
                                        <span
                                            onClick={toggleDescription}
                                            className="text-blue-900 font-bold cursor-pointer"
                                        >
                                            {isExpanded ? ' Read less' : ' Read more'}
                                        </span>
                                    </p>
                                    {/* <div className='flex justify-end'>
                                    <Link className='px-4 py-2 bg-green-400 hover:bg-green-600 text-white mt-2 rounded-md' to={'/each-lead'}>Update</Link>
                                    <button className='px-4 py-2 bg-red-400 hover:bg-red-600 text-white mt-2 rounded-md ml-2'>Reject</button>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EachVendoraffi