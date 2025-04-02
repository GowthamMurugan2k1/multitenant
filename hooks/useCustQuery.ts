import { useQuery } from "@tanstack/react-query";

interface CustQueryOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
}

// export function useCustQuery<T>({ key, fetchFn }: CustQueryOptions<T>) {
//   const { data, isError, isLoading, refetch } = useQuery({
//     queryKey: [key],
//     queryFn: async () => {
//       const data = await FetchTenantDetails();
//     },
//   });

//   return { data, isError, isLoading, refetch };
// }
