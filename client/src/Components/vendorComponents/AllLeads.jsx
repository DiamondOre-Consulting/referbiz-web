import React, { useState } from 'react';
import VendorNav from './VendorNav';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import VendorFooter from './VendorFooter';


const AllLeads = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const leadsPerPage = 4;
    const latestleads = [
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284"
        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584"
        },
        {
            name: "shifa",
            email: "zoyas3423@gmai.com",
            phone: "3894893284"
        },
        {
            name: "Hamd",
            email: "Saniya3423@gmai.com",
            phone: "389443584"
        },
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284"
        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584"
        },
        {
            name: "Zoya",
            email: "zoyas3423@gmai.com",
            phone: "3894893284"
        },
        {
            name: "Saniya",
            email: "Saniya3423@gmai.com",
            phone: "389443584"
        },

        // Add more leads here
    ];

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const description = "Passionate and driven professional seeking new challenges and growth opportunities. Experienced in [relevant field/industry] with a strong track record of [key skills/accomplishments]. Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey.";
    const shortenedDescription = isExpanded ? description : description.slice(0, 100) + '...';

    const pagesVisited = pageNumber * leadsPerPage;
    const pageCount = Math.ceil(latestleads.length / leadsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleClose = () => {
        setShowPopup(false);
      };

      
  const deleteLead = () => {
    navigate('/all-leads');
  };

    return (
        <>
            <VendorNav />
            <div>
                <h1 className='mx-auto text-center text-3xl mt-2 mb-4 font-bold'>All Leads</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 px-6 md:px-16 sm:px-10">
                {latestleads
                    .slice(pagesVisited, pagesVisited + leadsPerPage)
                    .map((lead, index) => (
                        <div key={index} className='border border-1 rounded-md shadow-md  bg-white'>
                            <div className='p-4'>
                                <div>
                                    <p>{lead.name}</p>
                                    <p className='text-gray-600'>{lead.email}</p>
                                    <p>{lead.phone}</p>
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
                                        <button className='px-4 py-2 bg-red-400 hover:bg-red-600 text-white mt-2 rounded-md ml-2' onClick={() => setShowPopup(true)}>Reject</button>
                                    </div>
                                </div>
                            </div>
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
            <VendorFooter/>
        </>
    );
}

export default AllLeads;
