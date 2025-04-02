
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ListTypes } from "@/types/listtypes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

function Liststab({ listName, id, color }: ListTypes) {
  const [isMouseHover ,setMouseOver] = useState<boolean>(false)

  const handleCreateList = (id: string) => {
    // onChange({ isOpen: true, activeId: id });
  };

  return (
    <div className="flex justify-between items-center text-md text-slate-500 hover:bg-slate-300/30 truncate my-1" onMouseEnter={()=>setMouseOver(prev =>!prev)} onMouseLeave={()=>setMouseOver(prev =>!prev)}>
      <Link href={`/list/${id}`} className="">
        <div
          className="flex items-center gap-3 cursor-pointer px-2"
          key={id}
        >
          <div
            className={`w-4 h-4 rounded-sm  border-2 border-white `}
            style={{
              background: color,
            }}
          />
          {listName}
        </div>
      </Link>
      <DropdownMenu >
        <DropdownMenuTrigger className={` flex justify-center items-center text-lg text-slate-500/40 cursor-pointer w-[20%] hover:bg-white/20 rounded-tr-xl rounded-br-xl `}>
         {isMouseHover &&  <HiOutlineDotsHorizontal />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer hover:bg-red-600/20 text-red-400 ">
            <MdDelete className="text-red-400" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-blue-600/20 text-blue-400"
            onClick={() => handleCreateList(id)}
          >
            <RiEdit2Fill  className="text-blue-400" /> Edit List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Liststab;
