import  SignupForm  from "@/components/Auth/signup-form"
import ImageComp from "@/components/Custom/ImageComp"



export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
           <ImageComp src={'/logo.svg'} width={200} height={200} alt="Logo-Taskorbit"/>
          </div>
          TaskOrbit
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
