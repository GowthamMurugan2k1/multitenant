import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkAvailabilityAPI,
  FetchTenantDetails,
  handleCreateTenant,
} from "./tenant-services";
import toast from "react-hot-toast";


// Check tenant is Available to Make sure it should unique
export const useTenantCheck = (query: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["availability", query],
    queryFn: async () => {
      if (!query) {
        return { status: false, reason: "No query provided" };
      }
      return await checkAvailabilityAPI(query);
    },
    staleTime: 0,
  });

  return { data, isError, isLoading };
};

export const CreateTenant = (tenantName: string) => {
  const { data, isError, isPending, mutate } = useMutation({
    mutationKey: ["createTenant", tenantName],
    mutationFn: async () => {
      return await handleCreateTenant(tenantName);
    },
    onSuccess: (res) => {
      if (!res.status) {
        toast.error(res?.error?.message);
        return;
      }
      toast.success("Base created successFully");
    },
    onError: (e) => {
      console.log(e, "message");
      // toast
    },
  });

  return { data, isError, isPending, mutate };
};

// fetch Tenant details
export const GetTenantDetails = () => {
  
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["Tenant"],
    queryFn: async () => {
      return await FetchTenantDetails();
    },
    
  });
  

  return { data, isError, isLoading, refetch };
};
