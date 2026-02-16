/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState, useEffect } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { AgeGroupModalProps } from "../../../utils/types/ageType";
import { useLanguage } from "../../../locales/LanguageContext";
import { toast } from "sonner";
import { getTranslatedApiError } from "../../../utils/handleApiError";

export default function AgeGroupModal({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}: AgeGroupModalProps) {
  const { t } = useLanguage();

  const [FromAge, setFromAge] = useState("");
  const [ToAge, setToAge] = useState("");
  const [DisplayName, setDisplayName] = useState("");

  useEffect(() => {
    if (initialData) {
      setFromAge(initialData.FromAge);
      setToAge(initialData.ToAge);
      setDisplayName(initialData.DisplayName);
    } else {
      setFromAge("");
      setToAge("");
      setDisplayName("");
    }
  }, [initialData, open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(FromAge) >= parseInt(ToAge)) {
      toast.error(t("FromAge_less_than_ToAge"));
      return;
    }

    try {
      await onSave({
        id: initialData?.id,
        FromAge,
        ToAge,
        DisplayName,
      });
    } catch (error: any) {
      const errorTranslations: Record<string, string> = {
        "ToAge must be between 1 and 99": t("ToAge_range"),
        "FromAge must be less than ToAge": t("FromAge_less_than_ToAge"),
      };
      const finalMsg = getTranslatedApiError(error, t, errorTranslations);
      toast.error(finalMsg);
    }
  };
  return (
    <Modal
      isOpen={open}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("modalTitleEditAge") : t("modalTitleAddAge")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="DisplayName"
            label={t("ageNameLabel")}
            placeholder={t("ageNamePlaceholder")}
            value={DisplayName}
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <Input
            id="FromAge"
            type="number"
            required
            min="1"
            max="99"
            label={t("fromLabel")}
            placeholder={t("fromPlaceholder")}
            value={FromAge}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (Number(val) >= 1 && Number(val) <= 99)) {
                setFromAge(val);
              }
            }}
          />
        </div>
        <div>
          <Input
            id="ToAge"
            type="number"
            required
            min="1"
            max="99"
            label={t("toLabel")}
            placeholder={t("toPlaceholder")}
            value={ToAge}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) <= 99) {
                setToAge(val);
              }
            }}
          />
        </div>
        <Button type="submit" className="mt-2" disabled={loading}>
          {loading
            ? initialData
              ? t("updating")
              : t("saving")
            : initialData
              ? t("updateButton")
              : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
}
