import { useLanguage } from "../../../../../locales/LanguageContext";

export default function Games() {
    const { t } = useLanguage();

  return (
    <div className="h-full w-full p-4 dark:text-white border  dark:border-gray-700 flex items-center justify-center rounded-[15px]">
      {t("GamesNotAvailable")}
    </div>
  );
}
