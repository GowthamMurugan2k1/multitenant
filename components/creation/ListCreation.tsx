"use client";
import { useEffect, useId, useState } from "react";
import { Popup } from "../Custom/popup";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePopup } from "@/hooks/usePopup";
import { CreateaList } from "@/api-hub/List-api-services/list-api";
import { useDispatch } from "react-redux";
import { addList } from "@/Slicer/space-slicer";

function ListCreation({
  CTABTN,
  noChild,
}: {
  CTABTN?: string;
  noChild?: boolean;
}) {
  const [listName, setlistName] = useState("");
  const id = useId();
  const { toggle, popupState } = usePopup();

  const dispatch = useDispatch();

  const { data, isError, isPending, mutate } = CreateaList({
    spaceId: popupState.currId!,
    listName,
  });

  useEffect(() => {
    if (data) {
      const { spaceId } = data?.message;

      let UpdateList = {
        id: spaceId,
        list: data.message,
      };
      dispatch(addList(UpdateList));
      setlistName('')
      toggle()
    }
  }, [data]);

  
  //   handleCreate
  const handleCreate = () => {
    mutate();
  };

  return (
    <Popup
      CTAbtn={"Add List"}
      heading="Create a New Space"
      description="Name your space like "
      customStyleCTA="border-2 border-dashed border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white"
      saveBtn
      isOpen={popupState.isOpen}
      openChange={toggle}
      noChild={noChild}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={id} className="text-right">
            ListName
          </Label>

          <span className="col-span-3">
            <Input
              id={id}
              type="text"
              required
              name={"List"}
              value={listName}
              placeholder={"list name"}
              onChange={(e) => setlistName(e.target.value)}
            />
          </span>
          <div className="col-span-4 gap-3 flex justify-end">
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default ListCreation;
