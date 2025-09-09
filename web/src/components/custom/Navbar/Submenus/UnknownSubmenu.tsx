import React from "react";
import {useLang} from "../../../../hooks/Language.hooks.ts";

const UnknownSubmenu: React.FC = () => {
    const lang = useLang();

    return (
        <div className="p-4">
            <p>{lang("ERROR_UNEXPECTED")}</p>
        </div>
    );
};

export default UnknownSubmenu;
