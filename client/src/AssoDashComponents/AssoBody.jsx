import React from 'react'
import CvSharingAsso from '../Components/CvShareForm/CvSharingAsso';

const AssoBody = () => {
  return (
    <section>
      <div className="w-max-auto flex flex-col items-center mt-10">
        <h2 className="text-6xl font-semibold text-gray-100 px-10 py-10">
          Refer More, Earn More
        </h2>
        <div>
            <CvSharingAsso />
        </div>
      </div>
    </section>
  )
}

export default AssoBody;