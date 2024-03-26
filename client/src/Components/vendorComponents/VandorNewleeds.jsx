import React, { useState } from 'react'

const VandorNewleeds = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    const description ="Passionate and driven professional seeking new challenges and growth opportunities. Experienced in [relevant field/industry] with a strong track record of [key skills/accomplishments]. Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey."
    const shortenedDescription = isExpanded ? description : description.slice(0, 100) + '...';

    return (
        <>
            <h1 className='text-left font-bold text-3xl px-16 mb-8 pt-4 text-gray-900'> New Leeds</h1>
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
                        </div>

                    </div>

                </div>

                <div className='border border-1 rounded-md shadow-md flex justify-center items-center bg-white'>
                    <div className='p-4 flex justify-center items-center'>
                        
                        <p>And Many More</p>
                    </div>

                </div>
               
               
                

            </div>
        </>
    )
}

export default VandorNewleeds