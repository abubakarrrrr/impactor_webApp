"use client";
import Button from '@/components/button';
import Input from '@/components/form/Input';
import { Icons } from '@/icons';
import Label from '@/components/form/Label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ForgotPassword from '@/components/fotgotPassword';
import ChangePassword from '@/components/changePssword';
import OtpComponent from '@/components/OTP Component';
import { useLoginMutation, useSignUpVerifyMutation, useResendOtpMutation, setUser } from '@/redux/services/Auth/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoadingAnimation from '@/components/Loading';

const LoginModule = () => {
  const [login] = useLoginMutation();
  const [signUpVerify]= useSignUpVerifyMutation();
  const [resendOtp]= useResendOtpMutation();
  const router = useRouter();
  const authToken= Cookies.get("token")

  const [isLoading , setIsloading]= useState(false)

  const { handleSubmit, register, watch, formState: { errors } } = useForm();
  const [selected, setSelected] = useState(1)
  const [pin, setPin]= useState("")
  const [isDelete, setIsDelete]=useState(false)
  const [userCreatedId, setUserCreatedId]= useState(null)
  const dispatch=useDispatch();

  const userEmail= watch("email")

  const onSubmit = async (data: any) => {
    setIsloading(true)
    let payload = {
      email: data.email,
      password: data.password,
      "origin": "webapp",
      keepMeLogin: true
    }
    try {
      const response = await login({ data: payload });
      if (response.data) {
        toast.success(response.data.message)
        setIsloading(false)
       
        Cookies.set('token', response?.data?.data?.authToken, { expires: 365 * 10 });
        router.push('/')
      }
      else {
        toast.error(response.error.data.message)
        setIsloading(false)
      }

    } catch (error) {
      toast.error("Don't login")
    }

  }

  const verify = async (e: any) => {
    e.preventDefault();
    setIsloading(true)
    if (pin.length === 5) {
      const payload = { token: pin };
      try {
        const response = await signUpVerify({ data: payload });
        if (response.data) {
          toast.success(response.data.message);
          setIsloading(false)
          if (isDelete) {
            setSelected(1);
          } else {
            setSelected(4);
            setUserCreatedId(response?.data?.data?.userId);
            console.log(response?.data?.data?.userId, "iddd");
          }
        } else {
          toast.error(response.error.data.message);
          setIsloading(false)
        }
      } catch (error) {
        toast.error("Verification failed. Please try again.");
      }
    } else {
      toast.error("OTP must be 5 digits");
    }
  };
  
  

  

  const reSendOtp=async (e:any)=>{
    setIsloading(true)
    e.preventDefault();
    setIsloading(true)
   let payload={
    email: userEmail,
   }
    try{
      const response = await resendOtp({data:payload})
     if(response.data){
      toast.success(`${response.data.message}`)
      setIsloading(false)
      
     }else{
      toast.error(`${response.error.data.message}`)
      setIsloading(false)
      
     }
    }catch(error){

    }
  }

  useEffect(() => {
    if (authToken) {
      router.push('/');
    }

  }, [authToken, router]);


  const iosUrl = () => {
    window.open('https://apps.apple.com/pk/app/my-impact-meter/id1645519100', '_blank');
  }
  const androidUrl = () => {
    window.open('https://play.google.com/store/apps/details?id=com.impact.meter', '_blank');
  }
  return (
   <>
      {isLoading && (
        <LoadingAnimation />
      )
    }
   
    <div className='lg:flex relative'>
      <div className="h-[100vh] w-[50%] lg:flex hidden lg:fixed top-0 left-0 ">
        <img src="images/mainimage333.png" alt="sidebarimage" className=" rounded  h-full w-full  aspect-square  object-cover" />
      </div>


      <div className="bg-light w-[100%] md:w-[100%] h-[100vh] lg:h-auto absolute right-0 lg:w-[50%] grid  place-content-center pt-5 m-auto ">

        {selected == 1 && (
          <div className="w-[100%] m-auto mt-[10%]">
            <img src="images/new-logo.png" alt="logo" className="w-[50%] m-auto" />
            <h1 className='text-center text-[25px] mt-5  '>Hello! Welcome Back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 w-[90%] md:w-[60%] m-auto'>
              <div className='mt-10 md:mt-5'>
                <div>
                  <Label text="Email" />
                  <Input icon={Icons.emailIcon} placeholder="Enter your Email" type="email"
                    name="email"
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
                <div className='mt-10'>
                  <Label text="Password" />
                  <Input icon={Icons.passwordIcon} placeholder="Enter your Password" type="password" name="password"
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
                  <div className='flex justify-between mt-2'>
                    <div className='flex'>
                      <input type="checkbox" className='w-4' />
                      <p className='text-primary mx-2'>Remember me</p>
                    </div>
                    <div>
                      <p className='text-danger cursor-pointer ' onClick={() => setSelected(2)}>Forgot password</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-10 w-full bg-primary rounded'>
                <Button classname='py-2 px-42 w-full text-white ' text="Login" />
              </div>
              <div className='flex justify-between m-auto mt-5'>
                <hr className='bg-primary w-[45%] h-[3px]' />
                <p className='relative bottom-3'>or</p>
                <hr className='bg-primary w-[45%] h-[3px]' />
              </div>
              <div className='flex justify-between m-auto mt-5'>
                <img src="images/apple.png" alt="apple" className='w-[45%]' onClick={androidUrl} />
                <img src="images/google.png" alt="google" className='w-[45%]' onClick={iosUrl} />
              </div>
              <p className='text-primary mt-5 text-center pb-5 '>Don't Have an Account?
                <Link href="/signup"> <span className='mr-5 text-danger'>Create Account</span></Link>
              </p>
            </form>
          </div>
        )}



        {
          selected == 2 && (
            <ForgotPassword setSelected={setSelected} />

          )
        }

        <div className=' lg:w-[100vh] md:w-[80vh] w-[100%] m-auto '>
          {
            selected == 3 && (
              <OtpComponent verify={verify} setPin={setPin} reSendOtp={reSendOtp} />
            )
          }
        </div>

        {
          selected == 4 && (
            <ChangePassword userCreatedId={userCreatedId} setSelected={setSelected} />
          )
        }


      </div>
    </div>
    </>
  );
};

export default LoginModule;
