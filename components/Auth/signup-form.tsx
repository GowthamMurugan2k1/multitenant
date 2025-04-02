"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api-hub/user-auth";
import { UserAuthProp } from "@/types/usertypes";
import { encryptData, isErrorCode } from "@/utils/encryptData";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import localforage from "localforage";
import Cookies from "js-cookie";

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [revealPass, setrevealPass] = useState(false);

  const registerNewUser = useMutation({
    mutationKey: ["new-usercreation"],
    mutationFn: (data: UserAuthProp) => createUser({ data }),
    onSuccess: (successData: any) => {
      const {
        status,
        data: { UserInfo = {}, access_token = "" } = {},
        error: { error = null } = {},
      } = successData;

      if (error === "User already exists.") {
        toast.error(error);
        toast("Look's like you already having an account", {
          icon: "😃",
        });
        return router.push("/login");
      }
      if (isErrorCode.includes(status)) {
        return toast.error(error);
      }
      localforage.setItem("userinfo", UserInfo);
      Cookies.set("access_token", access_token);
      toast.success(`Welcome to TaskOrbit ${UserInfo.name} `);
      router.push('/onboard')
    },
    onError: (e: any) => {
      console.error("Mutation error:", e);

      // Check if the error response exists
      if (e.response?.data?.error) {
        toast.error(e.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formdata = new FormData(e.currentTarget);
      const obj = Object.fromEntries(formdata.entries());
      const updatedObj: UserAuthProp = {
        name:
          typeof obj.emailId === "string" ? obj.emailId?.split("@")[0] : "user",
        password: `${
          typeof obj.password === "string"
            ? await encryptData(obj.password)
            : obj.password
        }`,

        email: `${obj.emailId}`,
      };

      registerNewUser.mutate(updatedObj);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>Create with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  signup with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="emailId"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="flex  justify-center items-center relative">
                    <Input
                      id="password"
                      type={revealPass ? "text" : "password"}
                      name="password"
                      required
                    />
                    <span
                      className="absolute right-4 cursor-pointer p-1"
                      onClick={() => setrevealPass((prev) => !prev)}
                    >
                      {revealPass ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full "
                  disabled={registerNewUser.isPending}
                >
                  {registerNewUser.isPending ? "Loading..." : "Signup"}
                </Button>
              </div>
              <div className="text-center text-sm">
                already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
