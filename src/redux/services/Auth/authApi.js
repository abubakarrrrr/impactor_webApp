import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import {
  baseUrl,
  INTL_SIGNUP,
  SIGIN_UP_VERIFY,
  SEND_SMS_OTP,
  INTL_LOGIN, 
  FORGOT_PASSWORD
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
// Export the custom reducer and actions
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
      query:({data})=>({
        url: `${SIGIN_UP_VERIFY}`,
        method: "POST",
        body:data,
      })
    }),

    resendOtp:builder.mutation({
      query:({data})=>({
        url: `${SEND_SMS_OTP}`,
        method:"POST",
        body:data
      })
    }),

    login:builder.mutation({
      query:({data})=>({
        url:`${INTL_LOGIN}`,
        method:"POST",
        body:data
      })
    }),

    forgotPassword: builder.mutation({
      query:({data})=>({
       url: `${FORGOT_PASSWORD}`,
       method:"POST",
       body:data
      })
    }),


   

  }),
});
export const {
  useSignUpMutation,
  useSignUpVerifyMutation,
  useResendOtpMutation,
  useLoginMutation, 
  useForgotPasswordMutation
  
} = authApi;
