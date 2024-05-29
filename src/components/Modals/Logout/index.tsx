import React, { useEffect } from 'react';
import ImageComponent from '@/components/ImageComponent';
import Button from '@/components/Button';
import { useGetLogoutQuery } from '@/redux/services/Auth/authApi';
import Cookies from "js-cookie"
import { useRouter } from 'next/router';

const Logout = ({handleToggle}) => {

  const router=useRouter();
  const {data }= useGetLogoutQuery();

  // console.log(getLogout,"getLogout")

  const logout=()=>{
  if(data?.message == "User Logged out"){
    Cookies.remove("token");
    router.push("/login")
  }
}



  return (
    <div className='w-full h-full fixed top-0 left-0 grid place-items-center bg-black bg-opacity-80 z-40'>
      <div className='bg-white rounded grid place-items-center p-5'>
        <ImageComponent img="images/logout.png" />
        <h1 className=' font-bold'>Logout</h1>
        <p className=' font-semibold'>Are you sure you want to logout?</p>
        <div className='flex justify-between gap-5 mt-4'>
          <Button text="No" classname="border border-primary px-5 py-1 hover:bg-primary hover:text-white text-primary font-semibold" onclick={handleToggle} />
          <Button text="Yes" classname="border border-primary px-5 py-1 hover:bg-white hover:text-primary bg-primary text-white font-semibold" onclick={logout} />
        </div>
      </div>
    </div>
  );
}

export default Logout;
