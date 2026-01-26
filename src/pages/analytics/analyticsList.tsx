import PageMeta from "../../components/common/PageMeta";
import AgeGroupChart from "./components/AgeGroupChart";
import GenderChart from "./components/GenderChart";
import PointsDistribution from "./components/PointsDistribution";
import TopRanked from "./components/TopRanked";
import Total from "./components/Total";
import UsersChart from "./components/UsersChart";

export default function Analytics() {
  return (
    <>
      <PageMeta
       title="Green minds Admin | Analytics"
        description=""
      />


<div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-[#adf4b514]  h-[calc(100vh-48px)] dark:bg-neutral-800">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Analytics</h2>

        
        </div>
          <div className="px-4 py-4 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UsersChart />
              <GenderChart />
              <Total />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
              <div className="col-span-1 md:col-span-3">
                <AgeGroupChart />
              </div>

              <div className="col-span-1 md:col-span-3">
                <PointsDistribution />
              </div>
              <div className="col-span-1 md:col-span-2">
                <TopRanked />
              </div>
            </div>
          </div>
        
      </div>
    </>
  );
}
