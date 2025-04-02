import TwoColTile from "@/components/Tile/Two_col_tile";

import { BiTask } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";

function index() {
  return (
    <div className="flex justify-evenly items-center w-full container">
      <TwoColTile
        icon={<BiTask />}
        count={15}
        widgetName="Completed Task"
        varient="Completed"
      />
      <TwoColTile
        icon={<MdPendingActions />}
        count={25}
        widgetName="Pending Task"
        varient="Pending"
      />
      <TwoColTile
        icon={<RiProgress5Line />}
        count={5}
        widgetName="Progress Task"
        varient="Progress"
      />
    </div>
  );
}

export default index;
