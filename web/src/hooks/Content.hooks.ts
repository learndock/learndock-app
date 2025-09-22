import { useMutation, useQuery } from "react-query";
import { getCatalogList, removeCatalog } from "../service/content/Catalog.service";
import { useNavigate } from "react-router";

export const useCatalogs = () => {
    const navigate = useNavigate();

    const listQuery = useQuery({
        queryKey: ["catalogs"],
        queryFn: getCatalogList,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => removeCatalog(id),
        onSuccess: () => {
            listQuery.refetch();
                        navigate("/catalog");
        },
    });

    return {
        listQuery,
        deleteMutation
    }
};