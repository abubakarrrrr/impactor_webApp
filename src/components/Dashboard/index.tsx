
import Sidebar_ui from './sidebar/Sidebar';
import React, { useState } from 'react';
import { Icons } from '@/icons';
import { BiMenu } from 'react-icons/bi';
import CloseIcon from '@mui/icons-material/Close';
import ImageComponent from '@/components/ImageComponent';
import { useRouter } from 'next/router';
import { useGetUserProfileQuery, useGetImpactorFoortprintQuery } from '@/redux/services/Auth/authApi';

const Dashboard = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const {data: userdata, error, isLoading}= useGetUserProfileQuery();
  // const {data: getImpactorFoortprint}= useGetImpactorFoortprintQuery();

  // console.log(getImpactorFoortprint, "getImpactorFoortprint")
  

  const menuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  
  return (
    <div className='relative'>

      {/* #########Responsive Sidebar############################# */}
      {toggleMenu && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-2/3 h-screen bg-white" onClick={menuToggle}>
            <Sidebar_ui />
          </div>
          <div className="w-1/3 h-screen bg-black opacity-50" onClick={menuToggle}></div>
          <div className="absolute top-5 right-5 text-white text-4xl" onClick={menuToggle}>
            <CloseIcon />
          </div>
        </div>
      )}

      {/* #########Navbar############################# */}
      <nav className={`w-full py-4 bg-white shadow border top-0  z-10 fixed`}>
        <div className="flex w-[95%] m-auto justify-between">
          <div className="flex items-center">
            <BiMenu className="text-4xl lg:hidden" onClick={menuToggle} />
            <img src="images/small-logo.svg" alt="small-logo" className="lg:hidden ml-2" />
            
            <img
        src="images/new-logo.png"
        alt="logo"
        className=' left-0 py-3 fixed lg:flex hidden  w-[15%] shadow-md    '
      />
          </div>
          <div className="flex items-center space-x-2 float-right lg:w-[30%]">
            <p className="text-[9px] lg:text-[14px] text-primary">
              Charity wallet     {userdata ? userdata.data.totalAmount :  " "}  PKR</p>
            <div className="flex bg-danger text-center px-3 py-1">
              <img src={Icons.charityButton} alt="charity-button" className="w-[15%]" />
              <button className="text-[13px] text-white ml-1">Add funds</button>
            </div>
            <img src={Icons.Notification} alt="notification" className="px-2" />

            <img src={Icons.setttings} alt="setting" onClick={()=>router.push("/settings")} />
          </div>
        </div>
      </nav>

      {/* #############Sidebar########################## */}
      <div className='fixed top-0 left-0 hidden lg:flex border bg-white h-screen w-[15%]'>
        <Sidebar_ui />
      </div>

      {/* ##################Footer #################### */}
      <footer className='fixed bottom-0 w-screen border shadow bg-white  z-10'>
        <div className='py-2 mx-2 flex justify-between items-center'>
          <img src="images/small-logo.svg" alt="small-logo" />
          <div className='flex space-x-2'>
            <ImageComponent img="images/facebook1.svg" />
            <ImageComponent img="images/Youtube1.svg" />
            <ImageComponent img="images/instagram.svg" />
            <ImageComponent img="images/LinkedIn1.svg" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
