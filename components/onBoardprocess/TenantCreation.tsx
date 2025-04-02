"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ImageComp from "../Custom/ImageComp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTenantName } from "@/Slicer/tenant-slicer";
import {
  CreateTenant,
  useTenantCheck,
} from "@/api-hub/tenant-api-services/tenant-api";
import { useDebounce } from "@/lib/useDebounce";
import Loader from "../Custom/Loader";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function TenantCreation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const tenantName = useSelector((state: RootState) => state.tenant.tenantName);
  const [inputValue, setInputValue] = useState(tenantName);
  const router  = useRouter()

  const debouncedValue = useDebounce(inputValue, 500);
  // check availability
  const { data, isError, isLoading } = useTenantCheck(debouncedValue);


  // onChange of Tenant Name
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;
    let ValidtenantName = value.replace(/ /g, "_");
    setInputValue(ValidtenantName);
    dispatch(setTenantName(ValidtenantName));
  };

  // After created
  const {
    data: mutedData,
    isError: postedError,
    isPending,
    mutate,
  } = CreateTenant(tenantName);

  // Create a tenant
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  
  if (isError) {
    return <p>{isError}</p>;
  }

  if(mutedData?.status){
     router.push('/')
     return
  }

  const disable =
    inputValue === "" ||
    inputValue.length < 3 ||
    isLoading ||
     !data?.message
    
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-3 ">
          <form
            className="p-6 md:p-8 col-span-2 h-[30rem] flex  items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  What’s the name of your company or team?
                </h1>
                <p className="text-muted-foreground ">
                  Your base for seamless collaboration. Pick a name your team
                  recognizes and start building together!
                </p>
              </div>
              <div className="flex justify-center items-center relative">
                <Input
                  id="base"
                  type="text"
                  placeholder="TaskOrbit"
                  required
                  onChange={handleOnChange}
                  value={inputValue}
                />
                {isLoading ? (
                  <span className="absolute right-2 grid place-content-center">
                    <Loader />
                  </span>
                ) : (
                  <>
                    {data?.status && (
                      <span className="text-green-500 text-sm absolute right-4">
                        {data?.message ? (
                          <FaCheck />
                        ) : (
                          <p className="text-gray-400"> Taken </p>
                        )}
                      </span>
                    )}
                  </>
                )}
                {inputValue != "" && inputValue.length < 2 ? (
                  <span className="text-slate-400 text-sm">Min letter 3</span>
                ) : (
                  ""
                )}
              </div>
              <Button type="submit" className="w-full" disabled={disable}>
                Create a Base
              </Button>
            </div>
          </form>
          <div className="bg-muted relative">
            <ImageComp
              src="/onboardimage/wmremove-transformed.webp"
              alt="Image"
              className="object-cover w-full"
              isFill
              sizes="80vw"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
