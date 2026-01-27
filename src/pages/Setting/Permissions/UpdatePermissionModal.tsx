import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { UpdatePermissionModalProps } from "../../../utils/types/permissionType";
import { useLanguage } from "../../../locales/LanguageContext";

export default function UpdatePermissionModal({
  open,
  onClose,
  onSave,
  initialData,
  loading,
}: UpdatePermissionModalProps) {
  const { t } = useLanguage();

  const [DisplayName, setDisplayName] = useState("");
  useEffect(() => {
    if (initialData) {
      setDisplayName(initialData.DisplayName);
    } else {
      setDisplayName("");
    }
  }, [initialData, open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave({
      id: initialData?.id,
      DisplayName,
    });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={t("UpdatePermission")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <Input
          label={t("permissionName")}
          type="text"
          value={DisplayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
