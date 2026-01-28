import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import { createAvatar, updateAvatar } from "../../api/services/avatarService";
import { allAgeData } from "../../api/services/ageService";
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
  const [selectedAgeSector, setSelectedAgeSector] = useState("");
  const [errors, setErrors] = useState<{ image?: string; ageSector?: string }>({});
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        const response = await allAgeData();
        if (response?.Data) setAgeGroups(response.Data);
      } catch (error) {
        console.error("Failed to fetch age groups", error);
      }
    };
    if (isOpen) fetchAgeGroups();
  }, [isOpen]);

  useEffect(() => {
    if (avatarData && isOpen) {
      setSelectedAgeSector(avatarData.AgeSectorId?.toString() || "");
      const fullImageUrl = avatarData.ImageUrl?.startsWith('http') 
        ? avatarData.ImageUrl 
        : `${IMAGE_BASE_URL}${avatarData.ImageUrl}`;
      setPreviewImage(fullImageUrl || null);
    } else if (isOpen) {
      setSelectedAgeSector("");
      setPreviewImage(null);
      setErrors({});
    }
  }, [avatarData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setErrors((prev) => ({ ...prev, image: undefined }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { image?: string; ageSector?: string } = {};
    
    if (!previewImage && type === 'add') newErrors.image = t("upload_image_error");
    if (!selectedAgeSector) newErrors.ageSector = t("select_age_error");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t("please_check_required_fields")); 
      return; 
    }

    const formData = new FormData();
    formData.append("Name", "Avatar_" + Date.now()); 
    formData.append("AgeSectorId", selectedAgeSector);
    formData.append("IsActive", "true");
    formData.append("IsDefault", "false");
    formData.append("RequiredLevelId", avatarData?.RequiredLevelId || "1"); 
    formData.append("RequiredPoints", avatarData?.RequiredPoints || "0");  

    if (fileInputRef.current?.files?.[0]) {
      formData.append("Image", fileInputRef.current.files[0]);
    }

    // setIsSubmitting(true);
    const toastId = toast.loading(type === 'edit' ? t("updating...") : t("saving..."));

    try {
      if (type === 'edit') {
        formData.append("Id", avatarData.Id || avatarData.id);
        await updateAvatar(formData);
        toast.success(t("avatar_updated_success"), { id: toastId });
      } else {
        await createAvatar(formData); 
        toast.success(t("avatar_added_success"), { id: toastId });
      }
      onSuccess?.(); 
      onClose(); 
    } catch (error: any) {
      const errorMsg = error.response?.data?.Message || t("something_went_wrong");
      toast.error(errorMsg, { id: toastId });
    } finally {
      // setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type === 'edit' ? t("edit_avatar") : t("add_avatar")}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-6 my-6 border rounded-2xl">
        <div className="space-y-2">
          <label className="mb-1.5 block text-sm font-medium text-black dark:text-gray-300">
            {t("upload_avatar_label")}
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
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
              {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
              
              <select
                value={selectedAgeSector}
                onChange={(e) => {
                  setSelectedAgeSector(e.target.value);
                  setErrors(prev => ({ ...prev, ageSector: undefined }));
                }}
                className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-black outline-none transition focus:border-primary dark:border-gray-700 dark:text-white dark:bg-[#1a222c]"
              >
                <option value="" disabled>{t("select_age_group")}</option>
                {ageGroups.map((group: any) => (
                  <option key={group.Id} value={group.Id}>
                    {`${t("from")} ${group.FromAge} : ${group.ToAge}`}
                  </option>
                ))}
              </select>
              {errors.ageSector && <p className="text-xs text-red-500 mt-1">{errors.ageSector}</p>}
            </div>
          </div>
        </div>
        <Button className="mt-2" type="submit">
          {type === 'edit' ? t("updateButton") : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
};

export default AvatarModal;