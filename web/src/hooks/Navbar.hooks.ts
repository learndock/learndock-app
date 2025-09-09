import { useNavigate } from "react-router";
import {logout} from "../service/Auth.service.ts";

export const useNavbarHandlers = (setShowLogin: (v: boolean) => void) => {
    const navigate = useNavigate();

    return {
        openLogin: () => setShowLogin(true),
        handleLogout: () => {
            logout().then(() => {
                window.location.reload();
            });
        },
        handleSettingsClick: () => navigate("/settings"),
        handleProfileClick: () => navigate("/profile"),
    };
};
