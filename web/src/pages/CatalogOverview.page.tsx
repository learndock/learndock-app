import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import CatalogCard from "../components/custom/Content/Catalog/CatalogCard";
import ActionButton from "../components/lib/Buttons/Action.Button";
import SearchBar from "../components/lib/Form/SearchBar";
import { useLang } from "../hooks/Language.hooks";
import { getCatalogList } from "../service/content/Catalog.service";
import { getSelf } from "../service/User.service";
import { useIsAuthenticated } from "../hooks/Auth.hooks";


export default function CatalogOverviewPage() {
    const lang = useLang();
    const { isAuthenticated } = useIsAuthenticated();

    const { data: catalogs, isLoading } = useQuery("catalogs", () => {
        return getCatalogList();
    });

    const { data: user, isLoading: isUserLoading } = useQuery("user", () => {
        return getSelf();
    }, {
        enabled: isAuthenticated
    });

    const [searchInput, setSearchInput] = useState("");
    const [filteredCatalogs, setFilteredCatalogs] = useState(catalogs);

    useEffect(() => {
        if (catalogs) {
            setFilteredCatalogs(
                catalogs.filter((catalog) =>
                    catalog.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    (catalog.description && catalog.description.toLowerCase().includes(searchInput.toLowerCase()))
                )
            );
        }
    }, [searchInput, catalogs]);

    if (isLoading || isUserLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-1 justify-center flex">
            <div className="w-full max-w-4xl flex flex-col gap-4">
                <div className="mb-6">
                    <h1 className="text-3xl mb-2 font-bold text-text-primary">{lang('CATALOG_OVERVIEW_TITLE')}</h1>
                    <p className="text-text-muted">{lang('CATALOG_OVERVIEW_SHORT_DESCRIPTION')}</p>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-full">
                        <SearchBar
                            id="catalog-search"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            placeholder={lang('COMMON_SEARCH_PLACEHOLDER')}
                        />
                    </div>
                    {user?.roles.includes("MANAGE_CATALOGS") && (
                        <div className="w-[20%] flex ml-6 justify-end">
                            <ActionButton icon={MdAdd}>{lang('COMMON_ADD')}</ActionButton>
                        </div>
                    )}
                </div>
                {filteredCatalogs != null && filteredCatalogs.length > 0 ? (
                    filteredCatalogs.map((catalog) => (
                        <CatalogCard catalog={catalog} />
                    ))
                ) : (
                    <div className="text-text-primary text-center mt-6">{lang('CATALOG_NO_CATALOGS')}</div>
                )}
            </div>
        </div>
    )
}
