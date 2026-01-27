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
import { allVideosData, deleteVideo, updateVideo, createVideo } from "../../api/services/videoService";
import {  VideoType } from "../../utils/types/videoType";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

import { allAgeData } from "../../api/services/ageService";
import { VideoTableSkeleton } from "../../components/loading/TableLoading";
import EmptyState from "../../components/common/no-data-found";


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
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [videosRes, agesRes] = await Promise.all([
        allVideosData({ page: currentPage, pageSize: 10 }),
        allAgeData()
      ]);
      setVideos(videosRes.Data || []);
      setAgeSectors(agesRes.Data || []);
      setTotalPages(videosRes.TotalPages || 1);
    } catch {
      // toast.error(t("failed_load_videos"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [currentPage]);

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
      fetchInitialData();
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
      setVideos(prevVideos => prevVideos.filter(v => v.Id !== selectedVideo.Id));
      ShowToastSuccess(t("success_video_delete"));
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Green minds Admin | Videos"
        description={``}
      />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("Videos - Admin")}</h2>

          <Button 
            size="sm" 
            variant="primaryGrid" 
            className="rounded-lg px-4 py-2 text-sm"
            onClick={() => { setSelectedVideo(null); setIsAddOpen(true); }}
          >
            <div className="text-white"><PlusIcon /></div>
            <span className="ml-1">{t("add_video_title")}</span>
          </Button>
        </div>
        {videos?.length == 0 && !loading ? <EmptyState title="No Data Found" description="Videos Section has no data yet, start by adding your first Video Now!"/> : ""}
        {loading ? <VideoTableSkeleton /> : 
        videos?.length != 0?(
          <div className="overflow-x-auto px-4">
            <table className="w-full text-left border-collapse min-w-[700px] h-full">
              <thead>
                <tr className="bg-[#D9D9D940] dark:bg-white/[0.02]">
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t("Thumbnail")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t("title")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("points")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("age group")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  videos?.map((video, index) => (
                    <tr key={video.Id} className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#D9D9D940] dark:bg-white/[0.01]"}`}>
                      <td className="px-4 py-3">
                        <div onClick={() => { setSelectedVideo(video); setIsPreviewOpen(true); }} className="relative aspect-[16/9] h-[55px] rounded-xl overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700 shadow-sm">
                          <img src={video.ThumbnailUrl?.startsWith('http') ? video.ThumbnailUrl : `${BASE_URL}/${video.ThumbnailUrl}`} className="w-full h-full object-cover" alt="" onError={(e) => { (e.target as HTMLImageElement).src = "/images/video-thumb/Thumbnail_image.svg"; }} />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/15 transition-all">
                            <div className="bg-white p-1.5 rounded-full shadow-md"><Play size={12} fill="#6B6B6B" className="text-[#6B6B6B]" /></div>
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
                          <span className="text-[#00B69B] font-lalezar text-xl">+{video.NumberOfPoints}</span>
                          <img src="/images/video-thumb/Stack of Coins.svg" className="w-8 h-8" alt="" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-base font-lalezar text-gray-600 dark:text-gray-300">
                          {(() => {
                            const sector = ageSectors.find(a => a.Id === video.AgeSectorId);
                            return sector ? `${sector.FromAge} : ${sector.ToAge}` : (video.AgeSectorName || "-");
                          })()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => { setSelectedVideo(video); setIsEditOpen(true); }} className="hover:scale-110 transition-transform">
                            <img src="/images/video-thumb/Edit.svg" className="w-6 h-6 dark:invert" alt="" />
                          </button>
                          <button onClick={() => { setSelectedVideo(video); setIsDeleteOpen(true); }} className="hover:scale-110 transition-transform">
                            <img src="/images/video-thumb/Remove.svg" className="w-6 h-6 dark:invert" alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ):""}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/5">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>

      <VideoFormModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleSave} type="add" loading={loading} />
      <VideoFormModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleSave} type="edit" initialData={selectedVideo} loading={loading} />
      <ConfirmModal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={confirmDelete} loading={loading} title={t("delete")} description={t("confirm_delete_video")} />
      <VideoPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} video={selectedVideo} />
    </>
  );
}