"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/button';
import Input from '@/components/form/Input';
import { SelectCountry, SelectGender, SelectNationality } from '@/components/form/SelectOption';
import Link from 'next/link';
import { Icons } from '@/icons';
import Label from '@/components/form/Label';
import { useRouter } from 'next/router';
import { useSignUpMutation } from '@/redux/services/Auth/authApi';
import { useSignUpVerifyMutation } from '@/redux/services/Auth/authApi';
import { useResendOtpMutation } from '@/redux/services/Auth/authApi';
import { toast } from 'react-toastify';
import OtpComponent from '@/components/OTP Component';
import Cookies from 'js-cookie';




const SignUpModule = () => {
  const [signUp] = useSignUpMutation();
  const [signUpVerify]= useSignUpVerifyMutation();
  const [resendOtp]=useResendOtpMutation();
  const [createUserId, setCreateUserId]=useState(null);
  const [pin, setPin]= useState("")

  const { register, getValues, handleSubmit, watch, formState: { errors } } = useForm();
  console.log(errors, "error")

  const password = watch("password");

  const Router = useRouter()

  const authToken= Cookies.get('token')

  const userEmail= getValues("email")
  

  const onSubmit = async (data:any) => {
    const payload = {
      userName: data.userName,
      gender: data.gender,
      country: data.country,
      contact: data.contact,
      password: data.password,
      otherNationality: data.otherNationality,
      email: data.email,
      termAndConditionAccepted: true,
      origin: "webApp",
      otherCountries: [],
      pakPassport: false
    };
    try {
      const response = await signUp({ data: payload });
      if (response.data) {
        setCreateUserId(response.data.userId);
        toast.success(`${response.data.message} `);
      } else {
        toast.error(`${response.error.data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred during sign-up.");
    }
  };


  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (pin.length === 5) {
      const payload = { 
        userId: createUserId,
        token: pin
      };
  
      try {
        const response = await signUpVerify({ data: payload });
        if (response.data) {
          Router.push("/login");
          toast.success(`${response.data.message}`);
        } else {
          toast.error(response.error.data.message || "Verification failed");
        }
      } catch (error) {
        toast.error("An error occurred during verification.");
      }
    } else {
      toast.error("OTP must be 5 digits long.");
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

  useEffect(()=>{
    if(authToken){
      Router.push("/")
    }
  },[authToken, Router])

  const iosUrl = () => {
    window.open('https://apps.apple.com/pk/app/my-impact-meter/id1645519100', '_blank');
}
const androidUrl = () => {
  window.open('https://play.google.com/store/apps/details?id=com.impact.meter', '_blank');
}


  return (
    <div className='lg:flex relative'>
      <div className="h-[100vh] w-[50%] lg:flex hidden lg:fixed top-0 left-0">
        <img src="images/mainimageold.png" alt="sidebarimage" className="object-cover    rounded h-full w-full" />
      </div>
      {
        createUserId ?
        <div className="bg-light absolute right-0 top-0 w-[100%] md:w-[100%] lg:w-[50%]  m-auto h-auto">
          <img src="images/new-logo.png" alt="logo" className="w-[50%] pt-5 lg:hidden m-auto" />
        <OtpComponent verify={verify} setPin={setPin} reSendOtp={reSendOtp} />
        </div>

        :
        <div className="bg-light absolute right-0 top-0 w-[100%] md:w-[100%] lg:w-[50%] pt-5 m-auto h-auto">
        <div className="w-[100%] m-auto mt-10 mb-5">
        <img src="images/new-logo.png" alt="logo" className="w-[50%] pt-5 m-auto" />
          
          <form className='mt-10 w-[90%] m-auto' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>


              <div>
                <Label text="Full Name" />
                <Input name="userName"
                  type="text"
                  placeholder="Enter Your Name"
                  icon={Icons.nameIcon}
                  register={{ ...register("userName", { required: true, minLength: 8 }) }}
                />
                {errors.userName && errors.userName.type === "required"
                  && (<span className="text-red-500">
                    Full name is required
                  </span>)}

                {errors.userName && errors.userName.type === "minLength" &&
                  (<span className="text-red-500">Min 6 length required</span>)}
              </div>


              <div>
                <Label text="Email Address" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  icon={Icons.emailIcon}
                  register={{
                    ...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    }),
                  }}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

            </div>


            <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>
              <div>
                <Label text="Gender" />
                <SelectGender icon={Icons.genderIcon} placeholder="Select your gender" name="gender" register={{ ...register("gender", { required: true }) }} />
              </div>
              <div>
                <Label text="country" />
                <SelectCountry icon={Icons.healthIcon} name="country"
                  register={{ ...register("country", { required: true }) }} />
              </div>
            </div>



            <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>
            <div>
                <Label text="Mobile Number" />
                <Input
                  icon={Icons.mobileIcon}
                  placeholder="Enter your Mobile Number"
                  name="contact"
                  type="tel"
                  defaultValue="03"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  register={{
                    ...register("contact", {
                      required: "This field is required",
                      pattern: {
                        value: /^03\d{9}$/,
                        message: "Mobile number must start with '03' and be exactly 11 digits",
                      },
                    }),
                  }}
                />
                {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
              </div>

              <div>
                <Label text="Other Nationality" />
                <SelectNationality icon={Icons.healthIcon} register={{ ...register("otherNationality", { required: true }) }} name="otherNationality" />
                {errors.otherNationality && <span className="text-red-500">This field is required</span>}
              </div>
            </div>


            <div className="w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10">
              <div>
                <Label text="Password" />
                <Input
                  icon={Icons.passwordIcon}
                  placeholder="Enter your Password"
                  name="password"
                  type="password"
                  register={{
                    ...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Password must be at least 8 characters long and include at least one letter and one number",
                      },
                    }),
                  }}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              <div>
                <Label text="Confirm Password" />
                <Input
                  icon={Icons.passwordIcon}
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  type="password"
                  register={{
                    ...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: value =>
                        value === password || "Passwords do not match",
                    }),
                  }}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>

            <div className='w-[60%] bg-primary m-auto mt-5 rounded'>
              <Button classname="py-2 px-20 text-white bg-primary" text="Sign Up" type="submit" />
            </div>
            <div className='flex justify-between w-[60%] m-auto mt-5'>
              <hr className='bg-primary w-[45%] h-[3px]' />
              <p className='relative bottom-3'>or </p>
              <hr className='bg-primary w-[45%] h-[3px]' />
            </div>
            <div className='flex justify-between w-[60%] m-auto mt-5'>
              <img src="images/apple.png" alt="apple" className='w-[45%]' onClick={androidUrl} />
              <img src="images/google.png" alt="google" className='w-[45%]' onClick={iosUrl} />
            </div>
            <p className='text-primary mt-5 text-center pb-5 md:pb-0'>Already have an account? <Link href="/login"> <span className='mr-5 text-danger'>Login</span></Link></p>
          </form>
        </div>
      </div>
      }
      
    </div>
  );
};

export default SignUpModule;
