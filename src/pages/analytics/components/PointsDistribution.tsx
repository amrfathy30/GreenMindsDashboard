import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ComponentCard from "../../../components/common/ComponentCard";
import { useLanguage } from "../../../locales/LanguageContext";
import { LevelStats } from "../../../utils/types/analyticType";

export default function PointsDistribution({
  levelsStatsData,
}: {
  levelsStatsData: LevelStats[];
}) {
  const originalColors = [
    "#F7B500",
    "#FF4906",
    "#39CEF3",
    "#72CA3D",
    "#9B51E0",
    "#FA5A9F",
  ];
  const { t } = useLanguage();

  const sortedData = [...levelsStatsData].sort(
    (a, b) => b.UsersCount - a.UsersCount,
  );

  const series =
    sortedData.length > 0 ? sortedData.map((lvl) => lvl.UsersCount) : [0];
  const labels =
    sortedData.length > 0
      ? sortedData.map((lvl) => lvl.LevelName)
      : ["No Data"];
  const chartColors = sortedData.map(
    (_, i) => originalColors[i % originalColors.length],
  );

  const options: ApexOptions = {
    chart: {
      type: "donut",
      animations: { enabled: true },
      toolbar: { show: false },
    },
    colors: chartColors,
    fill: {
      type: "gradient",
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "70%",
          labels: { show: false },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    labels: labels,
    stroke: {
      width: 2,
      colors: ["#ffffff10"],
    },
  };

  const hasData =
    sortedData &&
    sortedData.length > 0 &&
    sortedData.some((lvl) => lvl.UsersCount > 0);

  return (
    <ComponentCard title={t("PointsDistribution")}>
      <div className="flex flex-col h-full">
        {!hasData ? (
          <div className="flex items-center justify-center h-87.5 text-gray-500 text-lg font-semibold">
            {t("NoData")}
          </div>
        ) : (
          <>
            <div className="relative flex justify-center items-center h-70">
              <Chart
                key={JSON.stringify(series)}
                options={options}
                series={series}
                type="donut"
                width="350"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  className="w-20 h-20"
                  src="/images/money.png"
                  alt="money"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2 px-2 grid grid-cols-1 md:grid-cols-2">
              {sortedData.map((lvl, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start py-1 border-b border-gray-100 dark:border-gray-800 h-full justify-center"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: chartColors[index] }}
                    ></span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-20">
                      {lvl.LevelName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 ">
                    <span className="w-3 h-3 rounded-full shrink-0"></span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {lvl.UsersCount}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        {t("points")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ComponentCard>
  );
}
