import { InviteUser } from "@/components/InviteUser/InviteUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GreetingMessage } from "@/utils/common";

function Header() {
  return (
    <div className="flex w-full border border-slate-500 rounded-2xl justify-between items-center bg-blue-200/30 p-4 shadow-2xl ">
      {/* Left content */}
      <div>
        <h2 className="text-[var(--color-accent)] text-3xl">
           {GreetingMessage()}, Gowtham
        </h2>
      </div>
      {/* right content */}
      <div className="flex justify-center items-center gap-4">
        <InviteUser />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
