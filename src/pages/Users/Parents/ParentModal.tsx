import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Checkbox from "../../../components/form/input/Checkbox";
import Label from "../../../components/form/Label";
import { Child, Parents } from "./ParentsList";
import { useLanguage } from "../../../api/locales/LanguageContext";

interface ParentModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Parents | null;
  onSave: (data: Parents) => void;
}

export default function ParentModal({
  open,
  onClose,
  initialData,
  onSave,
}: ParentModalProps) {
  const { t } = useLanguage();

  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    email: "",
    status: "",
    childrenList: [] as Child[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_en: initialData.name_en,
        name_ar: initialData.name_ar,
        email: initialData.email,
        status: initialData.status,
        childrenList: initialData.childrenList,
      });
    } else {
      setFormData({
        name_en: "",
        name_ar: "",
        email: "",
        status: "",
        childrenList: [],
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
      title={initialData ? t("EditParent") : t("AddNewParent")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="name_en"
            label={t("ParentNameEN")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label={t("ParentNameAR")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="email"
            label={t("ParentEmail")}
            placeholder={t("EnterParentEmail")}
          />
        </div>
        <div className="flex justify-between items-center gap-3 flex-col md:flex-row">
          <Label htmlFor="" className="w-full">
            {t("ParentChildren")}
          </Label>
          <Input id="search" placeholder={t("ChildrenSearch")} />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label={t("Child") || "Child"}
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
          </div>
        </div>

        <Button className="mt-2">
          {initialData ? t("UpdateParent") : t("AddParent")}
        </Button>
      </Form>
    </Modal>
  );
}
