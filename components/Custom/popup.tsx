import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";


export function Popup({
  CTAbtn,
  heading,
  description,
  children,
  customStyleCTA,
  handleSubmit,
  saveBtn,
  openChange,
  isOpen,
  noChild,
}: {
  CTAbtn: string | React.ReactNode;
  heading: string;
  customStyleCTA?:string;
  description?: string;
  children: React.ReactNode;
  saveBtn?:boolean;
  openChange?: Dispatch<SetStateAction<boolean>>;
  isOpen?:boolean
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement> ;
  noChild?:boolean
}) {
  return (
    <Dialog onOpenChange={openChange!} open={isOpen}>
      <DialogTrigger asChild={noChild ? false: true} >
        {!noChild &&  <Button variant="outline" className={cn("cursor-pointer",customStyleCTA)}>
          {CTAbtn}
        </Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {!saveBtn &&  <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
