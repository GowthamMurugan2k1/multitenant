import { SpaceCreateProps } from "@/types/spacetypes";
import { useMutation } from "@tanstack/react-query";
import { handleCreateSpace } from "./space-services";
import toast from "react-hot-toast";

export const handlecreateSpace = () => {
  const { data, isError, isPaused, mutate } = useMutation({
    mutationKey: ["new-space"],
    mutationFn: async (data: SpaceCreateProps) => {
      if (!data) {
        return { status: false, reason: "No space info provided" };
      }
      return await handleCreateSpace(data);
    },
    onSuccess: (res) => {
      if (!res.status) {
        toast.error(res?.error?.message);
        return;
      }
      toast.success("Space created successFully");
    },
  });
  return { data, isError, isPaused, mutate };
};
