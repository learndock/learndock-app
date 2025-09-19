import React from 'react';
import { FAQSection } from '../../components/custom/Error/FAQSection';
import { GenericErrorBanner } from '../../components/custom/Error/GenericErrorBanner';
import { ThemeToggle } from '../../components/custom/Error/ThemeToggle';
import { config401, config403, config500, configUnexpected, ErrorFAQ } from '../../config/Errors.config';

interface GenericErrorPageProps {
  errorCode: string;
}

const GenericErrorPage: React.FC<GenericErrorPageProps> = ({ errorCode }) => {
  const getConfig = (): ErrorFAQ => {
    switch (errorCode) {
      case "401":
        return config401;
      case "403":
        return config403;
      case "500":
        return config500;
      default:
        return configUnexpected;
    }
  }

  const getMessage = (): string => {
    switch (errorCode) {
      case "401":
        return "You are not authorized. Please log in or register and try again.";
      case "403":
        return "You are not allowed to access this resource. If you believe this is a mistake, please contact an administrator.";
      case "500":
        return "An internal server error occured. Please try again later.";
      default:
        return "Something went wrong. Please try again later.";
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:text-white dark:from-[#111827] dark:via-[#1f2937] dark:to-[#0f172a] p-8">
      <ThemeToggle />
      <GenericErrorBanner errorCode={errorCode} message={getMessage()} />
      <FAQSection showSpecial={false} config={getConfig()} />
    </div>
  );
};

export default GenericErrorPage;