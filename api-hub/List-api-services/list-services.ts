import { axiosService } from "@/lib/axiosService";
import { ListRoute } from "../apiList";
import { AxiosError } from "axios";

type Payload = {
  spaceId: string;
  listName: string;
};
export const handleCreateList = async ({
  spaceId,
  listName,
}: {
  spaceId: string;
  listName: string;
}) => {
  try {
    const res = await axiosService.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${ListRoute}/`,
      {
        spaceId,
        listName,
      }
    );
    return res.data ?? { data: "not found" };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data || "Something went wrong",
    };
  }
};
