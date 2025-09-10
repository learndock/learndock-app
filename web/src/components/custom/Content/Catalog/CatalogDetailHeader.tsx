import { FiBookOpen, FiCalendar, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useLang } from "../../../../hooks/Language.hooks";
import { Catalog } from "../../../../types/Content.types";

interface CatalogDetailHeaderProps {
    catalog: Catalog;
}

export default function CatalogDetailHeader({ catalog }: CatalogDetailHeaderProps) {
    const navigate = useNavigate();
    const lang = useLang();

    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-primary mb-2 flex items-center gap-2">
                    <FiBookOpen className="text-5xl mr-4" />
                    {catalog.title}
                </h1>
                <p className="text-lg text-text-secondary mt-6 mb-4">{catalog.description || lang("CATALOG_DETAIL_NO_DESCRIPTION")}</p>
                <div className="flex items-center gap-6 text-sm text-text-tertiary mb-8">
                    <span className="flex items-center gap-2">
                        <FiCalendar />
                        {lang("CATALOG_DETAIL_CREATED_AT")}: {catalog.createdAt ? new Date(catalog.createdAt).toLocaleDateString() : lang("COMMON_UNKNOWN")}
                    </span>
                    <span className="flex items-center gap-2">
                        <FiEdit2 />
                        {lang("CATALOG_DETAIL_UPDATED_AT")}: {catalog.updatedAt ? new Date(catalog.updatedAt).toLocaleDateString() : lang("COMMON_UNKNOWN")}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-4">
                <button
                    className="px-5 py-2 rounded-lg bg-accent text-background font-semibold shadow hover:bg-primary-dark transition"
                    onClick={() => navigate(`/catalogs/${catalog.id}/edit`)}
                >
                    <FiEdit2 className="inline mr-2" />
                    {lang("CATALOG_DETAIL_EDIT")}
                </button>
            </div>
        </div>
    );
}
