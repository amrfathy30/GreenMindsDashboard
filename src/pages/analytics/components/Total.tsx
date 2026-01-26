import { useLanguage } from "../../../api/locales/LanguageContext";
import ComponentCard from "../../../components/common/ComponentCard";

export default function Total({
  totalVideos,
  totalGames,
}: {
  totalVideos: number;
  totalGames: number;
}) {
  const { t } = useLanguage();

  return (
    <ComponentCard title={t("TotalVideosGames")}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[#05A0C3] text-[80px] font-extrabold text-center leading-20">
            {totalVideos}
          </h2>
          <h2 className="text-[#3D3F45] dark:text-white text-[30px] font-extrabold text-center">
            {t("videos")}
          </h2>
        </div>
        <div className="border border-[#0000000D] w-full"></div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[#23B075] text-[80px] font-extrabold text-center leading-20">
            {totalGames}
          </h2>
          <h2 className="text-[#3D3F45] dark:text-white text-[30px] font-extrabold text-center">
            {t("games")}
          </h2>
        </div>
      </div>
    </ComponentCard>
  );
}
