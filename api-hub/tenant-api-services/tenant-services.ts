import { AxiosError } from "axios";
import { TenantRoute } from "../apiList";
import { axiosService } from "@/lib/axiosService";

export const checkAvailabilityAPI = async (query: string) => {
  try {
    if (!query || query.length < 3) {
      return { available: false, reason: "Invalid query length" };
    }
    const res = await axiosService.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${TenantRoute}/${query}`
    );

    return res.data ?? { available: false };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data || "Something went wrong",
    };
  }
};

export const handleCreateTenant = async (tenant: string) => {
  try {
    let data = {
      tenantName: tenant,
    };
    const res = await axiosService.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${TenantRoute}/`,
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

export const FetchTenantDetails = async () => {
  try {
    const res = await axiosService.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${TenantRoute}/`
    );
    return res.data ?? {data:'not found'};
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data || "Something went wrong",
    };
  }
};
