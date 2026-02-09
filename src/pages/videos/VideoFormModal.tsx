import React, { useEffect, useState, useRef } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { useLanguage } from "../../locales/LanguageContext";
import { VideoFormModalProps } from "../../utils/types/videoType";
import { allAgeData } from "../../api/services/ageService";
import Input from "../../components/form/input/InputField";
import Form from "../../components/form/Form";
import { Upload, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { hasPermission } from "../../utils/permissions/permissions";

const BASE_URL = "https://kidsapi.pulvent.com";

interface AgeSector {
  Id: number;
  DisplayName: string;
  FromAge: number;
  ToAge: number;
}

export default function VideoFormModal({
  isOpen,
  onClose,
  onSave,
  type,
  initialData,
  loading,
}: VideoFormModalProps) {
  const { t, isRTL } = useLanguage();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [points, setPoints] = useState(0);
  const [ageSectorId, setAgeSectorId] = useState("");
  const [ageSectors, setAgeSectors] = useState<AgeSector[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const canViewAges = hasPermission("AgeSectors_GetPaged");

  useEffect(() => {
    const fetchAges = async () => {
      if (!canViewAges) return;

      try {
        const res = await allAgeData();
        setAgeSectors(res.Data || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (isOpen) fetchAges();
    if (initialData && isOpen) {
      setTitleEn(initialData.TitleEn || "");
      setTitleAr(initialData.TitleAr || "");
      setPoints(initialData.NumberOfPoints || 0);
      setAgeSectorId(initialData.AgeSectorId?.toString() || "");
      const vUrl = initialData.VideoUrl || "";
      const tUrl = initialData.ThumbnailUrl || "";
      setVideoUrl(vUrl);
      setThumbnailUrl(tUrl);
      setThumbPreview(
        tUrl ? (tUrl.startsWith("http") ? tUrl : `${BASE_URL}/${tUrl}`) : null,
      );
      setVideoPreview(
        vUrl ? (vUrl.startsWith("http") ? vUrl : `${BASE_URL}/${vUrl}`) : null,
      );
    } else if (!initialData && isOpen) {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setTitleEn("");
    setTitleAr("");
    setVideoUrl("");
    setThumbnailUrl("");
    setPoints(0);
    setAgeSectorId("");
    setThumbnailFile(null);
    setVideoFile(null);
    setThumbPreview(null);
    setVideoPreview(null);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "thumb" | "video",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === "thumb") {
        setThumbnailFile(file);
        setThumbPreview(URL.createObjectURL(file));
        setThumbnailUrl("");
      } else {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
        setVideoUrl("");
      }
    }
  };

  const handleThumbnailUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setThumbnailUrl(url);
    if (url) {
      setThumbPreview(url.startsWith("http") ? url : `${BASE_URL}/${url}`);
      setThumbnailFile(null);
    } else setThumbPreview(null);
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    if (url) {
      setVideoPreview(url.startsWith("http") ? url : `${BASE_URL}/${url}`);
      setVideoFile(null);
    } else setVideoPreview(null);
  };

  const isFormValid = () => {
    return (
      titleEn.trim() !== "" &&
      titleAr.trim() !== "" &&
      (videoFile !== null || videoUrl.trim() !== "") &&
      (thumbnailFile !== null || thumbnailUrl.trim() !== "") &&
      ageSectorId !== "" &&
      points > 0
    );
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const formData = new FormData();
    if (initialData) formData.append("Id", initialData.Id.toString());
    formData.append("TitleEn", titleEn);
    formData.append("TitleAr", titleAr);
    formData.append("NumberOfPoints", points.toString());
    formData.append("AgeSectorId", ageSectorId);
    if (videoFile) formData.append("VideoFile", videoFile);
    else formData.append("VideoUrl", videoUrl);
    if (thumbnailFile) formData.append("Thumbnail", thumbnailFile);
    else formData.append("ThumbnailUrl", thumbnailUrl);
    await onSave(formData);
  };

  const getYTID = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type === "add" ? t("add_video_title") : t("edit_video_title")}
    >
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 md:p-6 my-4 md:my-6 border rounded-2xl dark:border-gray-700"
      >
        <div className="flex flex-col gap-3">
          <div className={`${isRTL ? "order-1" : "order-2"}`}>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              {isRTL ? "عنوان الفيديو بالعربي" : "Video title (AR)"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder={t("placeholder_title_ar")}
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              required
            />
          </div>
          <div className={`${isRTL ? "order-2" : "order-1"}`}>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              {isRTL ? "عنوان الفيديو بالانجليزي" : "Video title (EN)"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder={t("placeholder_title_en")}
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {t("label_video")} <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}
          >
            <div className="relative flex h-[100px] w-full md:w-[120px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700">
              {videoPreview ? (
                getYTID(videoPreview) ? (
                  <img
                    src={`https://img.youtube.com/vi/${getYTID(videoPreview)}/0.jpg`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                ) : (
                  <video
                    src={videoPreview}
                    className="h-full w-full object-cover"
                    muted
                  />
                )
              ) : (
                <VideoIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input
                type="file"
                ref={videoInputRef}
                className="hidden"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video")}
              />
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload size={18} className="text-[#25B16F]" />
                <span className="text-[#25B16F] font-bold text-sm">
                  {t("upload_video")}
                </span>
              </button>
              <Input
                placeholder={t("placeholder_video_url")}
                value={videoUrl}
                onChange={handleVideoUrlChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {t("label_thumb")} <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}
          >
            <div className="relative flex h-[100px] w-full md:w-[120px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700">
              {thumbPreview ? (
                <img
                  src={thumbPreview}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input
                type="file"
                ref={thumbInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumb")}
              />
              <button
                type="button"
                onClick={() => thumbInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload size={18} className="text-[#25B16F]" />
                <span className="text-[#25B16F] font-bold text-sm">
                  {t("upload_thumb")}
                </span>
              </button>
              <Input
                placeholder={t("placeholder_thumb_url")}
                value={thumbnailUrl}
                onChange={handleThumbnailUrlChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {canViewAges ? (
            <div className="space-y-2">
              <>
                <label className="block text-sm font-medium text-black dark:text-gray-300">
                  {t("age group")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={ageSectorId}
                  onChange={(e) => setAgeSectorId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm dark:text-white dark:bg-[#1e1e1e]"
                  required
                >
                  <option value="" disabled>
                    {t("select_age")}
                  </option>
                  {ageSectors.map((age) => (
                    <option key={age.Id} value={age.Id.toString()}>
                      {age.FromAge} : {age.ToAge}
                    </option>
                  ))}
                </select>
              </>
            </div>
          ) : (
            <span className="text-gray-500">{t("private_age_group")}</span>
          )}{" "}
          <div>
            <label className="block text-sm font-medium text-black dark:text-gray-300 mb-1">
              {t("num_points")} <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              value={points.toString()}
              onChange={(e) => setPoints(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className={`mt-4 py-3 transition-all duration-300 ${!isFormValid() ? "opacity-50 cursor-not-allowed bg-gray-400" : ""}`}
          disabled={loading || !isFormValid()}
        >
          {loading
            ? t("saving")
            : type === "add"
              ? t("add_video_btn")
              : t("save_edit_btn")}
        </Button>
      </Form>
    </Modal>
  );
}
