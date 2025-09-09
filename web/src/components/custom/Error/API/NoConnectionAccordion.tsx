import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type AccordionItemProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
    titleClassName?: string;
    iconClassName?: string;
    contentClassName?: string;
};

export const AccordionItem = ({
    title,
    children,
    className = "",
    titleClassName = "",
    iconClassName = "",
    contentClassName = "",
}: AccordionItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`${className}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center py-4 px-4 bg-cards hover:bg-accent transition"
            >
                <span className={`text-left font-medium text-text-primary ${titleClassName}`}>
                    {title}
                </span>
                <FaChevronDown
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""} ${iconClassName}`}
                />
            </button>
            {open && (
                <div className={`px-4 pb-4 text-text-secondary ${contentClassName}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export const Accordion = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl 
      bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md 
      border border-gray-200 dark:border-[#1e1e1e]
      divide-y divide-borders ${className}`}
      data-avoid
    >
        {children}
    </div>
);
