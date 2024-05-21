import React, { useState } from 'react';
import VendorNav from './VendorNav';
import { useNavigate } from 'react-router-dom';

const VendorEachLead = () => {
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowPopup(false);
    setShowWarningPopup(false);
    setStatus(''); // Reset the status to clear the select filter
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (selectedStatuses.includes(e.target.value)) {
      setShowWarningPopup(true);
    }
  };

  const handleUpdate = () => {
    if (status !== '') {
      setSelectedStatuses([...selectedStatuses, status]);
      setStatus('');
      setShowPopup(false);
    } else {
      // Handle case where no status is selected
    }
  };

  const deleteLead = () => {
    navigate('/all-leads');
  };

  return (
    <>
      <VendorNav />
      <div className=''>
        <div className='px-4 md:px-20 mt-10 bg-gray-50 rounded-lg shadow-md p-6'>
          <p className='text-xl mb-4'>Name: <span className="font-semibold">Zoya</span></p>
          <p className='text-xl mb-4'>Email: <span className="font-semibold">Zoya@123</span></p>
          <p className='text-xl mb-4'>Phone: <span className="font-semibold">45345345</span></p>
          <p className='text-xl mb-4'>Refered by : <span className='font-semibold'>ABC</span></p>
          <p className='text-xl mb-4'>Description: <span className="font-semibold">Passionate and driven professional seeking new challenges and growth opportunities. Experienced in  with a strong track record of Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey. Passionate and driven professional seeking new challenges and growth opportunities. Experienced in with a strong track record of  Eager to contribute valuable expertise and collaborate within a dynamic team environment. Ready to embark on the next exciting chapter in my career journey.</span></p>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <div className="flex items-center mb-2 sm:mb-0">
              <select className='px-4 py-2 border border-gray-400 rounded-md mr-2' value={status} onChange={handleStatusChange}>
                <option value="">Select</option>
                <option value="Prospecting">Prospecting</option>
                <option value="Approach">Approach</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closure">Closure</option>
              </select>
              <button className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md' onClick={handleUpdate}>Update</button>
            </div>
            <button className='px-4 py-2 bg-red-400 hover:bg-red-600 text-white rounded-md' onClick={() => setShowPopup(true)}>Reject</button>
          </div>
          {selectedStatuses.length > 0 && (
            <div className="bg-white shadow-md py-4 px-4 md:px-20 mt-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-center">Updation status:</h2>
              <ul className='flex flex-wrap justify-center'>
                {selectedStatuses.map((selectedStatus, index) => (
                  <li key={index} className="flex items-center mb-2 mr-6">
                    <svg className="h-6 w-6 text-green-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{selectedStatus}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showWarningPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className=' float-right -mt-4 -mr-4 cursor-pointer' onClick={handleClose}><svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-red-700">Warning!</h2>
            <p className="mb-4">You have already selected this status.</p>
            <div className="flex justify-end">
              {/* <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleClose}>Okk</button> */}
            </div>
          </div>
        </div>
      )}


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

export default VendorEachLead