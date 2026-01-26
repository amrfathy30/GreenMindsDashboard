import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en: {
    videos: "Videos",
    games: "Games",
    analytics: "Analytics",
    avatars: "Avatars",
    settings: "Settings",
    users: "Users",
    Videos_Admin: "Videos - Admin",
    delete: "Delete",
    age_groups: "Age groups",
    from: "from",
    actions: "Actions",
    age_groups_name: "Age groups Name",
    operation_failed: "Operation failed",
    Previous: "Previous",
    Next: "Next",
    saving: "Saving...",
    updating: "Updating...",
    video_added: "Video added successfully",
    video_updated: "Video updated successfully",
    video_deleted: "Video deleted successfully",
    failed_load_videos: "Failed to load videos",
    add_video_title: "Add New Video",
    edit_video_title: "Edit Video",
    confirm_delete_video: "Are you sure you want to delete this video?",
    success_video_delete: "Video deleted successfully",
    success_video_create: "Video created successfully",
    success_video_update: "Video updated successfully",
    Thumbnail: "Thumbnail",
    title: "Title",
    points: "Points",
    "age group": "Age Group",
    "Videos - Admin": "Videos - Admin",
    placeholder_title_en: "Enter video title here",
    placeholder_title_ar: "Enter video title here in Arabic",
    placeholder_video_url: "Enter video URL here",
    placeholder_thumb_url: "Enter video Thumbnail URL here",
    upload_video: "Upload Video",
    upload_thumb: "Upload Thumbnail",
    label_video: "Upload Video or Add the Video link",
    label_thumb: "Upload Video Thumbnail or Add the Video Thumbnail link",
    select_age: "Select Age",
    num_points: "Number of points",
    add_video_btn: "Add Video",
    save_edit_btn: "Save Edit"
  },
  ar: {
    videos: "فيديوهات",
    games: "ألعاب",
    avatars: "الصور الرمزية",
    settings: "إعدادات",
    analytics: "تحليلات",
    users: "مستخدمين",
    Videos_Admin: "إدارة الفيديوهات",
    delete: "حذف",
    from: "من",
    actions: "الإجراءات",
    age_groups: "الفئات العمرية",
    age_groups_name: "اسم الفئات العمرية",
    operation_failed: "فشلت العملية",
    Next: "التالي",
    Previous: "السابق",
    saving: "جارٍ الحفظ...",
    updating: "جارٍ التحديث...",
    video_added: "تم إضافة الفيديو بنجاح",
    video_updated: "تم تحديث الفيديو بنجاح",
    video_deleted: "تم حذف الفيديو بنجاح",
    failed_load_videos: "فشل تحميل الفيديوهات",
    add_video_title: "إضافة فيديو جديد",
    edit_video_title: "تعديل الفيديو",
    confirm_delete_video: "هل أنت متأكد من أنك تريد حذف هذا الفيديو؟",
    success_video_delete: "تم حذف الفيديو بنجاح",
    success_video_create: "تم إضافة الفيديو بنجاح",
    success_video_update: "تم تحديث الفيديو بنجاح",
    Thumbnail: "الصورة المصغرة",
    title: "العنوان",
    points: "النقاط",
    "age group": "الفئة العمرية",
    "Videos - Admin": "إدارة الفيديوهات",
    placeholder_title_en: "ادخل عنوان الفيديو بالإنجليزية",
    placeholder_title_ar: "ادخل عنوان الفيديو هنا",
    placeholder_video_url: "ادخل رابط الفيديو هنا",
    placeholder_thumb_url: "ادخل رابط الصورة المصغرة هنا",
    upload_video: "تحميل فيديو",
    upload_thumb: "تحميل الصورة المصغرة",
    label_video: "تحميل فيديو أو إضافة لينك الفيديو",
    label_thumb: "تحميل الصورة المصغرة للفيديو أو إضافة لينك الصورة المصغرة",
    select_age: "اختر الفئة",
    num_points: "عدد النقاط",
    add_video_btn: "إضافة فيديو",
    save_edit_btn: "حفظ التعديلات"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("GM-language");
    return saved === "ar" || saved === "en" ? saved : "en";
  });
  const isRTL = language === "ar";
  useEffect(() => {
    localStorage.setItem("GM-language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);
  const t = (key: string): string => translations[language][key as keyof typeof translations.en] || key;
  return <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}