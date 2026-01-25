import React, { useEffect, useState, useRef } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { useLanguage } from "../../api/locales/LanguageContext";
import { VideoFormModalProps } from "../../utils/types/videoType";
import { allAgeData } from "../../api/services/ageService";
import Input from "../../components/form/input/InputField";
import Form from "../../components/form/Form";
import { Upload, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

const BASE_URL = "https://kidsapi.pulvent.com";

interface AgeSector {
  Id: number;
  DisplayName: string;
  FromAge: number; 
  ToAge: number;  
}

export default function VideoFormModal({ isOpen, onClose, onSave, type, initialData, loading }: VideoFormModalProps) {
  const { t, isRTL } = useLanguage();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [points, setPoints] = useState(0);
  const [ageSectorId, setAgeSectorId] = useState("");
  const [ageSectors, setAgeSectors] = useState<AgeSector[]>([]);
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchAges = async () => {
      try {
        const res = await allAgeData();
        setAgeSectors(res.Data || []);
      } catch (err) { console.error(err); }
    };
    if (isOpen) fetchAges();

    if (initialData && isOpen) {
      setTitleEn(initialData.TitleEn || "");
      setTitleAr(initialData.TitleAr || "");
      setVideoUrl(initialData.VideoUrl || "");
      setPoints(initialData.NumberOfPoints || 0);
      setAgeSectorId(initialData.AgeSectorId?.toString() || "");
      
      const thumbPath = initialData.ThumbnailUrl;
      setThumbPreview(thumbPath ? (thumbPath.startsWith('http') ? thumbPath : `${BASE_URL}/${thumbPath}`) : null);
      
      const videoPath = initialData.VideoUrl;
      setVideoPreview(videoPath ? (videoPath.startsWith('http') ? videoPath : `${BASE_URL}${videoPath}`) : null);
    } else if (!initialData && isOpen) {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setTitleEn(""); setTitleAr(""); setVideoUrl(""); setPoints(0); 
    setAgeSectorId(""); setThumbnailFile(null); setVideoFile(null); 
    setThumbPreview(null); setVideoPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'thumb' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'thumb') {
        setThumbnailFile(file);
        setThumbPreview(URL.createObjectURL(file));
      } else {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const formData = new FormData();
    if (initialData) formData.append("Id", initialData.Id.toString());
    formData.append("TitleEn", titleEn);
    formData.append("TitleAr", titleAr);
    formData.append("VideoUrl", videoUrl);
    formData.append("NumberOfPoints", points.toString());
    formData.append("AgeSectorId", ageSectorId);
    if (thumbnailFile) formData.append("Thumbnail", thumbnailFile);
    if (videoFile) formData.append("VideoFile", videoFile);
    await onSave(formData);
  };

  const gradientTextStyle = "bg-gradient-to-r from-[#00A7E1] to-[#25B16F] bg-clip-text text-transparent font-bold text-sm";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type === "add" ? (isRTL ? "إضافة فيديو جديد" : "Add New Video") : (isRTL ? "تعديل الفيديو" : "Edit Video")}
    >
      <Form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 my-6 border rounded-2xl dark:border-gray-700">
        {isRTL ? (
          <>
            <Input label="عنوان الفيديو بالعربي" placeholder="ادخل عنوان الفيديو هنا" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
            <Input label="عنوان الفيديو بالانجليزي" placeholder="Enter video title here" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
          </>
        ) : (
          <>
            <Input label="Video title (EN)" placeholder="Enter video title here" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
            <Input label="Video title (AR)" placeholder="ادخل عنوان الفيديو هنا" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
          </>
        )}

        {/* Video Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {isRTL ? "تحميل فيديو أو إضافة لينك الفيديو" : "Upload Video or Add the Video link"}
          </label>
          <div className={`flex flex-col sm:flex-row items-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`relative flex h-[80px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700 ${isRTL ? 'order-first sm:order-last' : ''}`}>
              {videoPreview ? (
                <video 
                  src={videoPreview} 
                  className="h-full w-full object-cover"
                  controls={false}
                  muted
                />
              ) : (
                <VideoIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
              <button type="button" onClick={() => videoInputRef.current?.click()} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="text-[#25B16F]"><Upload size={18} strokeWidth={2.5} /></div>
                <span className={gradientTextStyle}>{isRTL ? "تحميل فيديو" : "Upload Video"}</span>
              </button>
              <Input placeholder={isRTL ? "ادخل رابط الفيديو هنا" : "Enter video URL here"} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Thumbnail Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {isRTL ? "تحميل الصورة المصغرة للفيديو أو إضافة لينك الصورة المصغرة" : "Upload Video Thumbnail or Add the Video Thumbnail link"}
          </label>
          <div className={`flex flex-col sm:flex-row items-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`relative flex h-[80px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700 ${isRTL ? 'order-first sm:order-last' : ''}`}>
              {thumbPreview ? (
                <img src={thumbPreview} alt="Thumbnail Preview" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'thumb')} />
              <button type="button" onClick={() => thumbInputRef.current?.click()} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="text-[#25B16F]"><Upload size={18} strokeWidth={2.5} /></div>
                <span className={gradientTextStyle}>{isRTL ? "تحميل الصورة المصغرة" : "Upload Thumbnail"}</span>
              </button>
              <Input placeholder={isRTL ? "ادخل رابط الصورة المصغرة هنا" : "Enter video Thumbnail URL here"} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black dark:text-gray-300">{isRTL ? "الفئة العمرية" : "Age group"}</label>
            <select 
              value={ageSectorId} 
              onChange={(e) => setAgeSectorId(e.target.value)} 
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-black outline-none focus:border-[#00A7E1] transition-colors dark:border-gray-700 dark:text-white dark:bg-[#1e1e1e]" 
              required
            >
              <option value="" disabled>{isRTL ? "اختر الفئة" : "Select Age"}</option>
              {ageSectors.map((age) => (
  <option key={age.Id} value={age.Id.toString()}>
    {age.FromAge} : {age.ToAge}
  </option>
))}
            </select>
          </div>
          <Input label={isRTL ? "عدد النقاط" : "Number of points"} type="number" value={points.toString()} onChange={(e) => setPoints(Number(e.target.value))} />
        </div>
        <Button type="submit" className="mt-4 py-3" disabled={loading}>
          {loading ? t("saving") : (type === "add" ? (isRTL ? "إضافة فيديو" : "Add Video") : (isRTL ? "حفظ التعديلات" : "Save Edit"))}
        </Button>
      </Form>
    </Modal>
  );
}