import React, { ReactNode } from "react";

export interface TreeTableRow {
    id: number | string;
    cells: ReactNode[];
    expanded?: boolean;
    expandedElement?: ReactNode;
}

interface TreeTableProps {
    columns: string[];
    rows: TreeTableRow[];
    onToggleExpand?: (id: number | string) => void;
    renderExpandIcon?: (expanded: boolean) => ReactNode;
}

export default function TreeTable({
    columns,
    rows,
    onToggleExpand,
    renderExpandIcon,
}: TreeTableProps) {
    const renderRows = (rows: TreeTableRow[], level = 0) =>
        rows.map(row => (
            <React.Fragment key={row.id}>
                <tr className="border-t border-borders hover:bg-background transition">
                    {row.cells.map((cell, idx) => (
                        <td
                            key={idx}
                            className={`p-3 ${idx === 0 ? `pl-${level * 16}` : ""} items-center gap-2`}
                            onClick={idx === 0 && onToggleExpand ? () => onToggleExpand(row.id) : undefined}
                        >
                            <span className="flex items-center gap-2">
                                {idx === 0 && renderExpandIcon
                                    ? renderExpandIcon(!!row.expanded)
                                    : null}
                                {cell}
                            </span>
                        </td>
                    ))}
                </tr>
                {row.expanded && row.expandedElement && (
                    <tr>
                        <td colSpan={columns.length} className="p-0">
                            {row.expandedElement}
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ));

    return (
        <table className="w-full border border-borders rounded-xl overflow-hidden">
            <thead className="bg-cards text-left">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="p-3">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{renderRows(rows)}</tbody>
        </table>
    );
}