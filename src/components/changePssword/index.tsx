import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import ImageComponent from '../ImageComponent'
import Button from '../button'
import { useForgotPasswordMutation } from '@/redux/services/Auth/authApi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ChangePassword = ({setSelected, userCreatedId}:any) => {
  console.log(userCreatedId,"id")
  
  const [forgotPassword]=useForgotPasswordMutation();
  const {register,watch, formState:{errors}, handleSubmit}= useForm();
   const newPassword= watch("newPassword")

   const onSubmit = async (data:any)=>{
    console.log(data, "data")
    let payload={
      "userId":userCreatedId,
      "newPassword":data.newPassword,
    }
    try{
      const response = await forgotPassword({data:payload});
      if(response.data){
         toast.success(response.data.message);
         setSelected(1)
      }
      else{
        toast.error(response.error.data.message);
      }
    }catch(error){
      toast.error("not change")
    }
   }

  return (
    <div className='  lg:w-[80%] w-[90%]   m-auto   bg-white rounded  '>
    <form className=' w-[90%] m-auto' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex mt-5'>
      <FaArrowLeft  className=' m-1  '/> <h1>Change Password</h1>
      </div>
      <div className=' grid place-items-center'>
      <ImageComponent img="images/forgotimg.png" className="mt-5" />
      <h1 className=' font-bold mt-10'>Created New Password</h1>
      <p className='mx-5 text-[14px]'>Make sure your password is unique and easy to remember.</p>
      </div>
      <div className='mt-5'>
        <label htmlFor="">New Password</label><br />
        <input type="password" placeholder='Enter Your Password' className=' w-full h-9 px-2   border-gray-300 border focus:border-gray-500   focus:outline-none'
        name="newPassword"
        {...register("newPassword", {
            required: "newPassword is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password must be at least 8 characters long and include at least one letter and one number",
            },
          })
        }
         /><br />  <br />
         {errors.newPassword && (
                  <span className="text-red-500">{errors.newPassword.message}</span>
                )}

        <label >Confirm  Password</label><br />
        <input type="password" placeholder='Enter Your confirm Password' className=' w-full h-9 px-2   border-gray-300 border focus:border-gray-500   focus:outline-none' 
        name='confirmPassword'
        {
          ...register("confirmPassword", {
            required: "Confirm password is required",
            validate: value =>
              value === newPassword || "Passwords do not match",
          })
        }/>

{errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
      </div>
      <div className='py-10'>
      <Button type="submit" text="Done" classname="bg-primary text-white py-2 mt-10 w-[60%] rounded" />
      </div>
      
    </form>
    </div>
  )
}

export default ChangePassword
