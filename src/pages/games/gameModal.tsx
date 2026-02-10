/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import { createGame, updateGame } from "../../api/services/gameService";
import { allAgeData } from "../../api/services/ageService";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
const BASE_URL = "https://kidsapi.pulvent.com";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData?: any;
  type: "add" | "edit";
  onSuccess: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  gameData,
  type,
  onSuccess,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);

  const [formDataState, setFormDataState] = useState({
    nameEn: "",
    nameAr: "",
    descEn: "",
    descAr: "",
    android: "",
    ios: "",
    appLink: "",
    ageSectorId: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        const response = await allAgeData();
        if (response && response.Data) {
          setAgeGroups(response.Data);
        }
      } catch (error) {
        console.error("Failed to fetch age groups", error);
      }
    };
    if (isOpen) fetchAgeGroups();
  }, [isOpen]);

  useEffect(() => {
    if (gameData && isOpen) {
      const tUrl = gameData.ThumbnailUrl || "";
      setFormDataState({
        nameEn: gameData.GameNameEn || "",
        nameAr: gameData.GameNameAr || "",
        descEn: gameData.DescriptionEn || "",
        descAr: gameData.DescriptionAr || "",
        android: gameData.AndroidLink || "",
        ios: gameData.IosLink || "",
        appLink: gameData.AppLink || "",
        ageSectorId: gameData.AgeSectorId?.toString() || "",
        thumbnailUrl: tUrl,
      });
      setPreviewImage(
        tUrl ? (tUrl.startsWith("http") ? tUrl : `${BASE_URL}/${tUrl}`) : null,
      );
    } else if (!gameData && isOpen) {
      setFormDataState({
        nameEn: "",
        nameAr: "",
        descEn: "",
        descAr: "",
        android: "",
        ios: "",
        appLink: "",
        ageSectorId: "",
        thumbnailUrl: "",
      });
      setPreviewImage(null);
    }
  }, [gameData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(false);

    if (
      !formDataState.nameEn ||
      !formDataState.nameAr ||
      !formDataState.ageSectorId
    ) {
      setFormError(true);
      toast.error(t("please_fill_required_fields"));
      return;
    }

    const formData = new FormData();
    formData.append("GameNameEn", formDataState.nameEn);
    formData.append("GameNameAr", formDataState.nameAr);
    formData.append("DescriptionEn", formDataState.descEn);
    formData.append("DescriptionAr", formDataState.descAr);
    formData.append("AndroidLink", formDataState.android);
    formData.append("IosLink", formDataState.ios);
    formData.append("AppLink", formDataState.appLink);
    formData.append("AgeSectorId", formDataState.ageSectorId);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("Thumbnail", file);
    } else {
      formData.append("ThumbnailUrl", formDataState.thumbnailUrl);
    }

    setLoading(true);
    try {
      if (type === "edit") {
        const id = gameData.Id || gameData.id;
        if (id) formData.append("Id", id.toString());
        await updateGame(formData);
        ShowToastSuccess(t("game_updated_successfully"));
      } else {
        await createGame(formData);
        ShowToastSuccess(t("game_created_successfully"));
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      const serverErrors = error.response?.data?.Data;
      let customMsg = "";

      if (serverErrors && typeof serverErrors === "object") {
        const firstKey = Object.keys(serverErrors)[0];
        customMsg = serverErrors[firstKey][0];
      }

      const finalMsg =
        customMsg || error.response?.data?.Message || t("something_went_wrong");

      toast.error(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setFormDataState((prev) => ({ ...prev, thumbnailUrl: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type === "edit" ? t("edit_game") : t("add_new_game")}
    >
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <Input
          id="nameEn"
          label={t("game_name_en")}
          value={formDataState.nameEn}
          onChange={handleChange}
          required
          error={formError && !formDataState.nameEn}
        />
        <Input
          id="nameAr"
          label={t("game_name_ar")}
          value={formDataState.nameAr}
          onChange={handleChange}
          required
          error={formError && !formDataState.nameAr}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            {t("select_age_group")}
          </label>
          <select
            id="ageSectorId"
            value={formDataState.ageSectorId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-black outline-none transition focus:border-primary dark:border-gray-700 dark:text-white dark:bg-[#1a222c]"
          >
            <option value="" disabled>
              {t("select_age_group")}
            </option>
            {ageGroups.map((group: any) => (
              <option key={group.Id} value={group.Id}>
                {`${t("from")} ${group.FromAge} : ${group.ToAge}`}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <TextArea
            id="descEn"
            label={t("description_en")}
            value={formDataState.descEn}
            onChange={(val) =>
              setFormDataState((prev) => ({ ...prev, descEn: val }))
            }
            required
          />
          <TextArea
            id="descAr"
            label={t("description_ar")}
            value={formDataState.descAr}
            onChange={(val) =>
              setFormDataState((prev) => ({ ...prev, descAr: val }))
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { label: t("android_link"), id: "android" },
            { label: t("ios_link"), id: "ios" },
            { label: t("app_link"), id: "appLink" },
          ].map((f) => (
            <Input
              key={f.id}
              id={f.id}
              label={f.label}
              value={(formDataState as any)[f.id]}
              onChange={handleChange}
              required
            />
          ))}
        </div>

        <div className="space-y-2">
          <label className="mb-1.5 block text-sm font-medium text-black dark:text-gray-300">
            {t("upload_thumbnail_label")}
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex h-20 w-25 shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-700">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="h-full w-full object-cover"
                  alt="preview Image"
                />
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
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload size={18} className="text-secondary" />
                <span className="text-sm font-bold bg-linear-to-r from-[#00A7E1] to-secondary bg-clip-text text-transparent">
                  {t("upload_button")}
                </span>
              </button>

              <Input
                id="thumbnailUrl"
                placeholder={t("placeholder_thumb_url_game")}
                value={formDataState.thumbnailUrl}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value) setPreviewImage(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <Button className="mt-2" type="submit" disabled={loading}>
          {loading
            ? t("loading...")
            : type === "edit"
              ? t("updateButton")
              : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
};

export default GameModal;
