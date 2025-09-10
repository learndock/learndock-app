import { LuScanSearch } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t: lang } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center text-center w-[80%] md:w-[50%] h-[50%] bg-cards shadow-lg rounded-2xl p-6">
        <LuScanSearch className="text-accent text-6xl md:text-9xl mb-4" />
        <h1 className="text-6xl md:text-9xl font-bold text-text-primary">404</h1>
        <p className="text-xl md:text-3xl pt-4 text-text-secondary">{lang('error.page_not_found')}</p>
      </div>
    </div>
  );
}
