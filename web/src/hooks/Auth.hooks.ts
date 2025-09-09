import { useQuery } from "react-query";
import { fetchIsAuthenticated } from "../service/Auth.service";
import { FetchWrapper } from "../core/FetchWrapper";

export const useIsAuthenticated = () => {
  const query = useQuery({
    queryKey: ["auth", "isAuthenticated"],
    queryFn: fetchIsAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // don't retry on 401
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: () => {}
  });

  if(!query.isLoading && !query.data) {
    try {
      FetchWrapper.refreshAuthentication().then((refreshed) => {
        if(!refreshed) return; // User is really not authenticated (no valid refresh token)
        query.refetch();
      });
    } catch { /* Avoid error logging to the console */ }
  }

  window.addEventListener("refetchAuth", () => query.refetch());

  return {
    isAuthenticated: query.data ?? false,
    isLoading: query.isLoading,
    refetch: query.refetch,
    error: query.error,
  };
};
