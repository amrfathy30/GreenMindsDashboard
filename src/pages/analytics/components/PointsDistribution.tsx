import Chart from "react-apexcharts";
import ComponentCard from "../../../components/common/ComponentCard";

export default function PointsDistribution() {
  const series = [20, 30, 40, 50, 60];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
    },
    colors: [
      "#9BE15D", // Level 1
      "#38BDF8", // Level 2
      "#22D3EE", // Level 3
      "#38BDF8", // Level 4
      "#FF6A2A", // Level 5
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "45%",
        },
        track: {
          background: "#f3f4f6",
          margin: 8,
        },
        dataLabels: {
          show: false,
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["L1", "L2", "L3", "L4", "L5"],
  };

  return (
    <ComponentCard title="Points Distribution">
      <div className="relative flex justify-center">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={320}
        />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          <img className="w-14 h-14" src="/images/money.png" alt="money" />
        </div>
      </div>

      {/* Labels */}
      {/* <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-green-500 font-bold">100 Points</span>
          <div>Level 1</div>
        </div>
        <div className="text-right">
          <span className="text-orange-500 font-bold">500 Points</span>
          <div>Level 5</div>
        </div>
        <div>
          <span className="text-sky-400 font-bold">200 Points</span>
          <div>Level 2</div>
        </div>
        <div className="text-right">
          <span className="text-cyan-400 font-bold">400 Points</span>
          <div>Level 4</div>
        </div>
        <div>
          <span className="text-cyan-500 font-bold">300 Points</span>
          <div>Level 3</div>
        </div>
      </div> */}
    </ComponentCard>
  );
}
