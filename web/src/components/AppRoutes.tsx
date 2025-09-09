import { Route, Routes } from "react-router";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/lib/NotFoundPage";
import Navbar from "./custom/Navbar/Navbar";
import Sidebar from "./custom/Sidebar/Sidebar";
import { getStorageValue, setStorageValue } from "../storage/StorageProvider.ts";

export default function AppRoutes() {
    const [sidebarLocked, setSidebarLocked] = useState<boolean>(getStorageValue("sidebarLocked") as boolean);

    function changeSidebarLock(locked: boolean) {
        setSidebarLocked(locked);
        setStorageValue("sidebarLocked", locked);
    }

    return (
        <div className="flex min-h-screen max-h-screen max-w-screen bg-background text-text-primary">
            <Sidebar locked={sidebarLocked} />
            <div className={`flex flex-col w-full min-w-0 transition-all duration-300 ${sidebarLocked ? "ml-60" : "ml-20"}`}>
                <Navbar onSidebarToggle={() => changeSidebarLock(!sidebarLocked)} />

                <main className="flex-1 overflow-auto mt-16 p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
