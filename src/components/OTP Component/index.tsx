import React from 'react';
import ImageComponent from '../ImageComponent';
import Button from '../button';
import PinField from 'react-pin-field';

const OtpComponent = ({ verify, setPin, reSendOtp }:any) => {
  return (
    <div className='grid place-items-center h-[100vh]'>
      <form onSubmit={verify} className='w-[95%] md:w-[80%] lg:w-[70%] rounded-lg bg-white m-auto'>
        <div className='w-[90%] m-auto py-10'>
          <h1>OTP</h1>
          <div className='w-[60%] m-auto text-center'>
            <ImageComponent img="images/otp.png" classname="mt-2" />
          </div>
          <div className='text-center'>
            <h1 className='mt-10 text-2xl'>Start your Impact!</h1>
            <p className='mt-5'>Enter the verification code sent to your Email.</p>
            <div className='m-auto w-[90%] mt-8 grid grid-cols-5 gap-3'>
              <PinField
                validate={/^[0-9]$/}
                length={5}
                onComplete={(p) => setPin(p)}
                className='shadow-sm h-12 w-12 overflow-y-auto rounded-md border-[0.25px] px-1 text-center !text-base font-bold text-black outline-primary border-[#333333] dark:bg-transparent'
              />
            </div>
            <h1 className='mt-5'>
              Haven't received it? <span className='cursor-pointer text-danger font-bold' onClick={reSendOtp}>Resend code</span>
            </h1>
          </div>
          <div>
            <Button text="Next" type="submit" classname="bg-primary text-white px-12 font-bold mt-10 py-2" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpComponent;
