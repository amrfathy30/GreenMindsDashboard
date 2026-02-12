import Chart from "react-apexcharts";
import ComponentCard from "../../../components/common/ComponentCard";
import { useLanguage } from "../../../locales/LanguageContext";

export default function UsersChart({
  parentChildStats,
}: {
  parentChildStats: {
    TotalParents: number;
    TotalChildren: number;
    ParentPercentage: number;
    ChildPercentage: number;
  } | null;
}) {
  const { t } = useLanguage();

  if (!parentChildStats) return null;

  const series = [
    parentChildStats.TotalParents,
    parentChildStats.TotalChildren,
  ];

  const options: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: [t("parentsTab"), t("Children")],
    colors: ["#22c55e", "#3b82f6"],
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
              fontSize: "18px",
              fontWeight: 800,
              color: "#111827",
            },
            total: {
              show: true,
              label: t("pageTitle"),
              fontSize: "18px",
              fontWeight: 800,
              formatter: () =>
                (
                  parentChildStats.TotalParents + parentChildStats.TotalChildren
                ).toString(),
            },
          },
        },
      },
    },
  };

  return (
    <ComponentCard title={t("UsersByAccount")}>
      <div className="flex justify-center">
        <Chart options={options} series={series} type="donut" width={260} />
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3 text-sm">     
      <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-500"></span>
            <span className="text-gray-700 dark:text-gray-200">{t("parentsTab")}</span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            {parentChildStats.ParentPercentage}% · {parentChildStats.TotalParents} {t("pageTitle")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-500"></span>
            <span className="text-gray-700 dark:text-gray-200">{t("Children")}</span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            {parentChildStats.ChildPercentage}% · {parentChildStats.TotalChildren} {t("pageTitle")}
          </span>
        </div>
        </div>
    </ComponentCard>
  );
}
