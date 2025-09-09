import { FiLoader } from "react-icons/fi";
import { useLang } from "../../hooks/Language.hooks.ts";

export default function HomePage() {
    const lang = useLang();

    const isLoading = false; // This should be replaced with actual loading state logic

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12">
            <div className="text-text-primary hover:text-accent transition-colors duration-300">
                <h1 className="text-2xl font-bold mb-4">
                    {lang("HOMEPAGE_WELCOME")}
                </h1>


                <div className="overflow-hidden">
                    
                </div>
            </div>
        </div>
    )
}
