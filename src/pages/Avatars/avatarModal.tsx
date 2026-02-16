/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import { createAvatar, updateAvatar } from "../../api/services/avatarService";
import { allAgeData } from "../../api/services/ageService";
import { toast } from "sonner";
import { getTranslatedApiError } from "../../utils/handleApiError";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

const IMAGE_BASE_URL = "https://kidsapi.pulvent.com/";

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarData?: any;
  type: "add" | "edit";
  onSuccess?: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  avatarData,
  type,
  onSuccess,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ageSectorId: "",
  });

  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ageRes] = await Promise.all([allAgeData()]);
        if (ageRes?.Data) setAgeGroups(ageRes.Data);
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
      });
      const fullImageUrl = avatarData.ImageUrl?.startsWith("http")
        ? avatarData.ImageUrl
        : `${IMAGE_BASE_URL}${avatarData.ImageUrl}`;
      setPreviewImage(fullImageUrl || null);
    } else if (isOpen) {
      setFormData({ name: "", ageSectorId: "" });
      setPreviewImage(null);
    }
  }, [avatarData, isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];

    if (!allowedTypes.includes(file.type)) {
      toast.error(t("imageTypeAllowed"));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z\u0600-\u06FF/0-9\s]+$/;
    if (!nameRegex.test(formData.name)) {
      toast.error(t("name_error_letters"));
      return;
    }

    if (
      !formData.name ||
      !formData.ageSectorId ||
      (!previewImage && type === "add")
    ) {
      toast.error(t("please_check_required_fields"));
      return;
    }

    const data = new FormData();
    data.append("Name", formData.name.trim());
    data.append("AgeSectorId", formData.ageSectorId);
    data.append("IsActive", "true");
    data.append("IsDefault", "false");
    data.append("RequiredPoints", "0");

    if (fileInputRef.current?.files?.[0]) {
      data.append("Image", fileInputRef.current.files[0]);
    }

    setIsSubmitting(true);

    try {
      let res;

      if (type === "edit") {
        data.append("Id", avatarData.Id || avatarData.id);
        res = await updateAvatar(data);
      } else {
        res = await createAvatar(data);
      }
      onSuccess?.();
      onClose();
      ShowToastSuccess(
        res?.Message ||
          t(type === "edit" ? "success_update" : "success_create"),
      );
    } catch (error: any) {
      const translations: Record<string, string> = {
        "An avatar with the same name already exists": t("avatar_name_exists"),
        "Validation failed.": t("validation_failed"),
        "Invalid file extension. Allowed: .jpg, .jpeg, .png, .webp":
          t("invalid_extension"),
      };
      const finalMsg = getTranslatedApiError(error, t, translations);

      toast.error(finalMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      title={type === "edit" ? t("edit_avatar") : t("add_avatar")}
      className="max-w-xl mx-4"
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-6 my-6 border rounded-2xl"
      >
        <Input
          label={t("Name")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-medium dark:text-gray-300">
            {t("select_age_group")}
          </label>
          <select
            value={formData.ageSectorId}
            onChange={(e) =>
              setFormData({ ...formData, ageSectorId: e.target.value })
            }
            className="w-full rounded-lg border p-2.5 dark:bg-[#1a222c] dark:border-gray-700 dark:text-white outline-none"
            required
          >
            <option value="">{t("select_age_group")}</option>
            {ageGroups.map((g) => (
              <option key={g.Id} value={g.Id}>
                {`${t("from")} ${g.FromAge} ${t("toPlaceholder")} ${g.ToAge}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium dark:text-gray-300">
            {t("upload_avatar_label")}
          </label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="h-full w-full object-cover"
                  alt="avatar image"
                />
              ) : (
                <ImageIcon className="text-gray-400" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.jfif"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
            >
              <div className="text-secondary">
                <Upload size={18} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold bg-linear-to-r from-[#00A7E1] to-secondary bg-clip-text text-transparent">
                {t("upload_avatar_btn")}
              </span>
            </button>
          </div>
          <p className="text-[10px] text-red-500 -mt-1">
            {t("imageTypeAllowed")}
          </p>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>{type === "edit" ? t("updating") : t("saving")}</span>
          ) : (
            <span>{type === "edit" ? t("updateButton") : t("saveButton")}</span>
          )}
        </Button>{" "}
      </Form>
    </Modal>
  );
};

export default AvatarModal;
