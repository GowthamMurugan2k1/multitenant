import { UserAuthProp } from "@/types/usertypes";
import { AxiosError } from "axios";
import { UserRoute } from "./apiList";
import { axiosService } from "@/lib/axiosService";

export const createUser = async ({ data }: { data: UserAuthProp }) => {
  try {
    const req = await axiosService.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${UserRoute}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      }
    );
    return req;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data || "Something went wrong",
    }; 
  }
};


export const LoginUser = async ({data}:{data:UserAuthProp})=>{
  try {
    const req = await axiosService.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${UserRoute}/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      }
    );
    return req;
  } catch (e: any) {
    const axiosError = e as AxiosError;
    console.log(axiosError,'e')
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data  || "Something went wrong",
    }; 
  }
}