import { useState } from "react";
import { FiLoader, FiTrash2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { AddCompetenceModal } from "../components/custom/Content/Catalog/Modals/AddCompetenceModal";
import { DeleteCompetenceModal } from "../components/custom/Content/Catalog/Modals/DeleteCompetenceModal";
import ActionButton from "../components/lib/Buttons/Action.Button";
import SearchBar from "../components/lib/Form/SearchBar";
import { useLang } from "../hooks/Language.hooks";
import { searchCompetences } from "../service/content/Competence.service";
import { Competence } from "../types/Content.types";
import { useUser } from "../hooks/User.hooks";

export default function CompetenceOverviewPage() {
    const lang = useLang();
    const navigate = useNavigate();
    const { user } = useUser();

    const [searchInput, setSearchInput] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: competences, isLoading } = useQuery<Competence[]>(
        ["competences", searchInput],
        () => searchCompetences(searchInput),
        {
            keepPreviousData: true,
            select: (res) => res.slice(0, 100),
        }
    );

    const hasMore = (competences?.length ?? 0) >= 100;

    return (
        <div className="h-full px-6 py-10 flex justify-center">
            <div className="w-full max-w-7xl flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">{lang("COMPETENCE_OVERVIEW_TITLE")}</h1>
                        <p className="text-text-muted">{lang("COMPETENCE_OVERVIEW_SHORT_DESCRIPTION")}</p>
                    </div>
                    {user?.roles.includes("MANAGE_COMPETENCES") && (
                        <div className="roles">
                            <ActionButton icon={MdAdd} onClick={() => setIsAddModalOpen(true)}>
                                {lang("COMMON_ADD")}
                            </ActionButton>
                        </div>
                    )}
                </div>

                <SearchBar
                    key="competence-search"
                    id="competence-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={lang("COMMON_SEARCH_PLACEHOLDER")}
                />

                {isLoading ? (
                    <div className="h-[50vh] flex items-center justify-center">
                        <FiLoader className="animate-spin text-4xl text-text-primary" />
                    </div>
                ) : competences && competences.length > 0 ? (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {competences.map((c) => (
                                <div
                                    key={c.id}
                                    className="relative p-5 rounded-2xl bg-cards border border-borders shadow-sm hover:shadow-md transition cursor-pointer group flex flex-row items-center"
                                    onClick={() => navigate(`/competence/${c.id}`)}
                                >
                                    {user?.roles.includes("MANAGE_COMPETENCES") && (
                                        <div
                                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-borders transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteId(c.id);
                                            }}
                                        >
                                            <FiTrash2 className="text-text-secondary" />
                                        </div>
                                    )}
                                    <h2 className="text-lg font-semibold text-text-primary truncate">{c.title}</h2>
                                </div>
                            ))}
                        </div>
                        {hasMore && (
                            <div className="text-center my-4 text-warning font-medium pb-4">
                                {lang("COMPETENCE_SEARCH_TRUNCATED")}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-text-primary text-center mt-6">
                        {lang("COMPETENCE_NO_RESULTS")}
                    </div>
                )}
            </div>

            <AddCompetenceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            {
                deleteId && (
                    <DeleteCompetenceModal
                        isOpen={!!deleteId}
                        competenceId={deleteId}
                        onClose={() => setDeleteId(null)}
                    />
                )
            }
        </div >
    );
}
