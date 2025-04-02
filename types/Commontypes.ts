import { ImageProps as NextImageProps } from "next/image";
import React from "react";
import { ListTypes } from "./listtypes";
import { SpaceTypes } from "./spacetypes";

// export interface ImageProps {
//   src: string;
//   width?: number;
//   height?: number;
//   alt: string;
//   isFill?:boolean
//   className?:string
//   props?:React.ComponentPropsWithoutRef<"img">
   
// }


export interface SpaceProps {
  id:null | number,
  active:boolean
}


export interface spacewithList extends SpaceTypes{
  list:ListTypes[]
}

export type ImageProps = Omit<NextImageProps, "className" | "width" | "height"> & {
  className?: string;
  sizes?: string;
  isFill?:boolean
} & (
  | { fill: true; width?: never; height?: never } 
  | { fill?: false; width?: number; height?: number }
);

export interface PopupState {
  isOpen: boolean;
  currId?:string
}

export interface TableHeadProps{
  headName:string,
  key:string
}
export interface TabelDataProps{
  id:string | number,
  status:string,
  taskName:string,
  assignees:string,
  dueDate:string,
  priority:string
  createdAt?:string,
  updatedAt?:string
}