import ComponentCard from "../../../components/common/ComponentCard";
import { useLanguage } from "../../../locales/LanguageContext";

export default function TopRanked({
  topRanks,
}: {
  topRanks: {
    userId: number;
    userName: string;
    totalPoints: number;
    levelId: number;
    levelName: string;
  }[];
}) {
  const { t } = useLanguage();

  return (
    <ComponentCard title={t("TopRanked")}>
      {topRanks.length === 0 ? (
        <div className="text-gray-400 text-sm flex items-center w-full justify-center py-6">
          {t("NoData")}
        </div>
      ) : (
        topRanks.slice(0, 5).map((user, index) => (
          <div
            key={user.userId}
            className="flex justify-between items-center gap-1 mb-6"
          >
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full"
                src="/images/child.png"
                alt="child-image"
              />
              <div>
                <h2 className="text-sm dark:text-white">{user.userName}</h2>
                <h2 className="text-sm text-[#8E9ABB]">
                  {user.totalPoints} points
                </h2>
              </div>
            </div>
            <img
              className="w-8 h-8 object-cover"
              src={
                index === 0
                  ? "/images/first.png"
                  : index === 1
                    ? "/images/second.png"
                    : "/images/third.png"
              }
              alt="rank"
            />
          </div>
        ))
      )}
    </ComponentCard>
  );
}
