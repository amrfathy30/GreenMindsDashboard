import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Plus, Play } from "lucide-react"; 
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button"; 

import ConfirmModal from "../../components/common/ConfirmModal";
import VideoFormModal, { VideoType } from "./VideoFormModal";
import VideoPreviewModal from "./VideoPreviewModal";

const initialVideos: VideoType[] = [
  { id: 1, title: "Tiny Thinkers / المفكرون الصغار", points: "+2", age: "2 : 4", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
  { id: 2, title: "Alphabet Adventures / مغامرات الحروف", points: "+5", age: "2 : 4", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
  { id: 3, title: "The Number Train / قطار الأرقام", points: "+7", age: "5 : 8", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
  { id: 4, title: "Smarty Pants / الذكي الصغير", points: "+10", age: "5 : 8", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
  { id: 5, title: "Little Explorers / المكتشفون الصغار", points: "+12", age: "9 : 11", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
  { id: 6, title: "Animal Friends / أصدقاء الحيوان", points: "+15", age: "9 : 11", thumbnail: "/images/video-thumb/Thumbnail_image.svg" },
];

export default function VideosList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const handleEdit = (video: VideoType) => {
    setSelectedVideo(video);
    setIsEditOpen(true);
  };

  const handleDelete = (video: VideoType) => {
    setSelectedVideo(video);
    setIsDeleteOpen(true);
  };

  const handlePreview = (video: VideoType) => {
    setSelectedVideo(video);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <PageMeta title="Videos - Admin | Green Minds Dashboard" description="Manage educational videos" />
      <PageBreadcrumb pageTitle="Videos" />

      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm overflow-hidden mt-2 border border-[rgba(250,250,250,1)] dark:border-gray-800">
        <div className="flex justify-between items-center p-6 border-b-2 border-[rgba(250,250,250,1)] dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Videos - Admin</h2>
          <Button 
            variant="primaryGrid" 
            size="md" 
            onClick={() => setIsAddOpen(true)}
            className="rounded-[10px] w-40"
            startIcon={
              <span className="flex items-center justify-center w-6 h-6 rounded-[10px] bg-white shadow-sm">
                <Plus size={20} strokeWidth={4} className="text-[#009DD1]" /> 
              </span>
            }
          >
            Add video
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-neutral-800">
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider">Thumbnail</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Points</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Age group</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialVideos.map((video, index) => (
                <tr key={video.id} className={`transition-colors ${index % 2 === 0 ? "bg-[rgba(217,217,217,0.25)] dark:bg-white/[0.02]" : "bg-[rgba(250,250,250,1)] dark:bg-transparent"}`}>
                  <td className="px-6 py-6">
                    <div onClick={() => handlePreview(video)} className="relative w-36 h-20 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-inner group cursor-pointer border border-gray-100 dark:border-gray-700">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                         <div className="bg-white/80 dark:bg-gray-700/80 p-2 rounded-full shadow-lg">
                            <Play size={18} fill="#6B6B6B" className="ml-0.5 dark:fill-gray-300" />
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xl font-lalezar text-[rgba(0,0,0,1)] dark:text-white leading-none">{video.title}</span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-[#00B69B] font-lalezar text-2xl">{video.points}</span>
                      <img src="/images/video-thumb/Stack of Coins.svg" alt="coins" className="w-16 h-16 object-contain mt-4" />
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-xl font-lalezar text-gray-700 dark:text-gray-300">{video.age}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center items-center gap-4">
                      <button onClick={() => handleEdit(video)} className="cursor-pointer hover:scale-110 transition-transform">
                        <img src="/images/video-thumb/Edit.svg" alt="edit" className="w-8 h-8 dark:brightness-0 dark:invert" />
                      </button>
                      <button onClick={() => handleDelete(video)} className="cursor-pointer hover:scale-110 transition-transform">
                        <img src="/images/video-thumb/Remove.svg" alt="remove" className="w-8 h-8 dark:brightness-0 dark:invert" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-10 border-t border-[rgba(250,250,250,1)] dark:border-gray-800">
          <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        </div>
      </div>

      <VideoFormModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} type="add" />
      <VideoFormModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} type="edit" initialData={selectedVideo} />
      <ConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
        title="Delete Video"
        description="Are You sure you want to delete this video ?"
      />
      <VideoPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </>
  );
}