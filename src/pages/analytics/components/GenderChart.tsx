import Chart from "react-apexcharts";
import ComponentCard from "../../../components/common/ComponentCard";
import { GenderStats } from "../../../utils/types/analyticType";
import { useLanguage } from "../../../api/locales/LanguageContext";

export default function GenderChart({
  genderPercentage,
}: {
  genderPercentage: GenderStats[];
}) {
  const { t } = useLanguage();
  if (!genderPercentage || genderPercentage.length === 0) return null;

  const male = genderPercentage.find((g) => g.GenderId === null)?.Count || 0;
  const female = genderPercentage.find((g) => g.GenderId === 1)?.Count || 0;

  const malePercentage =
    genderPercentage.find((g) => g.GenderId === null)?.Percentage || 0;
  const femalePercentage =
    genderPercentage.find((g) => g.GenderId === 1)?.Percentage || 0;

  const series = [male, female];

  const options: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: [t("Male"), t("Female")],
    colors: ["#79BEFF", "#FA5A9F"],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: 800,
              color: "#111827",
            },
            total: {
              show: true,
              label: t("pageTitle"),
              fontSize: "28px",
              fontWeight: 800,
              formatter: () => (male + female).toString(),
            },
          },
        },
      },
    },
  };

  return (
    <ComponentCard title={t("UsersByGender")}>
      <div className="flex justify-center">
        <Chart options={options} series={series} type="donut" width={260} />
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#79BEFF]"></span>
            <span> {t("Male")}</span>
          </div>
          <span className="text-gray-500">
            {malePercentage}% · {male} {t("pageTitle")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#FA5A9F]"></span>
            <span>{t("Female")}</span>
          </div>
          <span className="text-gray-500">
            {femalePercentage}% · {female} {t("pageTitle")}
          </span>
        </div>
      </div>
    </ComponentCard>
  );
}
