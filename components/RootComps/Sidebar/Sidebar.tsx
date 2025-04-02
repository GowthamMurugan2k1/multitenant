"use client";
import Link from "next/link";
import ImageComp from "../../Custom/ImageComp";
import { Button } from "../../ui/button";
import CreateSpace from "@/components/creation/SpaceCreation";
import dynamic from "next/dynamic";
import { GetTenantDetails } from "@/api-hub/tenant-api-services/tenant-api";
import { Skeleton } from "@/components/ui/skeleton";
import { spacewithList } from "@/types/Commontypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { setSpacewithList } from "@/Slicer/space-slicer";
import ListCreation from "@/components/creation/ListCreation";

// Dynamic imports
const Spaces = dynamic(() => import("./SpaceandListView/Spaces"), {
  ssr: false,
});

function Sidebar() {
  const dispatch = useDispatch();
  const space = useSelector((state: RootState) => state.space);
  const { data, isError, isLoading, refetch } = GetTenantDetails();

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSpacewithList(data.message.space));
    }
  }, [data]);
  
  
  if (isError) {
    return (
      <ErrorDisplay
        message="Failed to load tenant details"
        onRetry={() => refetch()}
      />
    );
  }

  // destructure
  const { name } = data?.message ?? "No message available";

  return (
    <section className=" flex flex-col gap-4 py-2 bg-white shadow-[5px_3px_20px_3px_rgba(0,_0,_0,_0.1)] shadow-indigo-500/20 rounded-lg h-[40rem] border border-indigo-200 px-2">
      <div className="flex justify-center items-center">
        <ImageComp alt="Logo" src="/logo.svg" width={40} height={40} />
        <span className="font-bold text-indigo-500">TaskOrbit</span>
      </div>
      {isLoading ? (
        <Skeleton className="h-4 w-full bg-gray-200" />
      ) : (
        <p className="capitalize  font-bold text-center text-xl">{name}</p>
      )}
      <CreateSpace />

      <Link href={"/"}>
        <Button
          className="cursor-pointer hover:bg-gray-500/30 w-full text-gray-950"
          size={"lg"}
          variant={"outline"}
        >
          Dashboard
        </Button>
      </Link>
      <hr />
      <p className="text-slate-400">Spaces</p>
      <div className="[&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-hidden hover:overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5}).map((_, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                className="h-4 w-full bg-gray-500/40"
              />
            ))}
          </div>
        ) : space?.length > 0 ? (
          space.map((item: spacewithList) => (
            <Spaces
              id={item.id}
              key={item.id}
              list={item.list}
              spaceName={item.spaceName}
            />
          ))
        ) : null}
      </div>
      <ListCreation noChild/>
    </section>
  );
}

export default Sidebar;
