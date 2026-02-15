import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { AgeSector } from "../../../utils/types/analyticType";
import { useLanguage } from "../../../locales/LanguageContext";

export default function BarChartOne({
  ageSectors,
}: {
  ageSectors: AgeSector[];
}) {
  const { t } = useLanguage();
  const isDark = document.documentElement.classList.contains("dark");

  const maxColumns = 12;
  const displayedSectors = ageSectors.slice(0, maxColumns);

  const series = [
    {
      name: t("UsersCount"),
      data: displayedSectors.map((sector) => sector.Count),
    },
  ];

  const options: ApexOptions = {
    colors: ["#8ED6E2"],
    chart: {
      type: "bar",
      height: 300,
      fontFamily: "Outfit, sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "10px",
        colors: [isDark ? "#fff" : "#304758"],
        fontFamily: "Outfit, sans-serif",
      },
    },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: displayedSectors.map((sector) => sector.DisplayName),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (val: string) =>
          val.length > 8 ? val.slice(0, 8) + "..." : val,
        style: {
          fontSize: "8px",
          fontFamily: "Outfit, sans-serif",
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar h-full">
      <div id="chartOne">
        <Chart options={options} series={series} type="bar" height={300} />
      </div>
    </div>
  );
}
