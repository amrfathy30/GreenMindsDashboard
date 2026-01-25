import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
    deleting: "Deleting...",
    delete: "Delete",
    age_groups: "Age groups",
    from: "from",
    add_age_groups: "add age group",
    actions: "Actions",
    age_groups_name: "Age groups Name",
    operation_failed: "Operation failed",
    success_age_create: "Age group created successfully",
    success_age_update: "Age group updated successfully",
    from_less_to: "From age must be less than To age",
    failed_delete_age: "Failed to delete age group",
    success_delete_age: "The age group has been deleted successfully",
    failed_load_age: "Failed to load age groups",
    delete_age: "Delete Age Group",
    confirm_delete_age: "Are you sure you want to delete this age group?",
    modalTitleAddAge: "Add Age Group",
    modalTitleEditAge: "Edit Age Group",
    ageNameLabel: "Age Name",
    ageNamePlaceholder: "Type age name",
    fromLabel: "From",
    fromPlaceholder: "From",
    toLabel: "To",
    toPlaceholder: "To",
    saveButton: "Save",
    updateButton: "Update",
    Previous: "Previous",
    Next: "Next",
    saving: "Saving...",
    updating: "Updating...",

    // Video translations
    video_added: "Video added successfully",
    video_updated: "Video updated successfully",
    video_deleted: "Video deleted successfully",
    failed_load_videos: "Failed to load videos",
    add_video_title: "Add New Video",
    edit_video_title: "Edit Video",
    points_label: "Number of Points",
    confirm_delete_video: "Are you sure you want to delete this video?",
    success_video_delete: "Video deleted successfully",
    success_video_create: "Video created successfully",
    success_video_update: "Video updated successfully",
    Thumbnail: "Thumbnail",
    title: "Title",
    points: "Points",
    "Videos - Admin": "Videos - Admin",
    "age group": "Age Group",
   
  },
  
  ar: {
    videos: "فيديوهات",
    games: "ألعاب",
    avatars: "الصور الرمزية",
    settings: "إعدادات",
    analytics: "تحليلات",
    users: "مستخدمين",
    Videos_Admin: "إدارة الفيديوهات",
    deleting: "جار الحذف...",
    delete: "حذف",
    from: "من",
    add_age_groups: "إضافة الفئة العمرية",
    actions: "الاجراءات",
    age_groups: "الفئات العمرية",
    age_groups_name: "اسم الفئات العمرية",
    operation_failed: "فشلت العملية",
    success_age_create: "تم إنشاء الفئة العمرية بنجاح",
    success_age_update: "تم تحديث الفئة العمرية بنجاح",
    from_less_to: "يجب أن يكون عمر من أقل من عمر إلى",
    failed_delete_age: "فشل حذف الفئة العمرية",
    success_delete_age: "تم حذف الفئة العمرية بنجاح",
    failed_load_age: "فشل تحميل الفئات العمرية",
    delete_age: "حذف الفئة العمرية",
    confirm_delete_age: "هل انت متأكد من انك تريد حذف هذه الفئة العمرية ؟",
    modalTitleAddAge: "إضافة فئة عمرية",
    modalTitleEditAge: "تعديل الفئة العمرية",
    ageNameLabel: "اسم الفئة العمرية",
    ageNamePlaceholder: "اكتب اسم الفئة العمرية",
    fromLabel: "من",
    fromPlaceholder: "من",
    toLabel: "إلى",
    toPlaceholder: "إلى",
    saveButton: "حفظ",
    Next: "التالي",
    Previous: "السابق",
    updateButton: "تحديث",
    saving: "جارٍ الحفظ...",
    updating: "جارٍ التحديث...",
    
    // Video translations
    video_added: "تم إضافة الفيديو بنجاح",
    video_updated: "تم تحديث الفيديو بنجاح",
    video_deleted: "تم حذف الفيديو بنجاح",
    failed_load_videos: "فشل تحميل الفيديوهات",
    add_video_title: "إضافة فيديو جديد",
    edit_video_title: "تعديل الفيديو",
    points_label: "عدد النقاط",
    confirm_delete_video: "هل أنت متأكد من أنك تريد حذف هذا الفيديو؟",
    success_video_delete: "تم حذف الفيديو بنجاح",
    success_video_create: "تم إضافة الفيديو بنجاح",
    success_video_update: "تم تحديث الفيديو بنجاح",
    Thumbnail: "الصورة المصغرة",
    title: "العنوان",
    points: "النقاط",
    "Videos - Admin": "إدارة الفيديوهات",
    "age group": "الفئة العمرية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

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
    if (isRTL) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}