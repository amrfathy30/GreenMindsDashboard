import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Plus, Edit, Trash2, Play } from "lucide-react";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button"; 

const initialVideos = [
  { id: 1, title: "Tiny Thinkers / المفكرون الصغار", points: "+2", age: "2 : 4", thumbnail: "/images/video-placeholder.png" },
  { id: 2, title: "Alphabet Adventures / مغامرات الحروف", points: "+5", age: "2 : 4", thumbnail: "/images/video-placeholder.png" },
  { id: 3, title: "The Number Train / قطار الأرقام", points: "+7", age: "5 : 8", thumbnail: "/images/video-placeholder.png" },
  { id: 4, title: "Smarty Pants / الذكي الصغير", points: "+10", age: "5 : 8", thumbnail: "/images/video-placeholder.png" },
  { id: 5, title: "Little Explorers / المكتشفون الصغار", points: "+12", age: "9 : 11", thumbnail: "/images/video-placeholder.png" },
  { id: 6, title: "Animal Friends / أصدقاء الحيوان", points: "+15", age: "9 : 11", thumbnail: "/images/video-placeholder.png" },
];

export default function VideosList() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <PageMeta title="Videos - Admin | Green Minds Dashboard" description="Manage educational videos" />
      
      <PageBreadcrumb pageTitle="Videos" />

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm overflow-hidden mt-2 border border-[rgba(250,250,250,1)] dark:border-gray-800">
        
        <div className="flex justify-between items-center p-6 border-b-2 border-[rgba(250,250,250,1)] dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Videos - Admin</h2>
          
          <Button 
            variant="primaryGrid" 
            size="md" 
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
              <tr className="dark:bg-gray-900">
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider">Thumbnail</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Points</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Age group</th>
                <th className="px-6 py-8 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialVideos.map((video, index) => (
                <tr 
                  key={video.id} 
                  className={`transition-colors ${
                    index % 2 === 0 
                      ? "bg-[rgba(217,217,217,0.25)] dark:bg-white/[0.03]" 
                      : "bg-[rgba(250,250,250,1)] dark:bg-transparent"
                  }`}
                >
                  <td className="px-6 py-6">
                    <div className="relative w-36 h-20 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-inner group cursor-pointer border border-gray-100 dark:border-gray-700">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" 
                           onError={(e) => { e.currentTarget.src = "https://placehold.co/150x80/e2e8f0/64748b?text=Video"; }} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                         <div className="bg-white/80 dark:bg-gray-700/80 p-2 rounded-full shadow-lg">
                            <Play size={18} fill="#6B6B6B" className="ml-0.5 dark:fill-gray-300" />
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xl font-lalezar text-black dark:text-gray-200 leading-none" >
                      {video.title}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[#00B69B] font-bold text-xl">{video.points}</span>
                      <img src="/images/icons/coin.png" alt="" className="w-8 h-8 object-contain" 
                           onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                      {video.age}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center items-center gap-4">
                      <button className="text-[#6B6B6B] dark:text-gray-400 hover:text-[#009DD1] dark:hover:text-blue-400 transition-all">
                        <Edit size={24} strokeWidth={2.5} />
                      </button>
                      <button className="text-[#6B6B6B] dark:text-gray-400 hover:text-red-500 transition-all">
                        <Trash2 size={24} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-10 border-t border-[rgba(250,250,250,1)] dark:border-gray-800">
          <Pagination 
            currentPage={currentPage} 
            totalPages={10} 
            onPageChange={(page) => setCurrentPage(page)} 
          />
        </div>
      </div>
    </>
  );
}