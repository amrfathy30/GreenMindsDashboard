import { useEffect, useState, useRef } from "react";
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
  const { t } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<
    { x: number; y: number; index: number }[]
  >([]);
  const [pieCenter, setPieCenter] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [pieSize, setPieSize] = useState<{ w: number; h: number } | null>(null);
  // const series = [500, 400, 300, 200, 100];
  // const labels = [
  //   t("Level1"),
  //   t("Level2"),
  //   t("Level3"),
  //   t("Level4"),
  //   t("Level5"),
  // ];
  // const colors = ["#FF4906", "#39CEF3", "#39CEF3", "#39CEF3", "#72CA3D"];

  const series =
    levelsStatsData.length > 0
      ? levelsStatsData.map((lvl) => lvl.UsersCount)
      : [0];

  const labels =
    levelsStatsData.length > 0
      ? levelsStatsData.map((lvl) => lvl.LevelName)
      : ["No Data"];

  const colors =
    levelsStatsData.length > 0
      ? levelsStatsData.map((_, i) => baseColors[i % baseColors.length])
      : ["#E5E5E5"];

  const baseColors = ["#FF4906", "#39CEF3", "#72CA3D", "#F7B500", "#9B51E0"];

  const updatePositions = () => {
    if (!containerRef.current) return;

    const svgLabels = containerRef.current.querySelectorAll(
      ".apexcharts-datalabels text",
    );
    const containerRect = containerRef.current.getBoundingClientRect();
    const pieElement = containerRef.current.querySelector(".apexcharts-pie");

    if (pieElement) {
      const pieRect = pieElement.getBoundingClientRect();

      setPieCenter({
        x: pieRect.left - containerRect.left + pieRect.width / 2,
        y: pieRect.top - containerRect.top + pieRect.height / 2,
      });
      setPieSize({
        w: pieRect?.width,
        h: pieRect.height,
      });
    }
    if (svgLabels.length === 0) return;

    const newCoords = Array.from(svgLabels).map((node, i) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        index: i,
      };
    });

    setCoords(newCoords);
  };

  useEffect(() => {
    const timer = setTimeout(updatePositions, 600);
    const observer = new MutationObserver(updatePositions);

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", updatePositions);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      animations: { enabled: false },
      toolbar: { show: false },
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: colors,
    fill: {
      type: "gradient",
    },
    plotOptions: {
      pie: {
        customScale: 0.65,
        donut: { size: "55%" },
        dataLabels: {
          offset: 95,
          minAngleToShowLabel: 0,
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "0px",
        colors: ["transparent"],
      },
      dropShadow: { enabled: false },
    },
    legend: { show: false },
    labels: labels,
    stroke: {
      width: 8,
      colors: ["#ffffff"],
    },
  };

  return (
    <ComponentCard title={t("PointsDistribution")}>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div ref={containerRef} className="relative w-full h-[400px]">
          <Chart options={options} series={series} type="donut" height="100%" />

          {/* Center Money Icon */}
          {pieCenter && pieSize && (
            <div
              className="absolute pointer-events-none flex items-center justify-center rounded-full shadow-xl"
              style={{
                width: `${pieSize.w - 30}px`,
                height: `${pieSize.w - 30}px`,
                left: `${pieCenter.x}px`,
                top: `${pieCenter.y}px`,
                transform: "translate(-47%, -51%)",
              }}
            >
              <img className="w-14 h-14" src="/images/money.png" alt="money" />
            </div>
          )}

          {/* CUSTOM HTML LABELS */}
          {coords.map((pos) => (
            <div
              key={pos.index}
              className="absolute pointer-events-none flex flex-col items-center"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="text-sm font-black whitespace-nowrap"
                style={{ color: colors[pos.index] }}
              >
                {series[pos.index]}
                {t("points")}
              </div>
              <svg
                width="65"
                height="2"
                viewBox="0 0 65 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1H34.9746H65"
                  stroke="#CDCDCD"
                  stroke-width="2"
                  stroke-dasharray="2 2"
                />
              </svg>

              <div className=" text-[12px] font-bold text-black dark:text-white whitespace-nowrap">
                {labels[pos.index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentCard>
  );
}
