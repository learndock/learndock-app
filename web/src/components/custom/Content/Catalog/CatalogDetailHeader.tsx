import { FiBookOpen, FiCalendar, FiEdit2, FiSave, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useLang } from "../../../../hooks/Language.hooks";
import { Catalog } from "../../../../types/Content.types";
import { formatDateFromIsoString } from "../../../../utils/Formatting.utils";
import { useUser } from "../../../../hooks/User.hooks";
import { useState } from "react";
import { DeleteCatalogModal } from "./Modals/DeleteCatalogModal";

interface CatalogDetailHeaderProps {
    catalog: Catalog;
    editMode?: boolean;
    onSave?: (values: { title: string; description: string }) => void;
}

export default function CatalogDetailHeader({ catalog, editMode = false, onSave }: CatalogDetailHeaderProps) {
    const navigate = useNavigate();
    const lang = useLang();
    const { user } = useUser();
    const [title, setTitle] = useState(catalog.title ?? "");
    const [description, setDescription] = useState(catalog.description ?? "");
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleSave = () => {
        onSave?.({ title, description });
        navigate(`/catalog/${catalog.id}`);
    };

    const handleCancel = () => {
        navigate(`/catalog/${catalog.id}`);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
                {editMode ? (
                    <div className="flex items-center gap-2 mb-2">
                        <FiBookOpen className="text-5xl mr-2" />
                        <input
                            className="text-4xl font-extrabold text-primary w-full border-b border-borders bg-transparent outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                ) : (
                    <h1 className="text-4xl font-extrabold text-primary mb-2 flex items-center gap-2">
                        <FiBookOpen className="text-5xl mr-4" />
                        {catalog.title}
                    </h1>
                )}

                {editMode ? (
                    <textarea
                        className="text-lg text-text-secondary mt-6 mb-4 w-full border rounded-lg p-2 bg-transparent outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                ) : (
                    <p className="text-lg text-text-secondary mt-6 mb-4">
                        {catalog.description || lang("CATALOG_DETAIL_NO_DESCRIPTION")}
                    </p>
                )}

                <div className="flex items-center gap-6 text-sm text-text-tertiary mb-8">
                    <span className="flex items-center gap-2">
                        <FiCalendar />
                        {lang("CATALOG_DETAIL_CREATED_AT")} {catalog.createdAt ? formatDateFromIsoString(catalog.createdAt) : lang("COMMON_UNKNOWN")}
                    </span>
                    <span className="flex items-center gap-2">
                        <FiEdit2 />
                        {lang("CATALOG_DETAIL_UPDATED_AT")} {catalog.updatedAt ? formatDateFromIsoString(catalog.updatedAt) : lang("COMMON_UNKNOWN")}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-4">
                {user?.roles.includes("MANAGE_CATALOGS") && (
                    editMode ? (
                        <div className="flex gap-3">
                            <button
                                className="px-5 py-2 rounded-lg bg-secondary-accent text-text-primary font-semibold shadow transition cursor-pointer"
                                onClick={handleCancel}
                            >
                                <FiX className="inline mr-2" />
                                {lang("COMMON_CANCEL")}
                            </button>
                            <button
                                className="px-5 py-2 rounded-lg bg-error text-background font-semibold shadow transition"
                                onClick={() => setDeleteOpen(true)}
                            >
                                <FiSave className="inline mr-2" />
                                {lang("COMMON_DELETE")}
                            </button>
                            <button
                                className="px-5 py-2 rounded-lg bg-accent text-background font-semibold shadow transition"
                                onClick={handleSave}
                            >
                                <FiSave className="inline mr-2" />
                                {lang("COMMON_SAVE")}
                            </button>
                        </div>
                    ) : (
                        <button
                            className="px-5 py-2 rounded-lg bg-accent text-background font-semibold shadow transition"
                            onClick={() => navigate(`/catalog/${catalog.id}/edit`)}
                        >
                            <FiEdit2 className="inline mr-2" />
                            {lang("COMMON_EDIT")}
                        </button>
                    )
                )}
            </div>
            <DeleteCatalogModal
                catalog={catalog}
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            />
        </div>
    );
}
