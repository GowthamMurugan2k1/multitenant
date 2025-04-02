export interface SpaceCreateProps {
  Space: string;
  List: string;
}


export type SpaceTypes ={
  id:string,
  createdAt?:string,
  role?: "OWNER" | "ADMIN" | "USER",
  spaceIcon?:string,
  spaceName:string,
  updateAt?:string,
  userId?:string
}

