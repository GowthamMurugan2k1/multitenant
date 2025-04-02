import { useMutation } from "@tanstack/react-query";
import { handleCreateList } from "./list-services";
import toast from "react-hot-toast";

export const CreateaList = ({
  spaceId,
  listName,
}: {
  spaceId: string;
  listName: string;
}) => {
  const { data, isError, isPending, mutate } = useMutation({
    mutationKey: ["newList", spaceId],
    mutationFn: async () => await handleCreateList({ spaceId, listName }),
    onSuccess: (res) => {
      if (!res.status) {
        toast.error(res?.error?.message);
        return;
      }
      toast.success("List created successFully");
    },
  });
  return { data, isError, isPending, mutate };
};
