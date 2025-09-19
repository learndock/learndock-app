import React from 'react';
import BouncingReloadButton from '../../components/custom/Error/API/BouncingReloadButton';
import { ThemeToggle } from '../../components/custom/Error/ThemeToggle';
import { NoConnectionBanner } from '../../components/custom/Error/API/NoConnectionBanner';
import { FAQSection } from '../../components/custom/Error/FAQSection';
import { noApiConnectionConfig } from '../../config/Errors.config';

const NoApiConnectionPage: React.FC = () => {
  const [clicks, setClicks] = React.useState(0);

  const activateButton: boolean = clicks != null && clicks >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:text-white dark:from-[#111827] dark:via-[#1f2937] dark:to-[#0f172a] p-8">
      {activateButton && (
        <BouncingReloadButton />
      )}
      <ThemeToggle onToggle={() => setClicks((prev) => prev + 1)} />
      <NoConnectionBanner />
      <FAQSection config={noApiConnectionConfig} showSpecial={activateButton} />
    </div>
  );
};

export default NoApiConnectionPage;