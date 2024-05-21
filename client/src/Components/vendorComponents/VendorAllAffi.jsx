import React, { useState } from 'react';
import VendorNav from './VendorNav';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';

const VendorAllAffi = () => {
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const vendorAffiPerPage = 4;
    const latestaffi = [
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284",
            img: "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg"
        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584",
            img: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
        },
        {
            name: "shifa",
            email: "zoyas3423@gmai.com",
            phone: "3894893284",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        },
        {
            name: "Hamd",
            email: "Saniya3423@gmai.com",
            phone: "389443584",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        },
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        },
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"

        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584",
            img: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        },

        // Add more affis here
    ];


    const pagesVisited = pageNumber * vendorAffiPerPage;
    const pageCount = Math.ceil(latestaffi.length / vendorAffiPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <>
            <VendorNav />
            <div>
                <h1 className='mx-auto text-center text-3xl mt-2 mb-4 font-bold'>All Affiliates</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 px-6 md:px-16 sm:px-10">
                {latestaffi
                    .slice(pagesVisited, pagesVisited + vendorAffiPerPage)
                    .map((affi, index) => (
                        <div key={index} className='border border-1 rounded-md shadow-md  bg-white'>
                            <Link to={'/vendor/each-affi'} className=''>
                                <div className='flex justify-between items-center p-4'>
                                    <div>
                                        <div className="flex gap-0.5 text-yellow-500">
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>

                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>
                                        </div>
                                        <p>{affi?.name}</p>


                                    </div>
                                    <div>
                                        <div className='border rounded-full'>
                                            <img className='h-16 w-16 rounded-full' src={affi?.img} />
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
                                            <div className='text-center '>
                                                <p className='text-sm text-wrap px-2'>{affi?.email}</p>
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
                                                <p>{affi?.phone}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </Link>

                        </div>
                    ))}
            </div>

            <div className="flex justify-center items-center mt-8">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination flex justify-center mt-8 gap-0 md:gap-2 shadow-lg px-10 py-4 "}
                    previousLinkClassName={"pagination__link border border-gray-300 bg-gray-400 text-black rounded-l px-2 py-1 md:px-4 md:py-2  "}
                    nextLinkClassName={"pagination__link  rounded-r bg-blue-950 text-white px-2 py-1 md:px-4 md:py-2 "}
                    disabledClassName={"pagination__link--disabled opacity-50"}
                    activeClassName={"pagination__link--active bg-blue-500 text-white"}
                    pageLinkClassName={"pagination__link border border-gray-300  px-1 py-1 md:px-3 md:py-1"}
                />
            </div>
        </>
    )
}

export default VendorAllAffi