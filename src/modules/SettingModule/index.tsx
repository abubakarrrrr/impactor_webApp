import React, { useState } from 'react'
import SettingTab from './components/SettingTab';
import PersonalInformation from './components/PersonalInformation';
import ForgotPassword from '@/components/fotgotPassword';
import OtpComponent from '@/components/OTP Component';
import { useSignUpVerifyMutation, useResendOtpMutation, useGetUserProfileQuery } from '@/redux/services/Auth/authApi';
import { toast } from 'react-toastify';
import ChangePassword from '@/components/changePssword';
import { useForm } from 'react-hook-form';
import Logout from '@/components/Modals/Logout';

const SettingModule = () => {
    
  


    const { data: userProfileData, error, isLoading } = useGetUserProfileQuery();
    const [selectedTab, setSelectedTab] = useState(0);
    const [selected, setSelected] = useState(1);
    const [pin, setPin] = useState("");
    const [signUpVerify]= useSignUpVerifyMutation();
    const [resendOtp]=useResendOtpMutation();

    const [userCreatedId,setUserCreatedId]= useState(null)
    
    const  userEmail= userProfileData ? userProfileData.data.email :" ";

    const verify = async (e: any) => {
        e.preventDefault();
        if (pin.length === 5) {
          const payload = { token: pin };
          try {
            const response = await signUpVerify({ data: payload });
            if (response.data) {
              toast.success(response.data.message);
              setSelected(4);
              setUserCreatedId(response?.data?.data?.userId);
             
            } else {
              toast.error(response.error.data.message);
            }
          } catch (error) {
            toast.error("Verification failed. Please try again.");
          }
        } else {
          toast.error("OTP must be 5 digits");
        }
      };


      const reSendOtp=async (e:any)=>{
    
        e.preventDefault();
    
       let payload={
        email: userEmail,
       }
        try{
          const response = await resendOtp({data:payload})
         if(response.data){
          toast.success(`${response.data.message}`)
         }else{
          toast.error(`${response.error.data.message}`)
         }
        }catch(error){
    
        }
      }
    
      

    return (
        <div className='lg:w-[84%]  lg:ml-[15%] mt-24 lg:mt-20 mb-28 w-full flex flex-col lg:flex-row '>
            <div className=' w-[90%] mx-auto lg:flex  justify-between gap-5 mt-5 relative'>
                <div className=' w-[100%] lg:w-[25%]  hidden lg:flex left-0 top-0 absolute shadow-lg bg-white rounded-md h-auto'>
                    <SettingTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </div>

                <div className=' lg:ml-[30%] lg:w-[70%] w-[100%]  shadow-lg bg-white rounded-md py-4'>

                    {
                        selectedTab === 0 ?
                            <PersonalInformation />
                            : ""
                    }

                    {
                        selectedTab === 1  && (
                       
                            <div className=' w-full'>
                            {
                                selected==1 &&(
                                    <ForgotPassword setSelected={setSelected} />
                                )
                            }
                              
                              {
                                selected ==3 && (
                                    <OtpComponent setPin={setPin}  verify={verify} reSendOtp={reSendOtp}/>
                                )
                              }

{
                                selected ==4 && (
                               <ChangePassword userCreatedId={userCreatedId} setSelected={setSelected}  />
                                )
                              }

                            </div>
                        )
                    }

                        
                    
                </div>
            </div>
        </div>
    )
}

export default SettingModule
