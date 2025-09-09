import {useQuery} from "react-query";
import {fetchAppData} from "../service/System.service.ts";

export const useAppData = () => {
    const query = useQuery({
        queryKey: ["appData"],
        queryFn: fetchAppData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

    return {
        appData: query.data,
        isLoading: query.isLoading,
        refetch: query.refetch,
        error: query.error,
    };
};
