import React, { useState } from 'react'

const VandorTopAffi = () => {
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [email, setEmail] = useState('zoyas3423@gmail.com');
    const [phone, setPhone] = useState('934890348232');
    return (
        <>
            <h1 className='text-left font-bold text-3xl px-16 mb-8 pt-4 text-gray-900'>Top Affiliates</h1>
            <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8 px-4 lg:px-16 pb-10'>
                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className=''>
                        <div className='flex justify-between items-center p-4'>
                            <div>
                                <p>Hania Amir</p>
                                <p className='text-gray-600'>Regional Paradigm Technician</p>
                            </div>
                            <div>
                                <div className='border rounded-full'>
                                    <img className='h-16 w-16 rounded-full' src="https://img.freepik.com/premium-photo/close-up-portrait-cheerful-glamour-girl-with-cute-make-up-smiling-white-teeth-looking-happy_1258-50084.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 text-center place-content-center place-items-center items-center content-center !px-0'>
                            <div className='w-full border-t-2 border-r-2 border-gray-200 p-2 flex justify-center cursor-pointer' onMouseEnter={() => setShowEmail(true)}
                                onMouseLeave={() => setShowEmail(false)}> 
                                {!showEmail && ( // Inverted logic
                                    <div className='text-center flex'>
                                           <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg><p>Email</p>
                                    </div>
                                )}
                        
                                {showEmail && (
                                    <div className='text-center'>
                                        <p>{email}</p>
                                    </div>
                                )}</div>
                            <div className='w-full border-t-2 border-gray-200 p-2 flex flex justify-center cursor-pointer' onMouseEnter={() => setShowPhone(true)}
                                onMouseLeave={() => setShowPhone(false)}> 
                                  {!showPhone && ( // Inverted logic
                                    <div className='text-center flex'>
                                           <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg><p>Phone</p>
                                    </div>
                                )}
                            
                                {showPhone && (
                                    <div className='text-center'>
                                        <p>{phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>


                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className=''>
                        <div className='flex justify-between items-center p-4'>
                            <div>
                                <p>Hania Amir</p>
                                <p className='text-gray-600'>Regional Paradigm Technician</p>
                            </div>
                            <div>
                                <div className='border rounded-full'>
                                    <img className='h-16 w-16 rounded-full' src="https://img.freepik.com/premium-photo/close-up-portrait-cheerful-glamour-girl-with-cute-make-up-smiling-white-teeth-looking-happy_1258-50084.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 text-center place-content-center place-items-center items-center content-center !px-0'>
                            <div className='w-full border-t-2 border-r-2 border-gray-200 p-2 flex justify-center'> <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg><p>Email</p></div>
                            <div className='w-full border-t-2 border-gray-200 p-2 flex flex justify-center'> <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg><p>Phone</p></div>
                        </div>

                    </div>

                </div>

                <div className='border border-1 rounded-md shadow-md  bg-white'>
                    <div className=''>
                        <div className='flex justify-between items-center p-4'>
                            <div>
                                <p>Hania Amir</p>
                                <p className='text-gray-600'>Regional Paradigm Technician</p>
                            </div>
                            <div>
                                <div className='border rounded-full'>
                                    <img className='h-16 w-16 rounded-full' src="https://img.freepik.com/premium-photo/close-up-portrait-cheerful-glamour-girl-with-cute-make-up-smiling-white-teeth-looking-happy_1258-50084.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 text-center place-content-center place-items-center items-center content-center !px-0'>
                            <div className='w-full border-t-2 border-r-2 border-gray-200 p-2 flex justify-center'> <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg><p>Email</p></div>
                            <div className='w-full border-t-2 border-gray-200 p-2 flex flex justify-center'> <svg class="h-6 w-6 text-gray-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg><p>Phone</p></div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default VandorTopAffi