import React, { useState } from 'react';

const PopupCard = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${showPopup ? 'visible' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Welcome to <span className='text-indigo-600'>ReferBiz</span></h2>
        <p className="mb-4">In this PopUp Card you will find important instructions regarding your onboarding.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupCard;
