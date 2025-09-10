import { useEffect, useState } from "react";
import { FiBookOpen, FiChevronLeft, FiLoader } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import CatalogDetailHeader from "../components/custom/Content/Catalog/CatalogDetailHeader";
import CatalogQuestionSetSection from "../components/custom/Content/Catalog/CatalogQuestionSetSection";
import { useLang } from "../hooks/Language.hooks";
import { getCatalog } from "../service/content/Catalog.service";
import { getQuestionSetsForCatalog } from "../service/content/QuestionSet.service";
import { Catalog, QuestionSet } from "../types/Content.types";
import { validateNumberParam } from "../utils/URLParams.utils";

export default function CatalogDetailPage() {
    const { catalogIdParam } = useParams();
    const catalogId = validateNumberParam("catalogId", catalogIdParam);
    const lang = useLang();
    const navigate = useNavigate();

    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getCatalog(catalogId),
            getQuestionSetsForCatalog(catalogId)
        ]).then(([cat, sets]) => {
            setCatalog(cat);
            setQuestionSets(sets.filter(qs => qs.catalog.id === catalogId));
        }).finally(() => setIsLoading(false));
    }, [catalogId]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    if (!catalog) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center">
                <FiBookOpen className="text-5xl text-error mb-4" />
                <h2 className="text-2xl font-bold text-error mb-2">{lang("CATALOG_DETAIL_NOT_FOUND")}</h2>
                <button
                    className="mt-4 px-6 py-2 rounded bg-primary text-text-primary font-semibold shadow hover:bg-primary-dark transition hover:cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <FiChevronLeft className="inline mr-2" />
                    {lang("COMMON_BACK")}
                </button>
            </div>
        );
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12 bg-gradient-to-br from-background via-cards to-background rounded-xl shadow-2xl">
            <CatalogDetailHeader catalog={catalog} />

            <CatalogQuestionSetSection questionSets={questionSets} />
        </div>
    );
}
