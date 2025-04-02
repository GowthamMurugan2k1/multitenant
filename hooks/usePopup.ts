import { setOpen, toggleOpen } from "@/Slicer/popup-slicer";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";


interface UsePopupParams {
  isOpen?: boolean;
  activeId?: string;
}

export const usePopup = ({ isOpen, activeId }: UsePopupParams = {}) => {
  const popupState = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch();
  const onChange = ({ isOpen, activeId }: UsePopupParams = {}) => {
    if (isOpen !== undefined || activeId !== undefined) {
      dispatch(setOpen({ 
        isOpen: isOpen ?? popupState.isOpen, 
        currId: activeId ?? popupState.currId 
      }));
    }
  };

  const toggle = () => dispatch(toggleOpen());

  return { popupState, onChange, toggle };
};
