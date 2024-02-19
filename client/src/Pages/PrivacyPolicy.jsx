import React from 'react';
import Navbar from '../Components/HomePageComponent/Navbar';
import HomeFooter from '../Components/HomePageComponent/HomeFooter';

const boxesData = [
  {
    subheading: 'Information Collection',
    content: `We may collect personal information such as your name, email address, and contact details when you register as an affiliate on our platform. Additionally, we may gather data on your referral activities and network growth.`,
  },
  {
    subheading: 'Data Usage',
    content: `Your personal information is used to facilitate your participation in our Affiliate Model program. We utilize your data to connect you with relevant job opportunities and track your referral performance. We may also use aggregated data for analytical purposes to improve our services. `,
  },
  {
    subheading: 'Data Security',
    content: `We employ industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely and accessible only to authorized personnel.`,
  },
  {
    subheading: 'Third-party Disclosure',
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to fulfill contractual obligations related to our services.`
  }
  // Add more objects for additional boxes
];

const TermsAndConditions = () => {
  return (
    <div>

        {/* Navbar Starts  */}
          <Navbar/>
        {/* Navbar Ends  */}

        <div className="container" style={{ maxWidth: '1200px', margin: '0px auto 0px'}}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize:'50px', fontWeight:'bold'}} className='font-serif'>Privacy Policy</h1>
        </div>
        {boxesData.map((box, index) => (
            <div key={index} className="container" style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
            <div className="terms-content shadow-xl shadow-gray-200" style={{ backgroundColor: 'white', borderRadius: '5px', padding: '23px' }}>
                <h2 className="subheading" style={{ marginBottom: '10px', color: '#888', fontSize:'30px'}}>{box.subheading}</h2>
                <p className="paragraph" style={{ lineHeight: '1.6', fontSize:'16px', whiteSpace:'pre-line'}}>{box.content}</p>
            </div>
            </div>
        ))}

        {/* Footer Starts  */}
          <HomeFooter/>
        {/* Footer Ends  */}
    </div>
  );
};

export default TermsAndConditions;
