import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { navbarDropdownItems } from "../../../config/Navbar.config";
import { useIsAuthenticated } from "../../../hooks/Auth.hooks.ts";
import { useLang } from "../../../hooks/Language.hooks.ts";
import { useNavbarHandlers } from "../../../hooks/Navbar.hooks";
import IconButton from "../../lib/Buttons/IconButton.tsx";
import { Dropdown } from "../../lib/Dropdown/Dropdown.tsx";
import { LoginModal } from "../Auth/LoginModal";
import { RegisterModal } from "../Auth/RegisterModal";
import { buildNavbarDropdownItems } from "./DropdownMenuItems";
import NavbarSearch from "./NavbarSearch";
import NotificationsMenu from "./Notifications/NotificationsMenu.tsx";

interface NavbarProps {
    onSidebarToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
    const lang = useLang();
    const { isAuthenticated } = useIsAuthenticated();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handlers = useNavbarHandlers(setShowLogin);

    const dropdownItems = buildNavbarDropdownItems(
        navbarDropdownItems,
        lang,
        isAuthenticated,
        handlers,
        {
            closeDropdown: () => setIsDropdownOpen(false),
        }
    );

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background flex items-center justify-between px-2 md:pr-4">
                <div className="flex items-center space-x-4">
                    <IconButton
                        aria-label="Menu"
                        className="hidden md:inline-flex text-2xl"
                        icon={<HiOutlineMenu />}
                        onClick={onSidebarToggle}
                    />
                    <div className="flex items-center">{/* Logo here */}</div>
                </div>

                <div className="flex-1 flex justify-center px-4 lg:px-8">
                    <NavbarSearch />
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">  
                    <NotificationsMenu />
                    <Dropdown
                        icon={<IoPersonCircleOutline size={24} />}
                        items={dropdownItems}
                        isOpen={isDropdownOpen}
                        onOpenChange={setIsDropdownOpen}
                    />
                </div>
            </nav>

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitch={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                }}
            />
            <RegisterModal
                isOpen={showRegister}
                onClose={() => setShowRegister(false)}
                onSwitch={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                }}
            />
        </>
    );
};

export default Navbar;
