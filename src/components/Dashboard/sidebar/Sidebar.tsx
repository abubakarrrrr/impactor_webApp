import React, { useState } from 'react'
import { sidebar_data } from './Sidebar_data';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '@/redux/services/Auth/authApi';




const Sidebar_ui = () => {
  const { data: userProfileData, error, isLoading } = useGetUserProfileQuery();

  // console.log(userProfileData.data.email,"dataaa")
  
  
const UserData = useSelector((state: any) => state?.authData?.user);

// console.log(UserData, " userData")
    
  const router =useRouter();

 

  const handleClick = ()=>{
    router.push("/profile")
  }

  return (
    <div className=' w-full'>
      
                <div className=' shadow w-full border lg:hidden'>
                  <img src="images/small-logo.svg" alt="small-logo" className='lg:hidden p-3   ' />
                  </div>
                  
                  <div className='w-[95%] mt-5 lg:mt-24 m-auto'>
                    
      <div className='relative' onClick={handleClick}>
        

        <div className=' w-full   flex'>
        <img
          src={userProfileData ? userProfileData.data.profileImage.location : " images/noPic.svg"}
          alt="Selected"
          className='w-12 h-12  rounded-full object-cover '
        />

        <h1 className='   text-[13px]  cursor-pointer overflow-auto  overflow-hidden mt-1  ml-2 font-semibold'>{userProfileData ? userProfileData.data.userName :" "}
        <br />
        <span className='cursor-pointer font-semibold text-[11px] overflow-auto text-primary overflow-hidden  '>{userProfileData ? userProfileData.data.email :" "}</span>
                 </h1>

        </div>
      </div>

    </div>



      <div className='w-[90%] m-auto mt-7'>
        {sidebar_data.map((menuData, index) => (
          <div key={index} className='mb-4'>
            <h1 className='text-danger font-bold'>{menuData.menu}</h1>
            <hr className=' bg-gray-200 h-[1px]' />
            
            {menuData.navigation.map((navItem, navIndex) => (
              <Link href={navItem.href}>

              <div key={navIndex} 
               className={`flex items-center mt-4 hover:px-2 hover:py-1  hover:text-white hover:bg-primary hover:rounded  px-2 py-1 ${router.pathname === navItem.href ?
                '  bg-primary px-2 py-1   rounded' :
                 " " } `}>

                <h1 className={` mx-2 text-danger hover:text-white  ${router.pathname === navItem.href ? ' text-white ' : "  " } `}>
                  {navItem.icon}
                </h1>
                <h1 className={` font-bold hover:text-white ${router.pathname === navItem.href ? '  text-white' : " text-primary " } `}>{navItem.nav}</h1>
              </div>
              </Link>
            ))}
            
          </div>
          
        ))}
      </div>

      <div className=' absolute bottom-0 text-center  p-3 lg:hidden'>
      <img src="images/small-logo.svg" alt="small-logo" className='' />
      </div>
    </div>
  )
}

export default Sidebar_ui
