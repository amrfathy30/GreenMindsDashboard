import BarChartOne from "../../../components/charts/bar/BarChartOne";
import ComponentCard from "../../../components/common/ComponentCard";

export default function AgeGroupChart() {
  return (

      <div className="space-y-6 h-full">
        <ComponentCard title="Users by age group">
          <BarChartOne />
        </ComponentCard>
      </div>

  );
}
