import { PopupState } from '@/types/Commontypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: PopupState = {
  isOpen: false,
  currId:''
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<PopupState>) => {
      state.isOpen = action.payload.isOpen;
      state.currId = action.payload.currId;
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen
    },
  },
});

export const { setOpen, toggleOpen } = popupSlice.actions;
export default popupSlice.reducer;