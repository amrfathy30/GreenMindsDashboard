import PageBreadcrumb from "../../components/common/PageBreadCrumb";
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
        title="Analytics Dashboard | Green minds Admin Dashboard"
        description=""
      />
      <PageBreadcrumb pageTitle="Games" />
      <div className="bg-[#FAFAFA] min-h-screen rounded-tl-3xl rounded-tr-3xl">
        <div className="space-y-5 sm:space-y-6">
          <h2 className="font-medium text-2xl p-4 border text-[#000000] border-[#EDEDED] rounded-tl-3xl rounded-tr-3xl">
            Analytics
          </h2>
          <div className="px-4 pb-4 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UsersChart />
              <GenderChart />
              <Total />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <AgeGroupChart />
              </div>

              <div>
                <PointsDistribution />
              </div>
              <div className="lg:col-span-1">
                <TopRanked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
