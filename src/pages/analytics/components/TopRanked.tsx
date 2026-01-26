import { Link } from "react-router";
import ComponentCard from "../../../components/common/ComponentCard";
import { ArrowRightIcon } from "lucide-react";
import { useLanguage } from "../../../api/locales/LanguageContext";

export default function TopRanked({  }) {
  const { t } = useLanguage();
  return (
    <ComponentCard title={t("TopRanked")}>
      <div className="flex justify-between items-center gap-1 mb-6">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src="/images/child.png"
            alt="child-image"
          />
          <div>
            <h2 className="text-sm dark:text-white">ahmed</h2>
            <h2 className="text-sm text-[#8E9ABB]">900 points</h2>
          </div>
        </div>
        <img
          className="w-8 h-8 object-cover"
          src="/images/first.png"
          alt="first"
        />
      </div>
      <Link
        to="/"
        className="flex items-center gap-1 justify-end text-[#356CF9] text-sm hover:underline"
      >
        <span>{t("SeeAll")}</span>
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </ComponentCard>
  );
}
