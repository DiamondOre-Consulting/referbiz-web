import React from 'react';
import RB_LOGO from "../../assets/RB_100_New.png";
import Logo from '../AffDashComponents/Referbiz.png'

const AffFooter = () => {
    // Uploaded Affiliate Model PDF at Tebi website
    const onButtonClick = () => {
      const pdfUrl = "https://s3.tebi.io/modelspdf/Affiliate%20model.docx";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "AffiliateModel.pdf"; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };
  return (
    <footer className="bg-gray-100">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="flex justify-center text-5xl">
      <h2 className='text-gray-800'><img className="w-1/2 mx-auto" src={RB_LOGO} alt="" /></h2>
    </div>

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
      Bas Refer Karo, Phal Ki Chinta Mat karo
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href='https://referbiz.in/'
              target='_blank'
              rel='noopener noreferrer'>
          About
        </a>
      </li>

      <li>
        <a className="cursor-pointer text-gray-700 transition hover:text-gray-700/75" onClick={onButtonClick}>
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
        <a className="text-gray-700 transition hover:text-gray-700/75" href="/FAQ">
          FAQ
        </a>
      </li>
    </ul>

  </div>
</footer>
  )
}

export default AffFooter