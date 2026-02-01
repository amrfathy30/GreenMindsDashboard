/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Play } from "lucide-react";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import VideoFormModal from "./VideoFormModal";
import VideoPreviewModal from "./VideoPreviewModal";
import { PlusIcon } from "../../icons";
import { useLanguage } from "../../locales/LanguageContext";
import {
  allVideosData,
  deleteVideo,
  updateVideo,
  createVideo,
} from "../../api/services/videoService";
import { VideoType } from "../../utils/types/videoType";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import { allAgeData } from "../../api/services/ageService";
import { VideoTableSkeleton } from "../../components/loading/TableLoading";
import EmptyState from "../../components/common/no-data-found";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../utils/permissions/permissions";

const BASE_URL = "https://kidsapi.pulvent.com";

interface AgeSector {
  Id: number;
  DisplayName: string;
  FromAge: number;
  ToAge: number;
}

export default function VideosList() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [ageSectors, setAgeSectors] = useState<AgeSector[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    fetchUserPermissions();
  }, []);
  const canView = hasPermission("Videos_GetPaged");
  const canAdd = hasPermission("Videos_Create");
  const canEdit = hasPermission("Videos_Update");
  const canDelete = hasPermission("Videos_Delete");

  const fetchInitialData = async () => {
    if (!canView) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [videosRes, agesRes] = await Promise.all([
        allVideosData({ page: currentPage, pageSize: pageSize }),
        allAgeData(),
      ]);
      const responseData = videosRes.Data;
      const videosArray = responseData?.Items || [];
      const totalCount = responseData?.Total || 0;
      const totalPagesCount = Math.ceil(totalCount / pageSize) || 1;
      setVideos(videosArray);
      setAgeSectors(agesRes.Data || []);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [currentPage, pageSize]);

  const handleSave = async (formData: FormData) => {
    try {
      setLoading(true);
      if (isEditOpen && selectedVideo) {
        await updateVideo(formData);
        ShowToastSuccess(t("success_video_update"));
      } else {
        await createVideo(formData);
        ShowToastSuccess(t("success_video_create"));
      }
      setIsAddOpen(false);
      setIsEditOpen(false);
      await fetchInitialData();
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedVideo) return;
    try {
      setLoading(true);
      await deleteVideo(selectedVideo.Id);
      await fetchInitialData();
      ShowToastSuccess(t("success_video_delete"));
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!canView && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page_videos")}
        />
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Green minds Admin | Videos" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5 dark:border-gray-800 min-h-[calc(100vh-48px)] flex flex-col dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-auto min-h-[70px] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4 shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            {t("Videos - Admin")}
          </h2>
          {canAdd && (
            <Button
              size="sm"
              variant="primaryGrid"
              className="w-full sm:w-auto rounded-lg px-4 py-2 text-sm"
              onClick={() => {
                setSelectedVideo(null);
                setIsAddOpen(true);
              }}
            >
              <div className="text-white">
                <PlusIcon />
              </div>
              <span className="ml-1">{t("add_video_title")}</span>
            </Button>
          )}
        </div>

        {videos?.length === 0 && !loading ? (
          <EmptyState
            title="No Data Found"
            description="Videos Section has no data yet!"
          />
        ) : (
          ""
        )}

        {loading ? (
          <VideoTableSkeleton />
        ) : (
          videos?.length !== 0 && (
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
                    <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                      {t("age group")}
                    </th>
                    {(canEdit || canDelete) && (
                      <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                        {t("actions")}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <tr
                      key={video.Id}
                      className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#D9D9D940] dark:bg-white/[0.01]"}`}
                    >
                      <td className="px-4 py-3">
                        <div
                          onClick={() => {
                            setSelectedVideo(video);
                            setIsPreviewOpen(true);
                          }}
                          className="relative aspect-[16/9] h-[45px] md:h-[55px] rounded-xl overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700"
                        >
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
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm md:text-base font-lalezar text-gray-600 dark:text-gray-300">
                          {(() => {
                            const sector = ageSectors.find(
                              (a) => a.Id === video.AgeSectorId,
                            );
                            return sector
                              ? `${sector.FromAge} : ${sector.ToAge}`
                              : video.AgeSectorName || "-";
                          })()}
                        </span>
                      </td>
                      {(canEdit || canDelete) && (
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2 md:gap-3">
                            {canEdit && (
                              <button
                                onClick={() => {
                                  setSelectedVideo(video);
                                  setIsEditOpen(true);
                                }}
                                className="hover:scale-110"
                              >
                                <img
                                  src="/images/video-thumb/Edit.svg"
                                  className="w-5 h-5 md:w-6 md:h-6 dark:invert"
                                  alt=""
                                />
                              </button>
                            )}
                            {canDelete && (
                              <button
                                onClick={() => {
                                  setSelectedVideo(video);
                                  setIsDeleteOpen(true);
                                }}
                                className="hover:scale-110"
                              >
                                <img
                                  src="/images/video-thumb/Remove.svg"
                                  className="w-5 h-5 md:w-6 md:h-6 dark:invert"
                                  alt=""
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
      <VideoFormModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSave}
        type="add"
        loading={loading}
      />
      <VideoFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        type="edit"
        initialData={selectedVideo}
        loading={loading}
      />
      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={loading}
        title={t("delete")}
        description={t("confirm_delete_video")}
      />
      <VideoPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        video={selectedVideo}
      />
    </>
  );
}
