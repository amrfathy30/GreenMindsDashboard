import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../locales/LanguageContext";
import { AddRoleModalProps } from "../../../utils/types/permissionType";

export default function AddRoleModal({
  open,
  onClose,
  onSave,
  initialData,
  loading,
  editing = false,
}: AddRoleModalProps) {
  const { t } = useLanguage();

  const [RoleName, setRoleName] = useState("");
  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.RoleName);
    } else {
      setRoleName("");
    }
  }, [initialData, open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave({
      RoleName,
    });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      className="max-w-xl mx-4"
      title={editing ? t("edit_admin_role") : t("add_admin_role")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <Input
          label={t("RoleName")}
          type="text"
          id="RoleName"
          value={RoleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <Button type="submit" className="mt-2" disabled={loading}>
          {loading ? t("saving") : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
}
