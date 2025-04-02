'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
 
const NprogressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider 
      height="4px"
      color="#fff"
      options={{ showSpinner: true }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default NprogressProviders;