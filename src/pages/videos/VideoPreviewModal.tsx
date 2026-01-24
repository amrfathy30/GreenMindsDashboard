import React, { useRef, useState } from "react";
import { Modal } from "../../components/ui/modal";
import { Maximize, Settings, Volume2, Play, Pause } from "lucide-react";

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPreviewModal({ isOpen, onClose }: VideoPreviewModalProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen={true} showCloseButton={true}>
      <div className="absolute inset-0 flex items-center justify-center bg-stone-800/20 backdrop-blur-sm z-0">
        <div 
          ref={videoContainerRef}
          className="relative w-full max-w-6xl aspect-video overflow-hidden shadow-2xl bg-black border-none"
        >
          <img 
            src="/images/video-thumb/Thumbnail_image.svg" 
            className="w-full h-full object-cover" 
            alt="Video Content" 
          />
          
          <div className="absolute inset-0 flex flex-col justify-between py-12 px-10 bg-gradient-to-t from-black/40 via-transparent to-black/10">
            <div className="text-center text-white">
               <h2 className="text-4xl font-bold mb-2 font-lalezar tracking-wide drop-shadow-lg">مغامرات الأهداف الخمسة</h2>
               <p className="text-xl opacity-90 font-medium font-inter">The Adventures of the Five Goals</p>
            </div>
            
            <div className="flex items-center justify-center gap-14">
               <button className="relative w-32 h-32 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="/images/video-thumb/back.svg" className="w-full h-full" alt="back 10s" />
               </button>
               
               <button 
                onClick={togglePlay}
                className="flex items-center justify-center transition-all transform hover:scale-110"
               >
                  {isPlaying ? (
                    <Pause size={70} fill="white" className="text-white drop-shadow-xl" />
                  ) : (
                    <Play size={70} fill="white" className="text-white drop-shadow-xl ms-2" />
                  )}
               </button>

               <button className="relative w-32 h-32 flex items-center justify-center transition-transform hover:scale-110">
                  <img src="/images/video-thumb/forward.svg" className="w-full h-full" alt="forward 10s" />
               </button>
            </div>

            <div 
              style={{ backgroundColor: 'rgba(45, 45, 45, 0.5)', backdropFilter: 'blur(9.81px)' }}
              className="w-full p-4 flex items-center gap-5 shadow-lg border border-white/10"
            >
               <div className="flex items-center gap-6 px-4">
                  <Maximize 
                    className="text-white cursor-pointer hover:opacity-70 transition-opacity" 
                    size={24} 
                    onClick={toggleFullscreen}
                  />
                  <Settings className="text-white cursor-pointer hover:opacity-70 transition-opacity" size={24} />
                  <Volume2 className="text-white cursor-pointer hover:opacity-70 transition-opacity" size={24} />
               </div>

               <div className="flex flex-1 items-center gap-4">
                  <span className="text-white text-base font-medium min-w-[40px]">2:31</span>
                  
                  <div className="flex-1 h-[6px] bg-white/30 rounded-full relative cursor-pointer">
                     {/* شريط التقدم يبدأ من اليمين */}
                     <div className="absolute top-0 right-0 h-full w-2/3 bg-white rounded-full"></div>
                     <div className="absolute top-1/2 right-2/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md translate-x-1/2"></div>
                  </div>
                  
                  <span className="text-white text-base font-medium min-w-[40px]">0:51</span>
               </div>

               <div 
                onClick={togglePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-lg ms-2"
               >
                  {isPlaying ? (
                    <Pause size={24} fill="black" className="text-black" />
                  ) : (
                    <Play size={24} fill="black" className="text-black ms-1" />
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}