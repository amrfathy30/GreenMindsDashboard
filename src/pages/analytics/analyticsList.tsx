/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AgeGroupChart from "./components/AgeGroupChart";
import GenderChart from "./components/GenderChart";
import PointsDistribution from "./components/PointsDistribution";
import TopRanked from "./components/TopRanked";
import Total from "./components/Total";
import UsersChart from "./components/UsersChart";
import {
  AgeSector,
  GenderStats,
  LevelStats,
  ParentChildStatsResponse,
  TopRankedUser,
} from "../../utils/types/analyticType";
import {
  GenderPercentage,
  levelsStats,
  ParentChildStats,
  TopRanksData,
  TotalGames,
  TotalVideos,
  UsersByAgeSector,
} from "../../api/services/analyticService";
import { toast } from "sonner";
import { useLanguage } from "../../api/locales/LanguageContext";
import {
  BarChartOneSkeleton,
  GenderChartSkeleton,
  PointsDistributionSkeleton,
  TopRankedSkeleton,
  TotalSkeleton,
} from "../../components/loading/AnalyticChartSkeleton";

export default function Analytics() {
  const { t } = useLanguage();
  // parentChildStats
  const [parentChildStats, setParentChildStats] = useState<{
    TotalParents: number;
    TotalChildren: number;
    ParentPercentage: number;
    ChildPercentage: number;
  } | null>(null);
  const [loadingParentChildStats, setLoadingParentChildStats] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingParentChildStats(true);
        const data: ParentChildStatsResponse = await ParentChildStats();

        setParentChildStats(data.Data);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingParentChildStats(false);
      }
    };

    fetchData();
  }, [t]);

  // genderPercentage
  const [genderPercentage, setGenderPercentage] = useState<GenderStats[]>([]);
  const [loadingGender, setLoadingGender] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingGender(true);
        const data: {
          StatusCode: number;
          Message: string;
          Data: GenderStats[];
        } = await GenderPercentage();

        setGenderPercentage(data.Data);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingGender(false);
      }
    };

    fetchData();
  }, [t]);

  // usersByAgeSector
  const [usersByAgeSector, setUsersByAgeSector] = useState<AgeSector[]>([]);
  const [loadingUsersByAgeSector, setLoadingUsersByAgeSector] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUsersByAgeSector(true);
        const data: { StatusCode: number; Message: string; Data: AgeSector[] } =
          await UsersByAgeSector();

        setUsersByAgeSector(data.Data);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingUsersByAgeSector(false);
      }
    };

    fetchData();
  }, [t]);

  // totalVideos
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [loadingTotalVideos, setLoadingTotalVideos] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTotalVideos(true);
        const data: { StatusCode: number; Message: string; Data: number } =
          await TotalVideos();
        setTotalVideos(data.Data);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingTotalVideos(false);
      }
    };
    fetchData();
  }, [t]);

  // TotalGames
  const [totalGames, setTotalGames] = useState<number>(0);
  const [loadingTotalGames, setLoadingTotalGames] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTotalGames(true);
        const data: { StatusCode: number; Message: string; Data: number } =
          await TotalGames();
        setTotalGames(data.Data);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingTotalGames(false);
      }
    };
    fetchData();
  }, [t]);

  // TopRanks
  const [topRanks, setTopRanks] = useState<TopRankedUser[]>([]);
  const [loadingTopRanks, setLoadingTopRanks] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTopRanks(true);
        const data: {
          StatusCode: number;
          Message: string;
          Data: TopRankedUser[];
        } = await TopRanksData();
        setTopRanks(data.Data || []);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingTopRanks(false);
      }
    };
    console.log(topRanks)
    fetchData();
  }, [t]);

  // levelsStats
  const [levelsStatsData, setLevelsStatsData] = useState<LevelStats[]>([]);
  const [loadingLevelsStats, setLoadingLevelsStats] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingLevelsStats(true);
        const data: {
          StatusCode: number;
          Message: string;
          Data: LevelStats[];
        } = await levelsStats();
        setLevelsStatsData(data.Data || []);
      } catch (error) {
        toast.error(t("failed_load_level"));
      } finally {
        setLoadingLevelsStats(false);
      }
    };
    fetchData();
  }, [t]);

  return (
    <>
      <PageMeta title="Green minds Admin | Analytics" description="" />

      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("analytics")}
          </h2>
        </div>
        <div className="px-4 py-4 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loadingParentChildStats ? (
              <GenderChartSkeleton />
            ) : (
              <UsersChart parentChildStats={parentChildStats} />
            )}

            {loadingGender ? (
              <GenderChartSkeleton />
            ) : (
              <GenderChart genderPercentage={genderPercentage} />
            )}

            {loadingTotalVideos || loadingTotalGames ? (
              <TotalSkeleton />
            ) : (
              <Total totalVideos={totalVideos} totalGames={totalGames} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="col-span-1 md:col-span-3">
              {loadingUsersByAgeSector ? (
                <BarChartOneSkeleton />
              ) : (
                <AgeGroupChart usersByAgeSector={usersByAgeSector} />
              )}
            </div>

            <div className="col-span-1 md:col-span-3">
              {loadingLevelsStats ? (
                <PointsDistributionSkeleton />
              ) : (
                <PointsDistribution levelsStatsData={levelsStatsData} />
              )}
            </div>
            <div className="col-span-1 md:col-span-2">
              {loadingTopRanks ? (
                <TopRankedSkeleton />
              ) : (
                <TopRanked topRanks={topRanks}  />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
