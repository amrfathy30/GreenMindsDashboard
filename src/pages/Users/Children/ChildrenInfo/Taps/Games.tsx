/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../../locales/LanguageContext";
import {
  ApiResponse,
  ChildGame,
  TapsProps,
} from "../../../../../utils/types/childrenType";
import { ChildGames } from "../../../../../api/services/childrenService";
import { toast } from "sonner";
import GameCard from "../../../../games/gameCard";
import GameCardSkeleton from "../../../../../components/loading/gameLoading";
import EmptyState from "../../../../../components/common/no-data-found";

export default function Games({ id }: TapsProps) {
  const { t, isRTL } = useLanguage();
  const BASE_URL = "https://kidsapi.pulvent.com";

  const [childGames, setChildGames] = useState<ApiResponse<ChildGame[]> | null>(
    null,
  );
  const [loadingGames, setLoadingGames] = useState(true);

  const fetchedGames = useRef(false);

  useEffect(() => {
    if (!id || fetchedGames.current) return;

    fetchedGames.current = true;

    const fetchChildGames = async () => {
      try {
        setLoadingGames(true);
        const data = await ChildGames(Number(id));
        setChildGames(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("OperationFailed"));
      } finally {
        setLoadingGames(false);
      }
    };

    fetchChildGames();
  }, [id]);

  return (
    <div className="h-full w-full p-4 dark:text-white border dark:border-gray-700 flex flex-col rounded-[15px]">
      <div className="flex-grow overflow-y-auto p-4">
        {loadingGames ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        ) : childGames?.Data && childGames.Data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {childGames.Data.map((game) => (
              <GameCard
                canEdit={false}
                canDelete={false}
                key={game.Id}
                title={isRTL ? game.GameNameAr : game.GameNameEn}
                description={isRTL ? game.DescriptionAr : game.DescriptionEn}
                image={
                  game.ThumbnailUrl?.startsWith("http")
                    ? game.ThumbnailUrl
                    : `${BASE_URL}/${game.ThumbnailUrl}`
                }
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <EmptyState
              title={t("NoData")}
              description={t("GamesNotAvailable")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
