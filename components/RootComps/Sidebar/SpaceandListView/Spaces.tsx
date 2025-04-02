"use client";
import {
  MdDelete,
  MdFormatListBulletedAdd,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import Liststab from "@/components/RootComps/Sidebar/SpaceandListView/Lists";
import { useState } from "react";
import { spacewithList } from "@/types/Commontypes";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePopup } from "@/hooks/usePopup";

function Spaces({ id, spaceName, list }: spacewithList) {
  const { onChange } = usePopup();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // function to handle Toggle the space
  const toggleSpace = (spaceId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [spaceId]: !prev[spaceId],
    }));
  };

  const handleCreateList = (id: string) => {
    onChange({ isOpen: true, activeId: id });
  };

  return (
    <div className="flex flex-col py-2" key={id}>
      <div className="flex  relative justify-between items-center bg-slate-300 hover:bg-slate-300 rounded-lg">
        <div
          className="flex gap-1 items-center cursor-pointer w-[80%]"
          onClick={() => toggleSpace(id)}
        >
          <span>
            {expanded[id] ? (
              <MdOutlineArrowDropUp />
            ) : (
              <MdOutlineArrowDropDown />
            )}
          </span>
          <p className="truncate"> {spaceName}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center text-lg text-slate-500/40 cursor-pointer w-[20%] hover:bg-white/20 rounded-tr-xl rounded-br-xl ">
            <HiOutlineDotsHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer hover:bg-red-600/20 text-red-400 ">
              <MdDelete className="text-red-400" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-blue-600/20 text-blue-400"
              onClick={() => handleCreateList(id)}
            >
              <MdFormatListBulletedAdd className="text-blue-400" /> Add List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {expanded[id]
        ? list.map((item) => {
            return (
              <Liststab
                key={item.id}
                id={item.id}
                listName={item.listName}
                color={item.color}
              />
            );
          })
        : null}
    </div>
  );
}

export default Spaces;
