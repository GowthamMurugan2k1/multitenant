export type ListTypes ={
    id:string,
    spaceId?:string,
    createdAt?:string,
    role?: "OWNER" | "ADMIN" | "USER",
    color?:string,
    listName:string,
    updateAt?:string,
    userId?:string
  }