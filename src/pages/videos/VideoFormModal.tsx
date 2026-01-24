import React from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";

const GradientUploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="upload-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(2, 158, 206, 1)" />
        <stop offset="100%" stopColor="rgba(30, 173, 130, 1)" />
      </linearGradient>
    </defs>
    <path 
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" 
      stroke="url(#upload-gradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export interface VideoType {
  id: number;
  title: string;
  points: string;
  age: string;
  thumbnail: string;
}

interface VideoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
  initialData?: VideoType | null;
}

export default function VideoFormModal({ isOpen, onClose, type, initialData }: VideoFormModalProps) {
  const gradientTextStyle = "bg-gradient-to-r from-[rgba(2,158,206,1)] to-[rgba(30,173,130,1)] bg-clip-text text-transparent";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "add" ? "Add New Video" : "Edit Video"}
      className="max-w-3xl"
    >
      <div className="space-y-5 pb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Video title (EN)</label>
          <input 
            type="text" 
            placeholder="Enter video title here" 
            className="w-full p-3 border border-gray-200 rounded-xl dark:bg-transparent dark:border-gray-700 dark:text-white focus:ring-1 focus:ring-[#009DD1] outline-none" 
            defaultValue={initialData?.title?.split(" / ")[0] || ""} 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 ">Video title (AR)</label>
          <input 
            type="text" 
            placeholder="Enter video title here" 
            className="w-full p-3 border border-gray-200 rounded-xl dark:bg-transparent dark:border-gray-700 dark:text-white focus:ring-1 focus:ring-[#009DD1] outline-none" 
            defaultValue={initialData?.title?.split(" / ")[1] || ""} 
          />
        </div>

        {/* Upload Video Section */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Upload Video or Add the Video link</label>
          <div className="flex gap-4 items-center">
            <div className="w-24 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden">
               <img src={initialData?.thumbnail || "/images/video-thumb/Thumbnail_image.svg"} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1">
                <button className="flex items-center gap-2 font-bold mb-2 text-sm">
                   <GradientUploadIcon />
                   <span className={gradientTextStyle}>Upload Video</span>
                </button>
                <input type="text" placeholder="Enter video URL here" className="w-full p-3 border border-gray-200 dark:text-white rounded-xl text-sm dark:bg-transparent dark:border-gray-700" />
            </div>
          </div>
        </div>

        {/* Upload Thumbnail Section */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Upload Video Thumbnail or Add the Video Thumbnail link</label>
          <div className="flex gap-4 items-center">
            <div className="w-24 h-16 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center border border-gray-200">
                <div className="p-2 bg-gray-200 dark:bg-neutral-800 rounded-lg text-gray-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
            </div>
            <div className="flex-1">
                <button className="flex items-center gap-2 font-bold mb-2 text-sm">
                   <GradientUploadIcon />
                   <span className={gradientTextStyle}>Upload Thumbnail</span>
                </button>
                <input type="text" placeholder="Enter video Thumbnail URL here" className="w-full p-3 border border-gray-200 dark:text-white rounded-xl text-sm dark:bg-transparent dark:border-gray-700" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Age group</label>
            <div className="flex items-center gap-2">
                <input type="number" placeholder="From" className="w-full p-3 border border-gray-200 dark:text-white rounded-xl dark:bg-transparent dark:border-gray-700" />
                <input type="number" placeholder="To" className="w-full p-3 border border-gray-200 dark:text-white rounded-xl dark:bg-transparent dark:border-gray-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Number of points</label>
            <input 
              type="number" 
              placeholder="0" 
              className="w-full p-3 border border-gray-200 dark:text-white rounded-xl dark:bg-transparent dark:border-gray-700" 
              defaultValue={initialData?.points?.replace("+", "") || ""} 
            />
          </div>
        </div>

        <Button className="w-full py-4 mt-6 font-bold text-lg" onClick={onClose}>
          {type === "add" ? "Add Video" : "Save Edit"}
        </Button>
      </div>
    </Modal>
  );
}