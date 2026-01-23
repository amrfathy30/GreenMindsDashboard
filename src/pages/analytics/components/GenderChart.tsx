import Chart from "react-apexcharts";
import ComponentCard from "../../../components/common/ComponentCard";

export default function GenderChart() {
  const series = [65, 195];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Male", "Female"],
    colors: ["#79BEFF", "#FA5A9F"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
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
              label: "Users",
              fontSize: "28px",
              fontWeight: 800,
              formatter: () => "260",
            },
          },
        },
      },
    },
  };

  return (
    <ComponentCard title="Users by Gender">
      <div className="flex justify-center">
        <Chart options={options} series={series} type="donut" width={260} />
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#79BEFF]"></span>
            <span>Male</span>
          </div>
          <span className="text-gray-500">25% · 65 Gender</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#FA5A9F]"></span>
            <span>Female</span>
          </div>
          <span className="text-gray-500">75% · 195 Gender</span>
        </div>
      </div>
    </ComponentCard>
  );
}
