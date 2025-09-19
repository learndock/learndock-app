import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getStorageValue, setStorageValue } from "./storage/StorageProvider";
import Sidebar from "./components/custom/Sidebar/Sidebar";
import Navbar from "./components/custom/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/lib/NotFoundPage";
import CatalogOverviewPage from "./pages/CatalogOverview.page";
import CatalogDetailPage from "./pages/CatalogDetail.page";
import TechnicalDashboard from "./pages/TechnicalDashboard.page";
import CompetenceDetailPage from "./pages/ComptetenceDetail.page";
import GenericErrorPage from "./pages/error/GenericErrorPage";

export default function AppRoutes() {
    const location = useLocation();
    const [errorCode, setErrorCode] = useState<string>("");
    const [sidebarLocked, setSidebarLocked] = useState<boolean>(getStorageValue("sidebarLocked") as boolean);

    useEffect(() => {
        fetch(window.location.pathname, { method: "HEAD" })
            .then((res) => {
                const code = res.headers.get("X-Frontend-Error-Code");
                if (code) setErrorCode(code);
                else setErrorCode("");
            })
            .catch(() => setErrorCode("500"));
    }, [location]);

    function changeSidebarLock(locked: boolean) {
        setSidebarLocked(locked);
        setStorageValue("sidebarLocked", locked);
    }

    if (errorCode) {
        console.log(location, errorCode)
        return <GenericErrorPage errorCode={errorCode} />
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
                        <Route path="/technical" element={<TechnicalDashboard />} />
                        <Route path="/catalog" element={<CatalogOverviewPage />} />
                        <Route path="/catalog/:catalogIdParam/:mode?" element={<CatalogDetailPage />} />
                        <Route path="/competence/:competenceIdParam" element={<CompetenceDetailPage />} />
                        <Route path="/competence/:competenceIdParam/:mode?" element={<CompetenceDetailPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
