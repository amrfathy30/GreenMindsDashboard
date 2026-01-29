import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField"; 
import { createAvatar, updateAvatar } from "../../api/services/avatarService";
import { allAgeData } from "../../api/services/ageService";
import { allLevelData } from "../../api/services/levelService"; 
import { toast } from "sonner";

const IMAGE_BASE_URL = "https://kidsapi.pulvent.com/";

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarData?: any;
  type: 'add' | 'edit';
  onSuccess?: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose, avatarData, type, onSuccess }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ageSectorId: "",
    levelId: "",
  });


  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ageRes, levelRes] = await Promise.all([allAgeData(), allLevelData()]);
        if (ageRes?.Data) setAgeGroups(ageRes.Data);
        if (levelRes?.Data) setLevels(levelRes.Data);
      } catch (error) {
        console.error("Failed to fetch dependencies", error);
      }
    };
    if (isOpen) fetchData();
  }, [isOpen]);

  useEffect(() => {
    if (avatarData && isOpen) {
      setFormData({
        name: avatarData.Name || "",
        ageSectorId: avatarData.AgeSectorId?.toString() || "",
        levelId: avatarData.RequiredLevelId?.toString() || "",
      });
      const fullImageUrl = avatarData.ImageUrl?.startsWith('http')
        ? avatarData.ImageUrl
        : `${IMAGE_BASE_URL}${avatarData.ImageUrl}`;
      setPreviewImage(fullImageUrl || null);
    } else if (isOpen) {
      setFormData({ name: "", ageSectorId: "", levelId: "" });
      setPreviewImage(null);
    }
  }, [avatarData, isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/; 
    if (!nameRegex.test(formData.name)) {
      toast.error(t("name_error_letters")); 
      return;
    }

    if (!formData.name || !formData.ageSectorId || !formData.levelId || (!previewImage && type === 'add')) {
      toast.error(t("please_check_required_fields"));
      return;
    }

    const data = new FormData();
    data.append("Name", formData.name.trim());
    data.append("AgeSectorId", formData.ageSectorId);
    data.append("RequiredLevelId", formData.levelId);
    data.append("IsActive", "true");
    data.append("IsDefault", "false");
    data.append("RequiredPoints", "0");

    if (fileInputRef.current?.files?.[0]) {
      data.append("Image", fileInputRef.current.files[0]);
    }

    setIsSubmitting(true);
    const toastId = toast.loading(type === 'edit' ? t("updating...") : t("saving..."));

    try {
      if (type === 'edit') {
        data.append("Id", avatarData.Id || avatarData.id);
        await updateAvatar(data);
      } else {
        await createAvatar(data);
      }
      onSuccess?.();
      onClose();
      toast.success(t("success"), { id: toastId });
    } catch (error: any) {
      toast.error(error.response?.data?.Message || t("error"), { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={type === 'edit' ? t("edit_avatar") : t("add_avatar")} className="max-w-xl mx-4">
      <Form onSubmit={onSubmit} className="flex flex-col gap-4 p-6 my-6 border rounded-2xl">
        
        <Input 
          label={t("Name")} 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("select_age_group")}</label>
          <select 
            value={formData.ageSectorId} 
            onChange={(e) => setFormData({...formData, ageSectorId: e.target.value})}
            className="w-full rounded-lg border p-2.5 dark:bg-[#1a222c] dark:border-gray-700"
            required
          >
            <option value="">{t("select_age_group")}</option>
            {ageGroups.map(g => (
              <option key={g.Id} value={g.Id}>
                {`${t("from")} ${g.FromAge} ${t("toPlaceholder")} ${g.ToAge}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("level_label")}</label>
          <select 
            value={formData.levelId} 
            onChange={(e) => setFormData({...formData, levelId: e.target.value})}
            className="w-full rounded-lg border p-2.5 dark:bg-[#1a222c] dark:border-gray-700"
            required
          >
            <option value="">{t("select_level")}</option>
            {levels.map(l => <option key={l.Id} value={l.Id}>{l.NameEn || l.Name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">{t("upload_avatar_label")}</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
              {previewImage ? <img src={previewImage} className="h-full w-full object-cover" /> : <ImageIcon className="text-gray-400" />}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <div className="text-[#25B16F]"><Upload size={18} strokeWidth={2.5} /></div>
              <span className="text-sm font-bold bg-gradient-to-r from-[#00A7E1] to-[#25B16F] bg-clip-text text-transparent">
                {t("upload_avatar_btn")}
              </span>
            </button>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {type === 'edit' ? t("updateButton") : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
};

export default AvatarModal;