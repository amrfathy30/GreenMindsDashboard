import { useLanguage } from "../../locales/LanguageContext";

export default function Welcome() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[80vh]">
      <img
        src="/images/logo/Greenmindslogo.png"
        alt="Logo"
        width={200}
        height={200}
        className="object-cover"
      />
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {t("welcome")}
      </h1>
    </div>
  );
}
