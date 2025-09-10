import { useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { useNavigate } from "react-router";
import { Catalog } from "../../../../types/Content.types";
import { darkenColor } from "../../../../utils/Colors.utils";
import { formatDateFromIsoString } from "../../../../utils/Formatting.utils";

interface CatalogCardProps {
  catalog: Catalog;
}

export default function CatalogCard({ catalog }: CatalogCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const baseColor =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-cards")
      .trim();

  const backgroundColor = hovered ? darkenColor(baseColor, 8) : baseColor;

  return (
    <div
      key={catalog.id}
      className="p-4 rounded-lg text-text-primary transition-colors duration-300 flex justify-between items-center cursor-pointer"
      style={{ backgroundColor }}
      onClick={() => navigate(`/catalog/${catalog.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col w-full overflow-hidden">
        <div className="text-lg font-semibold flex items-center gap-2 w-full">
          <div className="flex items-center gap-2 max-w-full">
            {catalog.title}
          </div>
        </div>
        {catalog.description && (
          <div className="text-sm text-text-secondary mt-1 line-clamp-2">
            {catalog.description}
          </div>
        )}
        <div className="flex gap-2 mt-3 text-sm text-text-secondary flex-wrap">
          {catalog.updatedAt && (
            <span className="flex items-center gap-2 px-3 py-1 bg-background rounded-md">
              <HiOutlineClock /> {formatDateFromIsoString(catalog.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
