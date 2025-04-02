import { hexToRgb } from "@/utils/common";

function TwoColTile({
  icon,
  widgetName,
  count,
  varient,
}: {
  icon: React.ReactNode;
  widgetName: string;
  count: number;
  varient: "Completed" | "Pending" | "Progress";
}) {
  const varientColor = {
    Completed: "#008000",
    Pending: "#f7cb73",
    Progress: "#408ee0",
  };

  const currVarientColor = varientColor[varient];

  return (
    <div className="grid grid-cols-2 bg-white rounded-xl shadow-lg max-w-2xs justify-center  items-center">
      <div className="flex justify-center items-center">
        <span
          className={
            `w-10 h-10 p-2 flex justify-center items-center rounded-lg text-2xl `
          }
          style={{ background:`rgb(${hexToRgb(currVarientColor)}/0.2)`, color:currVarientColor}}
        >
          {icon}
        </span>
      </div>
      <div className="p-2"> 
        <h2 className="text-3xl font-semibold">{count}</h2>
        <span className="text-gray-600"> {widgetName}</span>
      </div>
    </div>
  );
}

export default TwoColTile;
