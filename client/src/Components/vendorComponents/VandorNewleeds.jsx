import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const VandorNewleeds = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const handleClose = () => {
        setShowPopup(false);

    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const deleteLead = () => {
        navigate('/all-leads')
    }

    const description = "Passionate and driven professional seeking new challenges and growth opportunities. Experienced in [relevant field/industry] with a strong track record of [key skills/accomplishments]. Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey."
    const shortenedDescription = isExpanded ? description : description.slice(0, 100) + '...';

    return (
        <>
            <h1 className='text-left font-bold text-3xl px-16 mb-8 pt-4 text-gray-900'> New Leads</h1>
            <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8 px-4 lg:px-16'>
                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className='p-4'>
                        <div className=''>
                            <p>Zoya</p>
                            <p className='text-gray-600'>zoyas3423@gmail.com</p>
                            <p>3488347343</p>
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
                            <div className='flex justify-end'>
                                <Link className='px-4 py-2 bg-green-400 hover:bg-green-600 text-white mt-2 rounded-md' to={'/each-lead'}>Update</Link>
                                <button className='px-4 py-2 bg-red-400 hover:bg-red-600 text-white mt-2 rounded-md ml-2' onClick={() => { setShowPopup(true) }}>Reject</button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className='p-4'>
                        <div className=''>
                            <p>Zoya</p>
                            <p className='text-gray-600'>zoyas3423@gmail.com</p>
                            <p>3488347343</p>
                        </div>
                        <div className='border-t-2 border-gray-200 mt-2  '>
                            <p className="text-sm text-gray-500 md:mt-2 mt-2">
                                {isExpanded ? description : shortenedDescription}
                                <span
                                    onClick={toggleDescription}
                                    className="text-blue-900 font-bold cursor-pointer"
                                >
                                    {isExpanded ? ' Read less' : ' Read more'}
                                </span>
                            </p>
                            <div className='flex justify-end'>
                                <button className='px-4 py-2 bg-green-400 text-white mt-2 rounded-md'>Update</button>
                                <button className='px-4 py-2 bg-red-400 text-white mt-2 rounded-md ml-2'>Reject</button>
                            </div>
                        </div>

                    </div>

                </div>


                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className='p-4'>
                        <div className=''>
                            <p>Zoya</p>
                            <p className='text-gray-600'>zoyas3423@gmail.com</p>
                            <p>3488347343</p>
                        </div>
                        <div className='border-t-2 border-gray-200 mt-2 '>
                            <p className="text-sm border-0 text-gray-500 md:mt-2 mt-2">
                                {isExpanded ? description : shortenedDescription}
                                <span
                                    onClick={toggleDescription}
                                    className="text-blue-900 font-bold cursor-pointer"
                                >
                                    {isExpanded ? ' Read less' : ' Read more'}
                                </span>
                            </p>
                            <div className='flex justify-end'>
                                <button className='px-4 py-2 bg-green-400 text-white mt-2 rounded-md'>Update</button>
                                <button className='px-4 py-2 bg-red-400 text-white mt-2 rounded-md ml-2'>Reject</button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className='p-4'>
                        <div className=''>
                            <p>Zoya</p>
                            <p className='text-gray-600'>zoyas3423@gmail.com</p>
                            <p>3488347343</p>
                        </div>
                        <div className='border-t-2 border-gray-200 mt-2 '>
                            <p className="text-sm border-0 text-gray-500 md:mt-2 mt-2">
                                {isExpanded ? description : shortenedDescription}
                                <span
                                    onClick={toggleDescription}
                                    className="text-blue-900 font-bold cursor-pointer"
                                >
                                    {isExpanded ? ' Read less' : ' Read more'}
                                </span>
                            </p>
                            <div className='flex justify-end'>
                                <button className='px-4 py-2 bg-green-400 text-white mt-2 rounded-md'>Update</button>
                                <button className='px-4 py-2 bg-red-400 text-white mt-2 rounded-md ml-2'>Reject</button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className='p-4'>
                        <div className=''>
                            <p>Zoya</p>
                            <p className='text-gray-600'>zoyas3423@gmail.com</p>
                            <p>3488347343</p>
                        </div>
                        <div className='border-t-2 border-gray-200 mt-2 '>
                            <p className="text-sm border-0 text-gray-500 md:mt-2 mt-2">
                                {isExpanded ? description : shortenedDescription}
                                <span
                                    onClick={toggleDescription}
                                    className="text-blue-900 font-bold cursor-pointer"
                                >
                                    {isExpanded ? ' Read less' : ' Read more'}
                                </span>
                            </p>
                            <div className='flex justify-end'>
                                <button className='px-4 py-2 bg-green-400 text-white mt-2 rounded-md'>Update</button>
                                <button className='px-4 py-2 bg-red-400 text-white mt-2 rounded-md ml-2'>Reject</button>
                            </div>
                        </div>

                    </div>

                </div>

                <Link className='border border-1 rounded-md shadow-md flex justify-center items-center bg-white' to={'/all-leads'}>
                    <div className='p-4 flex justify-center items-center flex-col'>

                        <p className='font-semibold text-xl'>And Many More</p>
                        <p><svg class="h-16 w-16 text-blue-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" /></svg></p>
                    </div>

                </Link>


            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to reject this lead?</h2>
                        <div className="flex justify-end">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleClose}>No</button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={deleteLead}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default VandorNewleeds