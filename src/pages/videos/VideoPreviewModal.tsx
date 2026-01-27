import React, { useRef, useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import { Maximize, Settings, Volume2, Play, Pause, Loader2 } from "lucide-react";
import { useLanguage } from "../../locales/LanguageContext";

const BASE_URL = "https://kidsapi.pulvent.com";

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  video?: {
    Id: number;
    TitleEn: string;
    TitleAr: string;
    VideoUrl: string | null;
    ThumbnailUrl: string;
    NumberOfPoints: number;
  } | null;
}

export default function VideoPreviewModal({ isOpen, onClose, video }: VideoPreviewModalProps) {
  const { isRTL } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls) timeout = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowControls(true);
      setVolume(1);
      setPlaybackSpeed(1);
      setIframeLoading(true);
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.playbackRate = 1;
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackdropRef.current) onClose();
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const handleTimeUpdate = () => { if (videoRef.current) setCurrentTime(videoRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const percentage = isRTL ? 1 - ratio : ratio; 
    videoRef.current.currentTime = percentage * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSettingsMenu(false);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) videoContainerRef.current.requestFullscreen().catch(err => console.error(err));
    else document.exitFullscreen();
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getYTID = (url: string | null) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!video) return null;

  const buildUrl = (url: string | null | undefined, baseUrl: string): string | null => {
    if (!url || url.trim() === "") return null;
    if (url.startsWith('http')) return url;
    return `${baseUrl}/${url.startsWith('/') ? url.substring(1) : url}`;
  };

  const videoSrc = buildUrl(video.VideoUrl, BASE_URL);
  const thumbnailSrc = buildUrl(video.ThumbnailUrl, BASE_URL) || "/images/video-thumb/Thumbnail_image.svg";
  const youtubeId = getYTID(videoSrc);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen={true} showCloseButton={false}>
      <div ref={modalBackdropRef} className="absolute inset-0 flex items-center justify-center bg-stone-800/20 backdrop-blur-sm" onClick={handleBackdropClick}>
        <div ref={videoContainerRef} className="relative w-200 max-w-6xl aspect-video rounded-[31px] overflow-hidden shadow-2xl bg-black border-none" onMouseMove={() => setShowControls(true)} onMouseLeave={() => isPlaying && setShowControls(false)} onClick={(e) => e.stopPropagation()}>
          {videoSrc ? (
            youtubeId ? (
              <div className="relative w-full h-full">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                    <Loader2 className="w-12 h-12 text-[#25B16F] animate-spin mb-4" />
                  </div>
                )}
                <iframe className="w-full h-full aspect-video" src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} title="YT" frameBorder="0" allowFullScreen onLoad={() => setIframeLoading(false)}></iframe>
              </div>
            ) : (
              <video ref={videoRef} className="w-full h-full object-cover cursor-pointer" poster={thumbnailSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} onClick={togglePlayPause}>
                <source src={videoSrc} type="video/mp4" />
              </video>
            )
          ) : (
            <img src={thumbnailSrc} className="w-full h-full object-cover" alt="" />
          )}
          
          <div className={`absolute inset-0 flex flex-col justify-between py-12 px-10 bg-gradient-to-t from-black/40 via-transparent to-black/10 transition-opacity duration-300 ${showControls && !youtubeId ? 'opacity-100' : 'opacity-0'} ${youtubeId ? 'pointer-events-none' : ''}`}>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2 font-lalezar">{video.TitleAr}</h2>
              <p className="text-xl opacity-90 font-medium font-inter">{video.TitleEn}</p>
            </div>
            
            {videoSrc && !youtubeId && (
              <div className="flex items-center justify-center gap-14">
                <button onClick={() => skip(-10)} className="relative w-20 h-20 transition-transform hover:scale-110"><img src="/images/video-thumb/back.svg" className="w-full h-full" alt="" /></button>
                <button onClick={togglePlayPause} className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-105">
                  {isPlaying ? <Pause size={48} fill="white" className="text-white" /> : <Play size={48} fill="white" className="text-white ml-2" />}
                </button>
                <button onClick={() => skip(10)} className="relative w-20 h-20 transition-transform hover:scale-110"><img src="/images/video-thumb/forward.svg" className="w-full h-full" alt="" /></button>
              </div>
            )}

            {videoSrc && !youtubeId && (
              <div style={{ backgroundColor: 'rgba(45, 45, 45, 0.5)', backdropFilter: 'blur(9.81px)' }} className="w-full p-4 rounded-[31px] flex items-center gap-5 shadow-lg border border-white/10">
                
                <button onClick={togglePlayPause} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {isPlaying ? <Pause size={24} fill="black" className="text-black" /> : <Play size={24} fill="black" className={`text-black ${isRTL ? 'mr-1' : 'ml-1'}`} />}
                </button>

                <div className="flex flex-1 items-center gap-4">
                  <span className="text-white text-base min-w-[40px]">{formatTime(isRTL ? duration - currentTime : currentTime)}</span>
                  <div ref={progressRef} className="flex-1 h-[6px] bg-white/30 rounded-full relative cursor-pointer" onClick={handleProgressClick}>
                    <div 
                      className={`absolute top-0 h-full bg-white rounded-full ${isRTL ? 'right-0' : 'left-0'}`} 
                      style={{ width: `${(currentTime / duration) * 100}%` }} 
                    />
                  </div>
                  <span className="text-white text-base min-w-[40px]">{formatTime(isRTL ? currentTime : duration - currentTime)}</span>
                </div>

                <div className="flex items-center gap-6 px-4">
                  <Maximize className="text-white cursor-pointer hover:opacity-70" size={24} onClick={toggleFullscreen} />
                  
                  <div className="relative" onMouseEnter={() => setShowSettingsMenu(true)} onMouseLeave={() => setShowSettingsMenu(false)}>
                    <Settings className="text-white cursor-pointer hover:opacity-70" size={24} />
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-200 ${showSettingsMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 shadow-lg min-w-[160px]">
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => (
                          <button key={speed} onClick={() => handleSpeedChange(speed)} className={`w-full text-left px-3 py-2 rounded-md text-sm ${playbackSpeed === speed ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}>{speed === 1 ? 'عادي' : `${speed}x`}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-2" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                    <Volume2 className="text-white cursor-pointer" size={24} />
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-200 ${showVolumeSlider ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 shadow-lg flex flex-col items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.01" 
                          value={volume} 
                          onChange={handleVolumeChange} 
                          className="w-24 h-1 appearance-none cursor-pointer rounded-full" 
                          style={{ background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)` }} 
                        />
                        <span className="text-white text-[10px] font-bold select-none">
                          {Math.round(volume * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}