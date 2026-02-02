import { useLanguage } from "../../locales/LanguageContext";

export default function UnAuthorized() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="/images/no_data_found.png" alt="Empty state illustration" />
      <h2 className="text-black dark:text-white">{t("access_denied")}</h2>
      <p className="text-gray dark:text-gray-300">
        {t("not_authorized_to_view_this_page")}
      </p>
    </div>
  );
}
