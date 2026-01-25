import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";
import { Children } from "./ChildrenList";
import { useLanguage } from "../../../api/locales/LanguageContext";

interface ChildModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Children | null;
  onSave: (data: Children) => void;
}

export default function ChildrenModal({
  open,
  onClose,
  initialData,
  onSave,
}: ChildModalProps) {
  const { t } = useLanguage();

  const [selectedValue, setSelectedValue] = useState<string>("male");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    parent_phone: "",
    age: "",
    gender: "male",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_en: initialData.name_en,
        name_ar: initialData.name_ar,
        email: initialData.email,
        phone: initialData.phone,
        password: initialData.password,
        confirm_password: initialData.confirm_password,
        parent_phone: initialData.parent_phone,
        age: initialData.age,
        gender: initialData.gender || "male",
      });
      setSelectedValue(initialData.gender || "male");
    } else {
      setFormData({
        name_en: "",
        name_ar: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        parent_phone: "",
        age: "",
        gender: "male",
      });
      setSelectedValue("male");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      id: initialData?.id ?? Date.now(),
      ...formData,
      gender: selectedValue,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? t("EditChildren") : t("AddNewChildren")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="name_en"
            label={t("ChildrenNameEN")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label={t("ChildrenNameAR")}
            placeholder={t("EnterNameHere")}
          />
        </div>
        <div>
          <Input
            id="email"
            label={t("ChildrenEmail")}
            placeholder={t("EnterChildrenEmail")}
          />
        </div>
        <div>
          <Input
            id="phone"
            label={t("ChildrenPhone")}
            placeholder={t("EnterChildrenPhone")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Input
              id="password"
              label={t("ChildrenPassword")}
              placeholder={t("EnterChildrenPassword")}
            />
          </div>
          <div>
            <Input
              id="confirm_password"
              label={t("ChildrenConfirmPassword")}
              placeholder={t("EnterChildrenConfirmPassword")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label>{t("Gender")}</Label>
            <div className="flex items-center gap-3">
              <Radio
                id="male"
                name="gender"
                value="male"
                checked={selectedValue === "male"}
                label={t("Male")}
                onChange={handleChange}
              />
              <Radio
                id="female"
                name="gender"
                value="female"
                checked={selectedValue === "female"}
                label={t("Female")}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Input
              id="age"
              label={t("Age")}
              placeholder={t("EnterChildrenAge")}
            />
          </div>
        </div>

        <div>
          <Input
            id="parent_phone"
            label={t("ParentPhone")}
            placeholder={t("EnterParentPhone")}
          />
        </div>

        <Button className="mt-2">
          {initialData ? t("UpdateChildren") : t("AddChildren")}
        </Button>
      </Form>
    </Modal>
  );
}
