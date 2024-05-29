import { useState } from 'react'
import Logout from '@/components/Modals/Logout';
import { ProfileIcon, DeleteIcon, ZakatGoalIcon , HelpIcon, WhatsAPPIcon, TemIcon, LogoutIcon } from '@/icons';
import { MdOutlinePassword } from "react-icons/md";

const SettingTab = ({selectedTab, setSelectedTab,}) => {

    const tabs = [
        { icon: <ProfileIcon />, name: "Profile", current: true },
        { icon: <MdOutlinePassword />, name: "Change Password", current: false },
        { icon: <DeleteIcon />, name: "Delete Account", current: false },
        { icon: <ZakatGoalIcon />, name: "Set Zakat Goal", current: false },
        { icon: <HelpIcon />, name: "Help & Disputes", current: false },
        {
          icon: <TemIcon />,
          name: "Terms & Conditions",
          link: "https://www.myimpactmeter.com/terms-conditions-2/",
          current: false,
        },
        {
          icon: <WhatsAPPIcon />,
          name: "WhatsApp Help & Disputes",
          link: "https://api.whatsapp.com/send/?phone=923226460266",
          current: false,
        },
      ];


      const [toggleLogout, setToggleLogout]= useState(false);

      const handleToggle=()=>{
          setToggleLogout(!toggleLogout)
      }

  return (

    
    <div>
      {
        toggleLogout ? <Logout handleToggle={handleToggle} /> :" "
      }
        <div className=' w-[90%] mx-auto py-2  '>
        <p className=' text-danger font-bold '> Settings</p>
        <hr className=' h-[1px] bg-primary' />
        </div>
        {
            tabs.map((item, i)=>{
                return <div className={` cursor-pointer font-semibold px-4 ml-2  mx-auto py-2 mt-2 flex rounded ${selectedTab === i ? " bg-primary " :" hover:bg-primary text-white"} `} 
                onClick={()=>setSelectedTab(i)}   >
                    <h1 className={`  hover:text-white ${selectedTab===i ? " text-white" : " text-danger"}`}>{item.icon}</h1>
                    <h1 className={` ml-2 w-full h-full text-[14px] hover:text-white ${selectedTab===i ? " text-white" : " text-primary"}`}>{item.name}</h1>
                 
                </div>
            })
        }


      <div className=' w-[90%] mx-auto  mt-5 py-2  '>
      <hr className=' h-[1px] bg-primary' />
  <div className=' flex   py-2  cursor-pointer hover:bg-primary px-2 mt-2 hover:text-white rounded ' onClick={handleToggle}>
    <h1 className=' text-danger hover:text-white'>
    <LogoutIcon /> 
    </h1>
    <h1 className=' w-full text-primary font-bold ml-2  hover:text-white '>LogOut</h1>
     </div>

        </div>
    </div>
  )
}

export default SettingTab
