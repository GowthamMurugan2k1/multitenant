import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TenantType = {
  tenantName: string;
};
export const initialState: TenantType = {
  tenantName: "",
};
const TenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    // setTenant Name
    setTenantName: (state, action: PayloadAction<string>) => {        
      state.tenantName = action.payload;
    },
  },
});

export const { setTenantName } = TenantSlice.actions;

export default TenantSlice.reducer;
