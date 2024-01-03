import React from 'react';
// import Logo from '../AffDashComponents/Referbiz.png'
import RB_LOGO from '../../assets/RB_100_New.png'

const AssoFooter = () => {
  return (
    <footer className="bg-gray-100">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="flex justify-center text-5xl">
      {/* <h2 className='text-gray-800'>Refer<span className='text-indigo-700'>Biz</span></h2> */}
      <img src={RB_LOGO} alt="Logo Here" />
    </div>

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
      Bas Refer Karo, Phal Ki Chinta Mat karo
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
          About
        </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
          Instructions
        </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
          Join Us
        </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
          Help
        </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/">
          FAQ
        </a>
      </li>
    </ul>

  </div>
</footer>
  )
}

export default AssoFooter;