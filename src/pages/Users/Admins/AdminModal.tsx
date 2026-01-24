import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Checkbox from "../../../components/form/input/Checkbox";
import { Admin } from "./AdminsList";
import { useLanguage } from "../../../api/locales/LanguageContext";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Admin | null;
  onSave: (data: Admin) => void;
}

export default function AdminModal({
  open,
  onClose,
  initialData,
  onSave,
}: AdminModalProps) {
  const { t } = useLanguage();

  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    permissions: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        permissions: initialData.permissions,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        permissions: [],
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      id: initialData?.id ?? Date.now(),
      ...formData,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("EditAdmin") : t("AddNewAdmin")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="name_En"
            label={t("AdminNameEN")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label={t("AdminNameAR")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="email"
            label={t("AdminEmail")}
            placeholder={t("EnterAdminEmail")}
          />
        </div>
        <div className="">
          <h2>{t("AdminPermissions")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
            <Checkbox
              label={"Permission 1"} // fallback in case you add it later
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={"Permission 1"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
          </div>
        </div>

        <Button className="mt-2">
          {initialData ? t("UpdateAdmin") : t("AddAdmin")}
        </Button>
      </Form>
    </Modal>
  );
}
