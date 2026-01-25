import React, { useRef, useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import { Maximize, Settings, Volume2, Play, Pause } from "lucide-react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

 
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

 
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowControls(true);
      setVolume(1);
      setPlaybackSpeed(1);
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.playbackRate = 1;
      }
    }
  }, [isOpen]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = 1 - (clickX / rect.width); 
    videoRef.current.currentTime = percentage * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettingsMenu(false);
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!video) return null;

  const videoSrc = video.VideoUrl
    ? (video.VideoUrl.startsWith('http') ? video.VideoUrl : `${BASE_URL}${video.VideoUrl}`)
    : null;

  const thumbnailSrc = video.ThumbnailUrl?.startsWith('http')
    ? video.ThumbnailUrl
    : `${BASE_URL}/${video.ThumbnailUrl}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen={true} showCloseButton={true}>
      <div className="absolute inset-0 flex items-center justify-center bg-stone-800/20 backdrop-blur-sm z-0">
        <div 
          ref={videoContainerRef}
          className="relative w-200 max-w-6xl aspect-video rounded-[31px] overflow-hidden shadow-2xl bg-black border-none"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              poster={thumbnailSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlayPause}
            >
              <source src={videoSrc} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          ) : (
            <img 
              src={thumbnailSrc} 
              className="w-full h-full object-cover" 
              alt="Video Content" 
            />
          )}
          
          <div 
            className={`absolute inset-0 flex flex-col justify-between py-12 px-10 bg-gradient-to-t from-black/40 via-transparent to-black/10 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Title Section */}
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2 font-lalezar tracking-wide drop-shadow-lg">
                {video.TitleAr}
              </h2>
              <p className="text-xl opacity-90 font-medium font-inter">
                {video.TitleEn}
              </p>
            </div>
            
            {/* Center Play/Pause Buttons */}
            {videoSrc && (
              <div className="flex items-center justify-center gap-14">
                <button 
                  onClick={() => skip(-10)}
                  className="relative w-20 h-20 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <img src="/images/video-thumb/back.svg" className="w-full h-full" alt="back 10s" />
                </button>
                
                <button 
                  onClick={togglePlayPause}
                  className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause size={48} fill="white" className="text-white" />
                  ) : (
                    <Play size={48} fill="white" className="text-white ml-2" />
                  )}
                </button>

                <button 
                  onClick={() => skip(10)}
                  className="relative w-20 h-20 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <img src="/images/video-thumb/forward.svg" className="w-full h-full" alt="forward 10s" />
                </button>
              </div>
            )}

            {/* Bottom Control Bar */}
            {videoSrc && (
              <div 
                style={{ backgroundColor: 'rgba(45, 45, 45, 0.5)', backdropFilter: 'blur(9.81px)' }}
                className="w-full p-4 rounded-[31px] flex items-center gap-5 shadow-lg border border-white/10"
              >
                <div className="flex items-center gap-6 px-4">
                  <Maximize 
                    className="text-white cursor-pointer hover:opacity-70 transition-opacity" 
                    size={24} 
                    onClick={toggleFullscreen}
                  />
                  
                  {/* Settings Menu */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowSettingsMenu(true)}
                    onMouseLeave={() => setShowSettingsMenu(false)}
                  >
                    <Settings 
                      className="text-white cursor-pointer hover:opacity-70 transition-opacity" 
                      size={24} 
                    />
                    
                    {/* Settings Dropdown */}
                    <div 
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-200 ${
                        showSettingsMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 shadow-lg min-w-[160px]">
                        <div className="text-white text-xs font-semibold px-3 py-2 opacity-70">سرعة التشغيل</div>
                        
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              playbackSpeed === speed
                                ? 'bg-white/20 text-white font-semibold'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {speed === 1 ? 'عادي' : `${speed}x`}
                            {playbackSpeed === speed && (
                              <span className="float-right">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Volume Control */}
                  <div 
                    className="relative flex items-center gap-2"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <Volume2 className="text-white cursor-pointer hover:opacity-70 transition-opacity" size={24} />
                    
                    {/* Volume Slider */}
                    <div 
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-200 ${
                        showVolumeSlider ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 shadow-lg">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`
                          }}
                        />
                        <div className="text-white text-xs text-center mt-1">{Math.round(volume * 100)}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-4">
                  <span className="text-white text-base font-medium min-w-[40px]">
                    {formatTime(duration - currentTime)}
                  </span>
                  
                  <div 
                    ref={progressRef}
                    className="flex-1 h-[6px] bg-white/30 rounded-full relative cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="absolute top-0 right-0 h-full bg-white rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md"
                      style={{ right: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  
                  <span className="text-white text-base font-medium min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                </div>

                <button 
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-lg ml-2"
                >
                  {isPlaying ? (
                    <Pause size={24} fill="black" className="text-black" />
                  ) : (
                    <Play size={24} fill="black" className="text-black ml-1" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}