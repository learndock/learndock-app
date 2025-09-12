import React from "react";

interface SimpleCardProps {
    children: React.ReactNode;
    className?: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ children, className = "" }) => {
    return (
        <div className={`bg-cards text-text-primary p-4 rounded-xl ${className}`}>
            {children}
        </div>
    );
};

export default SimpleCard;