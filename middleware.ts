import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



const protected_Routes = ['/onboard','/root']

export function middleware(request: NextRequest) {

  const access_token = request.cookies.get('access_token')
  
  // const pathname = request.nextUrl.pathname;
  // const credentials = getUserCredentials(request);

   if(!access_token?.value ){
     return NextResponse.redirect(new URL('/login' ,request.url))
   }

 
//   return NextResponse.redirect(new URL("/home", request.url));
}


export const config = {
  matcher: ["/"]
};
    