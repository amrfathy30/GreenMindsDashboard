/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyState from "../../../../../components/common/no-data-found";
import { VideoTableSkeleton } from "../../../../../components/loading/TableLoading";
import { useLanguage } from "../../../../../locales/LanguageContext";
import { Play } from "lucide-react";
import {
  ApiResponse,
  ChildVideo,
  TapsProps,
} from "../../../../../utils/types/childrenType";
import { useEffect, useRef, useState } from "react";
import { ChildVideos } from "../../../../../api/services/childrenService";
import { toast } from "sonner";

export default function Video({ id }: TapsProps) {
  const { t } = useLanguage();
  const BASE_URL = "https://kidsapi.pulvent.com";

  const [loadingVideos, setLoadingVideos] = useState(true);
  const [childVideos, setChildVideos] = useState<ApiResponse<
    ChildVideo[]
  > | null>(null);

  const fetchedVideos = useRef(false);

  useEffect(() => {
    if (!id || fetchedVideos.current) return;
    fetchedVideos.current = true;

    const fetchChildVideos = async () => {
      try {
        setLoadingVideos(true);
        const data = await ChildVideos(Number(id));
        setChildVideos(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("OperationFailed"));
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchChildVideos();
  }, [id]);

  return (
    <div className="h-full w-full p-4 dark:text-white border dark:border-gray-700 flex items-center justify-center rounded-[15px]">
      {loadingVideos ? (
        <VideoTableSkeleton />
      ) : Array.isArray(childVideos?.Data) && childVideos.Data.length > 0 ? (
        <div className="overflow-x-auto px-2 md:px-4 flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#D9D9D940] dark:bg-white/[0.02]">
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {t("Thumbnail")}
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {t("title")}
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                  {t("points")}
                </th>
              </tr>
            </thead>
            <tbody>
              {childVideos.Data.map((video, index) => (
                <tr
                  key={video.Id}
                  className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${
                    index % 2 === 0
                      ? "bg-white dark:bg-transparent"
                      : "bg-[#D9D9D940] dark:bg-white/[0.01]"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="relative aspect-[16/9] h-[45px] md:h-[55px] rounded-xl overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700">
                      <img
                        src={
                          video.ThumbnailUrl?.startsWith("http")
                            ? video.ThumbnailUrl
                            : `${BASE_URL}/${video.ThumbnailUrl}`
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/15 transition-all">
                        <div className="bg-white p-1 rounded-full">
                          <Play
                            size={10}
                            fill="#6B6B6B"
                            className="text-[#6B6B6B]"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm md:text-base font-lalezar font-medium text-gray-900 dark:text-white line-clamp-1">
                      {video.TitleEn} / {video.TitleAr}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[#00B69B] font-lalezar text-lg md:text-xl">
                        +{video.NumberOfPoints}
                      </span>
                      <img
                        src="/images/video-thumb/Stack of Coins.svg"
                        className="w-6 h-6 md:w-8 md:h-8"
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title={t("NoData")} description={t("VideosNotAvailable")} />
      )}
    </div>
  );
}
