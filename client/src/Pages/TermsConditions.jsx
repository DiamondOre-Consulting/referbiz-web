import React from 'react';
import Navbar from '../Components/HomePageComponent/Navbar';
import HomeFooter from '../Components/HomePageComponent/HomeFooter';

const boxesData = [
  {
    subheading: 'Acceptance of Terms',
    content: `By accessing or using our platform, you acknowledge and agree to be bound by the following terms and conditions. These terms constitute a legally binding agreement between you and ReferBiz, governing your use of our services. It is important to carefully read and understand these terms before proceeding.

    Your use of ReferBiz signifies your acceptance of this agreement, including any future updates or modifications. You acknowledge that your continued use of the platform following the posting of changes to these terms constitutes acceptance of those changes.
    
    You must be at least 18 years of age or have reached the legal age of majority in your jurisdiction to use ReferBiz. If you are under the age of 18, you may only use the platform under the supervision of a parent or legal guardian who agrees to be bound by these terms.
    `,
  },
  {
    subheading: 'User Responsibilities',
    content: `Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must provide accurate and complete information when registering on ReferBiz. `,
  },
  {
    subheading: 'Affiliate Model',
    content: `Our Affiliate Model revolutionizes traditional networking by empowering users to leverage their connections for both personal and professional gain. Through our platform, individuals can seamlessly refer qualified candidates to exciting job opportunities within our extensive network of employers. Affiliates not only play a pivotal role in facilitating successful candidate placements but also earn lucrative incentives for their contributions. This model transcends conventional referral programs, offering users a dynamic avenue to expand their networks, enhance their earning potential, and cultivate rewarding professional relationships. Join our Affiliate Model today and embark on a journey of limitless possibilities, where every referral is a step towards personal growth and financial success.`,
  },
  {
    subheading: 'Incentives and Rewards',
    content: `Incentives earned by affiliates are subject to the terms and conditions specified by ReferBiz. The platform reserves the right to modify or terminate incentive programs at any time without prior notice.`
  }
  // Add more objects for additional boxes
];

const TermsAndConditions = () => {
  return (
    <div>
        
        {/* Navbar Starts */}
        <Navbar/>
        {/* Navbar Ends */}

        <div className="container" style={{ maxWidth: '1200px', margin: '0px auto 0px'}}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize:'50px', fontWeight:'bold'}} className='font-serif'>Tearms and Condition</h1>
        </div>
        {boxesData.map((box, index) => (
            <div key={index} className="container" style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
            <div className="terms-content shadow-xl shadow-gray-200" style={{ backgroundColor: 'white', borderRadius: '5px', padding: '23px' }}>
                <h2 className="subheading" style={{ marginBottom: '10px', color: '#888', fontSize:'24px'}}>{box.subheading}</h2>
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
