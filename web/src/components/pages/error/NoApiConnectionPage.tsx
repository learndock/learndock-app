import React from 'react';
import { ThemeToggle } from '../../custom/Error/API/ThemeToggle';
import { NoConnectionBanner } from '../../custom/Error/API/NoConnectionBanner';
import { FAQSection } from '../../custom/Error/API/FAQSection';
import BouncingReloadButton from '../../custom/Error/API/BouncingReloadButton';


interface NoApiConnectionPageProps {

}


const NoApiConnectionPage: React.FC<NoApiConnectionPageProps> = () => {
  const [clicks, setClicks] = React.useState(0);

  const activateButton: boolean = clicks != null && clicks >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:text-white dark:from-[#111827] dark:via-[#1f2937] dark:to-[#0f172a] p-8">
      {activateButton && (
        <BouncingReloadButton />
      )}
      <ThemeToggle onToggle={() => setClicks((prev) => prev + 1)} />
      <NoConnectionBanner />
      <FAQSection showExtra={activateButton} />
    </div>
  );
};

export default NoApiConnectionPage;