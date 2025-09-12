import React from "react";

interface NoAPIResponseCardProps {
    className?: string;
}

const NoAPIResponseCard: React.FC<NoAPIResponseCardProps> = ({ className = "" }) => {
    return (
        <div className={`bg-cards text-text-primary rounded-xl ${className}`}>
            <p className="text-error">No API Response. Server still runnning?</p>
        </div>
    );
};

export default NoAPIResponseCard;