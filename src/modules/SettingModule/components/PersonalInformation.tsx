import React, { useEffect, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Switch from 'react-switch';
import { useGetUserProfileQuery, useUserProfileUpdateMutation, useUserProfileImageMutation }  from '@/redux/services/Auth/authApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const PersonalInformation = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [userProfileUpdate] = useUserProfileUpdateMutation();
    const [userProfileImage] = useUserProfileImageMutation();
    const router = useRouter();
    const { data: userProfileData, error, isLoading } = useGetUserProfileQuery();
    const [profileImage, setProfileImage] = useState('images/noPic.svg'); // Initial profile image

    useEffect(() => {
        if (userProfileData) {
            setValue("contact", userProfileData.data.contact);
            setValue("email", userProfileData.data.email);
            setValue("userName", userProfileData.data.userName);
            setValue("gender", userProfileData.data.gender);
            setValue("dob", userProfileData.data.dob);
            setValue("about", userProfileData.data.about);
            setProfileImage(userProfileData.data.profileImage?.location );
        }
    }, [userProfileData, setValue, profileImage, setProfileImage]);

    const onSubmit = async (data:any) => {
        const payload = {
            userName: data.userName,
            gender: data.gender,
            dob: data.dob,
            about: data.about,
        };

        try {
            const response = await userProfileUpdate({data:{ data: payload }}).unwrap();
            toast.success(response.message);
        } catch (err) {
            toast.error(err.data.message || 'Profile update failed');
        }
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await userProfileImage({ data: formData });
                if(response.data){
                    setProfileImage(response.data.profileImage?.location );
                    toast.success(response.data.message);
                }else{
                    toast.error(response.error.data.message)
                }

            } catch (err) {
                toast.error(err.message || 'Image upload failed');
            }
        }
    };

    return (
        <div className='w-[90%] mx-auto'>
            <div className='flex' onClick={() => router.push("/")}>
                <FaArrowLeft className='m-1' />
                <h1 className='ml-2 font-semibold'>Personal Information</h1>
            </div>
            <div className='relative mt-5'>
                <input
                    type="file"
                    className='absolute inset-0 w-12 z-40 opacity-0 cursor-pointer'
                    onChange={handleUploadImage}
                />
                <div className='w-full flex items-center'>
                    <img
                        src={profileImage}
                        alt="Selected"
                        className='w-14 h-14 rounded-full object-cover'
                    />
                    <PhotoCamera className="left-5 absolute inset-0 w-12 top-9 text-gray-500 cursor-pointer" style={{ fontSize: '14px' }} />
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='text-[14px]'>
                <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>
                    <div>
                        <label>Full Name</label>
                        <input
                            name="userName"
                            type="text"
                            placeholder="Enter Your Name"
                            {...register("userName", { required: "Full Name is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        />
                        {errors.userName && <span className="text-red-500">{errors.userName.message}</span>}
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email", { required: "Email Address is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                </div>
                <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>
                    <div>
                        <label>Mobile Number</label>
                        <input
                            name="contact"
                            type="tel"
                            placeholder="Enter your Mobile Number"
                            {...register("contact", { required: "Mobile Number is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        />
                        {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input
                            name="dob"
                            type="date"
                            {...register("dob", { required: "Date of Birth is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        />
                        {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
                    </div>
                </div>
                <div className='w-full grid md:grid-cols-2 mt-8 md:mt-5 gap-10'>
                    <div>
                        <label>Gender</label>
                        <select
                            name="gender"
                            {...register("gender", { required: "Gender is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        >
                            <option value="">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            name="about"
                            {...register("about", { required: "Status is required" })}
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        >
                            <option value="Hi i am using MiM">Hi i am using MiM </option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available </option>
                        </select>
                        {errors.about && <span className="text-red-500">{errors.about.message}</span>}
                    </div>
                </div>
                <div className='w-full grid mt-8 md:mt-5'>
                    <div className="relative">
                        <input
                            placeholder="Want to make your profile private"
                            type="text"
                            disabled
                            name="profile"
                            size="sm"
                            className="rounded h-10 w-full border border-gray-200 focus:border-black pl-1 focus:outline-none bg-[#E8F0FE3B]"
                        />
                        <div className="absolute top-[25px] w-10 h-10 -translate-y-1/2 right-6">
                            <Switch />
                        </div>
                    </div>
                </div>
                <div className='w-[60%] bg-primary m-auto mt-5 text-center rounded'>
                    <button type="submit" className="py-2 text-white bg-primary">Save change</button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
