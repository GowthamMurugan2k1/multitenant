import { configureStore } from "@reduxjs/toolkit";
import TenantReducer from "@/Slicer/tenant-slicer";
import SpaceReducer from "@/Slicer/space-slicer";
import PopupReducer from "@/Slicer/popup-slicer"
export const store = () => {
  return configureStore({
    reducer: {
      tenant: TenantReducer,
      space: SpaceReducer,
      popup:PopupReducer
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
