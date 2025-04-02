"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Popup } from "../Custom/popup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { handlecreateSpace } from "@/api-hub/Space-api-services/space-api";
import { useDispatch} from "react-redux";
import { addSpace } from "@/Slicer/space-slicer";


function CreateSpace() {
  const dispatch = useDispatch();
  
  const [space, setSpace] = useState<{ Space: string; List: string }>({
    Space: "",
    List: "",
  });
  const [isSpace, setIsspace] = useState(true);
  const [model,setmodel] = useState(false)
  
  const currName = isSpace ? "Space" : "List";

  // onchange
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSpace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data, isError, isPaused, mutate } = handlecreateSpace();

  useEffect(() => {
    if (data) {
      
      dispatch(addSpace(data?.data));
      setSpace({
        Space: "",
        List: "",
      });
      setIsspace(prev =>!prev)
      setmodel((prev) => !prev);
    }
  }, [data]);

  // Handle Next and Save
  const handleBtn = () => {
    if (isSpace) {
      return setIsspace((prev) => !prev);
    }
    let data = space;
    mutate(data);
  };
  
  return (
    <Popup
      CTAbtn="New Space"
      heading="Create a New Space"
      description="Name your space like "
      customStyleCTA="border-2 border-dashed border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white"
      saveBtn
      isOpen={model}
      openChange={setmodel}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={currName} className="text-right">
            {currName}
          </Label>

          <span className="col-span-3">
            <Input
              id={currName}
              type="text"
              required
              name={currName}
              value={isSpace ? space.Space : space.List}
              placeholder={isSpace ? "Marketing" : "SEO"}
              onChange={handleOnchange}
            />
          </span>
          <div className="col-span-4 gap-3 flex justify-end">
            {!isSpace && (
              <Button
                variant={"outline"}
                className="cursor-pointer"
                disabled={!space.Space}
                onClick={() => setIsspace((prev) => !prev)}
              >
                Back
              </Button>
            )}
            <Button disabled={!space.Space} onClick={handleBtn}>
              {isSpace ? "Next" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default CreateSpace;
