export const formatDateFromIsoString = (isoString: string): string => {
    if(!isoString) return "-";
    return formatDate(new Date(isoString));
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};