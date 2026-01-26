import ComponentCard from "../../../components/common/ComponentCard";
import BarChartOne from "../../../components/charts/bar/BarChartOne";
import { AgeSector } from "../../../utils/types/analyticType";
import { useLanguage } from "../../../api/locales/LanguageContext";

export default function AgeGroupChart({
  usersByAgeSector,
}: {
  usersByAgeSector: AgeSector[];
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 h-full">
      <ComponentCard title={t("UsersByAgeGroup")}>
        <BarChartOne ageSectors={usersByAgeSector} />
      </ComponentCard>
    </div>
  );
}
