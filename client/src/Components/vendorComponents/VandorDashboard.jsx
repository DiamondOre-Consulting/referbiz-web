import React from 'react'
import VendorNav from './VendorNav'
import VendorsHero from './VendorsHero'
import VandorNewleeds from './VandorNewleeds'
import VandorTopAffi from './VandorTopAffi'


const VandorDashboard = () => {
  return (
    <>

      <VendorNav />
      
      <VendorsHero />
      <div className='bg-gray-100'>
      <VandorNewleeds/>
     <VandorTopAffi/>
      </div>
      
    </>

  )
}

export default VandorDashboard