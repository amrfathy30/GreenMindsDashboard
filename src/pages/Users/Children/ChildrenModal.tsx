import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";
import { useLanguage } from "../../../locales/LanguageContext";
import { ChildrenModalProps } from "../../../utils/types/childrenType";

export default function ChildrenModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ChildrenModalProps) {
  const { t } = useLanguage();
  const [selectedValue, setSelectedValue] = useState<string>("male");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setFormData({ ...formData, gender: value });
  };

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ParentPhoneNumber: "",
    DateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (initialData) {
      setSelectedValue(initialData.gender || "male");
      setFormData({
        Name: initialData.Name || "",
        Email: initialData.Email || "",
        Password: initialData.Password || "",
        ConfirmPassword: initialData.ConfirmPassword || "",
        ParentPhoneNumber:
          initialData.ParentPhoneNumber || initialData.Phone || "",
        DateOfBirth: initialData.DateOfBirth || "",
        gender: initialData.gender || "male",
      });
    } else {
      setSelectedValue("male");
      setFormData({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ParentPhoneNumber: "",
        DateOfBirth: "",
        gender: "male",
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id,
    });
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
            id="Name"
            label={t("ChildrenName")}
            placeholder={t("EnterNameHere")}
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />
        </div>
        <div>
          <Input
            id="Email"
            label={t("ChildrenEmail")}
            placeholder={t("EnterChildrenEmail")}
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            id="ParentPhoneNumber"
            label={t("ParentPhoneNumber")}
            placeholder={t("EnterParentPhoneNumber")}
            value={formData.ParentPhoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, ParentPhoneNumber: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Input
              type="password"
              id="Password"
              label={t("ChildrenPassword")}
              placeholder={t("EnterChildrenPassword")}
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="password"
              id="ConfirmPassword"
              label={t("ChildrenConfirmPassword")}
              placeholder={t("EnterChildrenConfirmPassword")}
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, ConfirmPassword: e.target.value })
              }
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
              id="DateOfBirth"
              label={t("Age")}
              value={formData.DateOfBirth}
              type="date"
              placeholder={t("EnterChildrenAge")}
              onChange={(e) =>
                setFormData({ ...formData, DateOfBirth: e.target.value })
              }
            />
          </div>
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
