import React from "react";

function Loader({LoadTxt}:{LoadTxt?:string}) {
  return (
    <div
      className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-[var(--color-primary)] rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">{LoadTxt ? LoadTxt :"Loading..."}</span>
    </div>
  );
}

export default Loader;
