/* eslint-disable no-useless-escape */
import React, { useRef, useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import {
  Maximize,
  Settings,
  Volume2,
  Play,
  Pause,
  Loader2,
} from "lucide-react";
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

export default function VideoPreviewModal({
  isOpen,
  onClose,
  video,
}: VideoPreviewModalProps) {
  const { isRTL } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && showControls)
      timeout = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowControls(true);
      setVolume(1);
      setIframeLoading(true);
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.playbackRate = 1;
        videoRef.current.load();
      }
    }
  }, [isOpen, video?.VideoUrl]);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

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
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement)
      videoContainerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getYTID = (url: string | null) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (!video) return null;

  const buildUrl = (
    url: string | null | undefined,
    baseUrl: string,
  ): string | null => {
    if (!url || url.trim() === "") return null;
    if (url.includes("localhost:7135"))
      return `${baseUrl}/${url.split("localhost:7135/")[1]}`;
    if (url.startsWith("http")) return url;
    return `${baseUrl}/${url.startsWith("/") ? url.substring(1) : url}`;
  };

  const videoSrc = buildUrl(video.VideoUrl, BASE_URL);
  const thumbnailSrc =
    buildUrl(video.ThumbnailUrl, BASE_URL) ||
    "/images/video-thumb/Thumbnail_image.svg";
  const youtubeId = getYTID(videoSrc);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isFullscreen={true}
      showCloseButton={false}
    >
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          ref={videoContainerRef}
          className="relative w-full max-w-5xl aspect-video rounded-2xl md:rounded-[31px] overflow-hidden bg-black shadow-2xl mx-2 md:mx-4"
          onMouseMove={() => setShowControls(true)}
        >
          {videoSrc ? (
            youtubeId ? (
              <div className="relative w-full h-full z-0">
                {iframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <Loader2 className="w-10 h-10 text-secondary animate-spin" />
                  </div>
                )}
                <iframe
                  className="w-full h-full relative z-0"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setIframeLoading(false)}
                ></iframe>
              </div>
            ) : (
              <video
                key={videoSrc}
                ref={videoRef}
                src={videoSrc || ""}
                className="w-full h-full object-cover cursor-pointer"
                poster={thumbnailSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlayPause}
                crossOrigin="anonymous"
              />
            )
          ) : (
            <img
              src={thumbnailSrc}
              className="w-full h-full object-cover"
              alt=""
            />
          )}

          <div
            className={`absolute inset-0 flex flex-col justify-between py-6 md:py-12 px-4 md:px-10 bg-linear-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 ${showControls && !youtubeId ? "opacity-100" : "opacity-0"} pointer-events-none`}
          >
            <div className="text-center text-white pointer-events-none">
              <h2 className="text-2xl md:text-4xl font-bold font-lalezar">
                {video.TitleAr}
              </h2>
              <p className="text-sm md:text-xl opacity-90 font-medium">
                {video.TitleEn}
              </p>
            </div>

            {videoSrc && !youtubeId && (
              <div className="flex items-center justify-center gap-10 md:gap-20 pointer-events-auto">
                <button
                  onClick={() => skip(-10)}
                  className="w-14 h-14 md:w-24 md:h-24 transition-transform hover:scale-110"
                >
                  <img
                    src="/images/video-thumb/back.svg"
                    className="w-full h-full"
                    alt=""
                  />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="flex items-center justify-center transition-transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause
                      size={28}
                      className="md:size-10.5 text-white"
                      fill="white"
                    />
                  ) : (
                    <Play
                      size={28}
                      className="md:size-10.5 text-white ml-1"
                      fill="white"
                    />
                  )}
                </button>
                <button
                  onClick={() => skip(10)}
                  className="w-14 h-14 md:w-24 md:h-24 transition-transform hover:scale-110"
                >
                  <img
                    src="/images/video-thumb/forward.svg"
                    className="w-full h-full"
                    alt=""
                  />
                </button>
              </div>
            )}

            {videoSrc && !youtubeId && (
              <div
                style={{
                  backgroundColor: "rgba(45, 45, 45, 0.5)",
                  backdropFilter: "blur(9.81px)",
                }}
                className="w-full p-2 md:p-4 rounded-2xl md:rounded-[31px] flex flex-wrap items-center gap-3 md:gap-5 border border-white/10 shadow-lg pointer-events-auto"
              >
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0"
                >
                  {isPlaying ? (
                    <Pause size={20} fill="black" />
                  ) : (
                    <Play
                      size={20}
                      fill="black"
                      className={isRTL ? "mr-0.5" : "ml-0.5"}
                    />
                  )}
                </button>
                <div className="flex flex-1 items-center gap-2 md:gap-4">
                  <span className="text-white text-xs md:text-base">
                    {formatTime(isRTL ? duration - currentTime : currentTime)}
                  </span>
                  <div
                    ref={progressRef}
                    className="flex-1 h-1 md:h-1.5 bg-white/30 rounded-full relative cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className={`absolute top-0 h-full bg-white rounded-full ${isRTL ? "right-0" : "left-0"}`}
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-xs md:text-base">
                    {formatTime(isRTL ? currentTime : duration - currentTime)}
                  </span>
                </div>
                <div className="flex items-center gap-3 md:gap-6 px-2">
                  <Maximize
                    className="text-white cursor-pointer hover:opacity-70"
                    size={20}
                    onClick={toggleFullscreen}
                  />
                  <div className="relative group">
                    <Settings className="text-white cursor-pointer" size={20} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 rounded-lg p-1 min-w-25 shadow-xl">
                      {[0.5, 1, 1.5, 2].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSpeedChange(s)}
                          className="w-full text-white text-xs py-1 hover:bg-white/10"
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative group">
                    <Volume2 className="text-white cursor-pointer" size={20} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 p-2 rounded-lg">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 appearance-none bg-white/30 rounded-full"
                      />
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
