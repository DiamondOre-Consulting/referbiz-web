import React from 'react'
import CvSharing from '../CvShareForm/CvSharingAff'

const AffBody = () => {
  return (
    <section>
      <div className="w-max-auto flex flex-col items-center mt-10">
        <h2 className="text-4xl text-center sm:text-5xl md:text-6xl font-semibold text-gray-100 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 md:py-10">
          Refer More, Earn More
        </h2>
        <div>
            <CvSharing />
        </div>
      </div>
    </section>
  )
}

export default AffBody