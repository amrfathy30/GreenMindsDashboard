import { FormEvent, useState, useEffect } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { AgeGroupModalProps } from "../../../utils/types/ageType";
import { useLanguage } from "../../../api/locales/LanguageContext";

export default function AgeGroupModal({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}: AgeGroupModalProps) {
  const { t } = useLanguage();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [DisplayName, setDisplayName] = useState("");

  useEffect(() => {
    if (initialData) {
      setFrom(initialData.from);
      setTo(initialData.to);
      setDisplayName(initialData.DisplayName);
    } else {
      setFrom("");
      setTo("");
      setDisplayName("");
    }
  }, [initialData, open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave({
      id: initialData?.id,
      from,
      to,
      DisplayName,
    });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("modalTitleEditAge") : t("modalTitleAddAge")}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-6 mt-4">
        <div className="border-b pb-4">
          <Input
            id="DisplayName"
            label={t("ageNameLabel")}
            placeholder={t("ageNamePlaceholder")}
            value={DisplayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="border-b pb-4">
          <Input
            id="FromAge"
            label={t("fromLabel")}
            placeholder={t("fromPlaceholder")}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="border-b pb-4">
          <Input
            id="ToAge"
            label={t("toLabel")}
            placeholder={t("toPlaceholder")}
            value={to}
            onChange={(e) => setTo(e.target.value)}
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
