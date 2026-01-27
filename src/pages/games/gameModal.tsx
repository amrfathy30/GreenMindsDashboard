import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import { createGame, updateGame } from "../../api/services/gameService";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData?: any;
  type: 'add' | 'edit'
  onSuccess: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, gameData, type,onSuccess }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(gameData?.image || null);
  const [formError, setFormError] = useState(false);
  const ageGroups = ["2-4 Years", "5-7 Years", "8-10 Years", "11-13 Years"];
 
const [formDataState, setFormDataState] = useState({
  nameEn: "",
  nameAr: "",
  descEn: "",
  descAr: "",
  android: "",
  ios: "",
  apiLink: "",
  apiKey: "",
  ageGroup: "",
});

useEffect(() => {
  if (gameData && isOpen) {
    setFormDataState({
      nameEn: gameData.GameNameEn || "", 
      nameAr: gameData.GameNameAr || "",
      descEn: gameData.DescriptionEn || "",
      descAr: gameData.DescriptionAr || "",
      android: gameData.AndroidLink || "",
      ios: gameData.IosLink || "",
      apiLink: gameData.ApiLink || "",
      apiKey: gameData.ApiKey || "",
      ageGroup: gameData.AgeGroup || "",
    });
    setPreviewImage(gameData.ThumbnailUrl || null);
  }
}, [gameData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormError(false);

  if (!formDataState.nameEn || !formDataState.nameAr) {
    setFormError(true);
    return;
  }
  const formData = new FormData();
  formData.append("GameNameEn", formDataState.nameEn);
  formData.append("GameNameAr", formDataState.nameAr);
  formData.append("DescriptionEn", formDataState.descEn);
  formData.append("DescriptionAr", formDataState.descAr);
  formData.append("AndroidLink", formDataState.android);
  formData.append("IosLink", formDataState.ios);
  formData.append("ApiLink", formDataState.apiLink);
  formData.append("ApiKey", formDataState.apiKey);
  formData.append("AgeGroup", formDataState.ageGroup);

  const file = fileInputRef.current?.files?.[0];
  if (file) {
    formData.append("Thumbnail", file);
  }

  try {
    if (type === 'edit') {
      if (gameData?.id) {
        formData.append("Id", gameData.id.toString());
      }
      await updateGame(formData);
    } else {
      await createGame(formData);
    }
    
    onSuccess(); 
    onClose();   
  } catch (error: any) {
    setFormError(true);
    const msg = error.response?.data?.message || "Error occurred";
    alert(msg);
  }
};
const handleUploadClick = () => fileInputRef.current?.click();

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
 if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type === 'edit' ? t("edit_game") : t("add_new_game")}
    >
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 my-6  border rounded-2xl"
      >

        <Input
            id="nameEn"
            label={t("game_name_en")}
            placeholder={t("enter_name_placeholder")}
            value={formDataState.nameEn} 
            onChange={handleChange}
            required={true}
            error={formError}
          />

        <Input
            id="nameAr"
            label={t("game_name_ar")}
            placeholder={t("enter_name_placeholder")}
            value={formDataState.nameAr} 
            onChange={handleChange}
            required={true}
            error={formError}
          />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {t("select_age_group")}
          </label>
          <select 
            id="ageGroup"
            value={formDataState.ageGroup}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-black outline-none transition focus:border-primary dark:border-gray-700 dark:text-white dark:bg-[#1a222c]"
          >
            <option value="" disabled>{t("select_age_group")}</option>
            {ageGroups.map((group) => (
              <option key={group} value={group} className="dark:bg-[#1a222c]">
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 space-x-2 w-full">
  <TextArea
    id="descEn"
    label={t("description_en")}
    value={formDataState.descEn}
    onChange={(val) => setFormDataState(prev => ({ ...prev, descEn: val }))}
    required
    error={formError}
  />
  <TextArea
    id="descAr"
    label={t("description_ar")}
    value={formDataState.descAr}
    onChange={(val) => setFormDataState(prev => ({ ...prev, descAr: val }))}
    required
    error={formError}
  />
</div>
        <div className="grid grid-cols-1 gap-3">
  {[
    { label: t("android_link"), id: "android" },
    { label: t("ios_link"), id: "ios" },
    { label: t("api_link"), id: "apiLink" }, 
  ].map((field) => (
    <Input
      key={field.id}
      id={field.id}
      label={field.label}
      placeholder={t("enter_url_placeholder")}
      value={formDataState[field.id as keyof typeof formDataState]} 
      onChange={handleChange}
      required 
      error={formError}
    />
  ))}
  
  <Input
    id="apiKey" 
    label={t("api_key_label")}
    placeholder={t("enter_api_key_placeholder")}
    value={formDataState.apiKey}
    onChange={handleChange}
    required 
    error={formError}
  />
</div>
        <div className="space-y-2">
          <label className="mb-1.5 block text-sm font-medium text-black dark:text-gray-300">
            {t("upload_thumbnail_label")}
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4 ">
            <div className="relative flex h-[80px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-100 border-gray-700">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                <div className="text-[#25B16F]">
                  <Upload size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-[#00A7E1] to-[#25B16F] bg-clip-text text-transparent">
                  {t("upload_button")}
                </span>
              </button>
              <Input 
                id="thumbnail_url" 
                placeholder={t("thumbnail_url_placeholder")}
                defaultValue={gameData?.thumbnailUrl || ""} 
                required={true}
                error={formError}
              />
            </div>
          </div>
        </div>


        <Button className="mt-2" type="submit">{type === 'edit' ? t("updateButton") : t("saveButton")}</Button>
      </Form>
    </Modal>

  );
};

export default GameModal;