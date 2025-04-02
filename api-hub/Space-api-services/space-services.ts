import { axiosService } from "@/lib/axiosService";
import { SpaceRoute } from "../apiList";
import { SpaceCreateProps } from "@/types/spacetypes";
import { AxiosError } from "axios";

// Create a Space
export const handleCreateSpace = async (data: SpaceCreateProps) => {
  try {
    const res = await axiosService.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${SpaceRoute}`,
      data
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data || "Something went wrong",
    };
  }
};
