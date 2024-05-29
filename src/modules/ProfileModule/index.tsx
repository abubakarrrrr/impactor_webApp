
import ImageComponent from '@/components/ImageComponent'
import React from 'react'
import dynamic from 'next/dynamic'
import { BiEdit } from 'react-icons/bi'
import { useRouter } from 'next/router';
const FooterPointGraph = dynamic(() => import('@/components/Graphs/FooterPointGraph'), { ssr: false });
const ImpactPulseChart = dynamic(() => import('@/components/Graphs/ImpactPulseChart'), { ssr: false });
import { useGetUserProfileQuery } from '@/redux/services/Auth/authApi';


const ProfileModule = () => {
  const router= useRouter();

  const { data: userProfileData, error, isLoading } = useGetUserProfileQuery();

  console.log(userProfileData, "userdata")

  const FooterPointData = [
    { name: 'Grocery', value: 400, color: "#73CF31" },
    { name: 'Education', value: 200, color: "#D0432B" },
    { name: 'Flood Relief', value: 300, color: "#1487A4" },
    { name: 'Direct Giving', value: 200, color: "#D83764" },
    { name: 'ImpacTech', value: 300, color: "#345698" },
    { name: 'EarnTech', value: 200, color: "#01CAFE" },
  ];

  return (
    <div className='lg:w-[84%]   lg:ml-[15%] mt-24 lg:mt-20 mb-28 w-full flex flex-col lg:flex-row '>
        <div className=' w-[90%] bg-[#FAFAFA] m-auto rounded py-8'>

        <div className='  lg:flex justify-between py-4    gap-5  px-5'>
 
 <div className=' lg:w-1/2 bg-white  p-4 rounded flex justify-between shadow-lg'>
   <div className=' flex'>
    <ImageComponent
     img={userProfileData ? userProfileData.data.profileImage.location : " images/noPic.svg"} className=" w-16 h-16 rounded-full" />
    <h1 className=' ml-2 mt-2 font-semibold'>Muhammad Abubakar <br /> <span className=' text-[10px]'>Avalaible</span></h1>
   </div>
   <div className=' flex cursor-pointer ' onClick={ ()=>router.push("/settings")}>
    <BiEdit /> <p className=' text-[10px]'>Edit</p>
   </div>
 </div>



 <div className=' mt-3 lg:mt-0 lg:w-1/2 bg-white  p-4 rounded grid grid-cols-3 shadow-lg '>
  <div className=' border border-primary font-bold text-center border-y-0  border-l-0 border-r-2   '>
    <h1 className=' text-primary '>56 <br /> <span> Impactess</span></h1>
  </div>
  <div className=' border border-primary font-bold text-center border-y-0  border-l-0 border-r-2   '>
    <h1 className=' text-primary '>{userProfileData ? userProfileData.data.impactCredits : " "}<br /> <span> Impact Credits</span></h1>
  </div>
  <div className=' border border-primary font-bold text-center border-y-0  border-l-0 border-r-2   '>
    <h1 className=' text-primary '>{userProfileData ? userProfileData.data.impactorBuddies.length : " "}<br /> <span> Impact Buddies</span></h1>
  </div>
 </div>
 </div>


 {/* #############graphs#######################  */}

 <div className=' grid lg:grid-cols-3 gap-5 px-5  '>
  <div>
    <h1 className=' text-primary  font-bold py-1'>imapct FootPrint</h1>
    <div className=' py-3 rounded bg-white shadow-lg'>
    <FooterPointGraph data={FooterPointData} />
    </div>
  </div>


  <div>
    <div>
    <h1 className=' text-primary  font-bold py-1'>imapct Meter</h1>
    <div className='  rounded bg-white grid place-items-center py-9 shadow-lg'>
      <ImageComponent img="images/impact-meter.jpg" />
      <h1 className=' text-primary font-bold py-3 '>
        {userProfileData ? userProfileData.data.impactLevel : " "}</h1>
      <h1 className=' text-danger font-bold '>Tap on Badge to share</h1>
      </div>
    </div>
  </div>



  <div>Impact Pie</div>
 </div>



 {/* ####################top impactee ######################  */}

 <div className=' grid lg:grid-cols-2 gap-5 px-5 mt-3'>
  <div >
 <h1 className=' text-primary  font-bold py-1'>Top 5 impactees</h1>
 <div className=' py-3 rounded bg-white shadow-lg'>
  </div>
 </div>

 <div>
 <h1 className=' text-primary  font-bold py-1'>imapct Pulse</h1>
 <div className=' py-3 rounded bg-white shadow-lg'>
<ImpactPulseChart  />
 </div>
 </div>
 
 </div>
        </div>
        </div>
  )
}

export default ProfileModule
