import { spacewithList } from "@/types/Commontypes";
import { ListTypes } from "@/types/listtypes";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SpacesState = spacewithList[];

export const initialState: SpacesState = [];

export const spaceSlicer = createSlice({
  initialState,
  name: "space",
  reducers: {
    setSpacewithList: (state, action: PayloadAction<spacewithList[]>) => {
        return action.payload;
    },
    addSpace:(state,action:PayloadAction<spacewithList>)=>{
      state.push(action.payload)
    },
    addList:(state,action:PayloadAction<{id:string,list:ListTypes}>)=>{
      return state.map((space)=>{
        if(action.payload.id === space.id){
          return {
            ...space,
            list: [...space.list, action.payload.list] 
          };
        }
        return space
      })
    }
  },
});


export const { setSpacewithList,addList,addSpace} = spaceSlicer.actions;

export default spaceSlicer.reducer;