import ComponentCard from "../../../components/common/ComponentCard";
import { useLanguage } from "../../../locales/LanguageContext";

export default function TopRanked({
  topRanks,
}: {
  topRanks: {
    UserId: number;
    UserName: string;
    TotalPoints: number;
    LevelId: number;
    LevelName: string;
  }[];
}) {
  const { t } = useLanguage();

  return (
    <ComponentCard title={t("TopRanked")}>
      {topRanks.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-gray-500 text-lg font-semibold">
          {t("NoData")}
        </div>
      ) : (
        topRanks.slice(0, 5).map((user, index) => (
          <div
            key={user.UserId}
            className="flex justify-between items-center gap-1 mb-6"
          >
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full"
                src="/images/child.png"
                alt="child-image"
              />

              <div className="max-w-[150px] overflow-hidden">
                <h2
                  className="text-sm dark:text-white truncate"
                  title={user.UserName}
                >
                  {user.UserName}
                </h2>

                <h2 className="text-sm text-[#8E9ABB]">
                  {user.TotalPoints} {t("points")}
                </h2>
              </div>
            </div>
            {index < 3 && (
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
            )}
          </div>
        ))
      )}
    </ComponentCard>
  );
}
