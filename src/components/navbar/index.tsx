import React from 'react'
import { Icons } from '@/icons'


const Navbar = () => {
  return (
    <div className=' w-full fixed top-0 py-3   border'> 
    <div className='flex  w-[95%] m-auto   justify-between'>
         
        <div className=''>
            <img src="images/small-logo.svg" alt="small-logo" className='lg:hidden' />
        </div>
        <div className='flex justify-center mt-2 w-[30%]'>
            <p className=' text-[14px] mt-2 px-2  text-primary'>Charity wallet 12,461 PKR </p>
            <div className=' flex bg-danger text-center px-3 py-1 '>
            <img src={Icons.charityButton} alt="charity-button" className='w-[17%] ' />
            <button className=' text-[13px] text-white ml-1'>Add funds</button>
            </div>
            <img src={Icons.Notification} alt="notification" className='px-2' />
            <img src={Icons.setttings} className='' alt="setting" />
        </div>
        </div>
    </div>
  )
}

export default Navbar
