"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popup } from "../Custom/popup";
import {  useState } from "react";
import { isValidEmail } from "@/utils/validators";

interface EmailProp {
  value: string;
  err: null | string;
}

export function InviteUser() {
  const [email, setEmail] = useState<EmailProp>({
    value: "",
    err: null,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {value,err} = email
    if(!value){
      return setEmail((prev) => ({
        value: "",
        err: "Email Id required",
      }));
    }
    if (!isValidEmail(value)) {
      return setEmail((prev) => ({
        value: prev.value,
        err: "invalid email Id",
      }));
    }
  };
  return (
    <Popup
      CTAbtn="Invite member"
      heading="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      handleSubmit={handleSubmit}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>

          <span className="col-span-3">
            <Input
              id="email"
              type="email"
              required
              name="email"
             placeholder="example@gmail.com"
              error={email.err}
              onChange={(e) => setEmail({ value: e.target.value, err: null })}
            />
            {email.err && (
              <p className="text-red-600 text-sm w-full">{email.err}</p>
            )}
          </span>
        </div>
      </div>
    </Popup>
  );
}
