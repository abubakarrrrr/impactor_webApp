import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import ImageComponent from '../ImageComponent'
import { useResendOtpMutation } from '@/redux/services/Auth/authApi'
import Button from '../button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {  useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


const ForgotPassword = ({setSelected}:any) => {
  const [resendOtp]= useResendOtpMutation();
 const {register, handleSubmit, setValue, formState: {errors}}= useForm();
 const UserData = useSelector((state: any) => state?.authData?.user);
 const [isDisable, setIsDisable] = useState(false);
 

 const onSubmit= async(data:any)=>{
    let payload={
      email:data.email,
    }
   try{
     
    const response= await resendOtp({data:payload});
    if(response.data){
      toast.success(response.data.message)
      setSelected(3);
    }else{
      toast.error(response.error.data.message)
    }
   }catch(error){
     toast.error("Don't change password")
   }
 }

 
useEffect(()=>{
  if (UserData){

    setValue('email',UserData.email)
    setIsDisable(true)

  }

},[UserData])

  return (
    <div className='  w-[90%] lg:w-[70%]  m-auto grid  bg-white rounded place-items-center '>
    <form className=' w-[90%] m-auto' onSubmit={handleSubmit(onSubmit)}>
    <div className='flex items-center mt-5'>
    <FaArrowLeft className='m-1' onClick={()=>setSelected(1)} />
        
        <h1 className='ml-2 text-xl font-semibold'>Change Password</h1> 
        
    </div>
      <div className=' grid place-items-center'>
      <ImageComponent img="images/forgotimg.png" className="mt-5" />
      <h1 className=' font-bold mt-10'>Forgot Password ?</h1>
      <p className='mx-5 text-[14px]'>Enter the email address you used when you joined and we'll send you instructions to reset your password.</p>
      </div>
      <div className='mt-5'>
        <label htmlFor="">Email Address</label><br />
        <input type="email" placeholder='Enter Your Email Address' className=' w-full h-9 px-2   border-gray-300 border focus:border-gray-500   focus:outline-none'
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        })} />
        {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
      </div>
      <div className='py-10'>
      <Button type="submit" text="Next" classname="bg-primary text-white py-2 mt-10 w-[60%] rounded" />
      </div>
      
    </form>
    </div>
  )
}

export default ForgotPassword
