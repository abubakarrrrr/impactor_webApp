import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  baseUrl,
  INTL_SIGNUP,
  SIGIN_UP_VERIFY,
  SEND_SMS_OTP,
  INTL_LOGIN, 
  FORGOT_PASSWORD,
  GET_USERS_PROFILE,
  USERS_PROFILE_UPDATE,
  USERS_PROFILE_IMAGE,
  LOGOUT,
  GET_IMPACTOR_FOOTPRINTS_PKR

} from "@/configs/urlConstant";

const authApiSlice = createSlice({
  name: "authApi",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authApiSlice.actions;
export default authApiSlice.reducer;

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ data }) => ({
        url: `${INTL_SIGNUP}`,
        method: "POST",
        body: data,
      }),
    }),
    signUpVerify: builder.mutation({
      query: ({ data }) => ({
        url: `${SIGIN_UP_VERIFY}`,
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: ({ data }) => ({
        url: `${SEND_SMS_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data }) => ({
        url: `${INTL_LOGIN}`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ data }) => ({
        url: `${FORGOT_PASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${GET_USERS_PROFILE}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
    }),

    userProfileUpdate: builder.mutation({
      query: ({data})=>({
        url: `${USERS_PROFILE_UPDATE}`,
        method: "POST",
        body:data,
        headers:{
          Authorization: `Bearer ${Cookies.get("token")}`
        },
      }),
    }),

   
  userProfileImage: builder.mutation({
    query: ({data})=>({
      url : `${USERS_PROFILE_IMAGE}`,
      method: "POST",
      body: data,
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
  }),

  getLogout: builder.query(({
    query : ()=>({
      url: `${LOGOUT}`,
      method: "GET",
      headers:{
        Authorization : `Bearer ${Cookies.get("token")}`
      }
    })
  })),

  getImpactorFoortprint: builder.query({
    query: () => ({
      url: `${GET_IMPACTOR_FOOTPRINTS_PKR}`, 
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,

      },
    }),
  }),

    
  }),
});

export const {
  useSignUpMutation,
  useSignUpVerifyMutation,
  useResendOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useGetUserProfileQuery,
  useUserProfileUpdateMutation,
  useUserProfileImageMutation,
  useGetLogoutQuery, 
  useGetImpactorFoortprintQuery
} = authApi;
