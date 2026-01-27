import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../locales/LanguageContext";
import { ParentsModalProps } from "../../../utils/types/parentType";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";

export default function ParentModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ParentsModalProps) {
  const { t } = useLanguage();
  const [selectedValue, setSelectedValue] = useState<string>("male");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setFormData({ ...formData, GenderId: value });
  };
  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ParentPhoneNumber: "",
    GenderId: "",
    DateOfBirth: "",
  });

  useEffect(() => {
    if (initialData) {
      setSelectedValue(initialData.GenderId || "male");

      setFormData({
        Name: initialData.Name,
        // Name_en: initialData.Name_en,
        // Name_ar: initialData.Name_ar,
        UserName: initialData.UserName,
        Email: initialData.Email,
        Password: initialData.Password,
        ConfirmPassword: initialData.ConfirmPassword,
        ParentPhoneNumber: initialData.ParentPhoneNumber,
        GenderId: initialData.GenderId,
        DateOfBirth: initialData.DateOfBirth,
      });
    } else {
      setFormData({
        // Name_en: "",
        // Name_ar: "",
        UserName: "",
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ParentPhoneNumber: "",
        GenderId: "",
        DateOfBirth: "",
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
        {/* <div>
          <Input
            id="Name_en"
            label={t("ParentNameEN")}
            placeholder={t("EnterNameHere")}
            value={formData.Name_en}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Name_en: e.target.value }))
            }
          />
        </div>
        <div>
          <Input
            id="Name_ar"
            label={t("ParentNameAR")}
            placeholder={t("EnterNameHere")}
            value={formData.Name_ar}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Name_ar: e.target.value }))
            }
          />
        </div> */}
        <div>
          <Input
            id="Name"
            label={t("Name")}
            placeholder={t("EnterNameHere")}
            value={formData.Name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Name: e.target.value }))
            }
          />
        </div>

        <div>
          <Input
            id="UserName"
            label={t("UserName")}
            placeholder={t("EnterUserNameHere")}
            value={formData.UserName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, UserName: e.target.value }))
            }
          />
        </div>
        <div>
          <Input
            id="Email"
            label={t("ParentEmail")}
            placeholder={t("EnterParentEmail")}
            value={formData.Email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Email: e.target.value }))
            }
          />
        </div>
        <div>
          <Input
            id="ParentPhoneNumber"
            label={t("PhoneNumber")}
            placeholder={t("EnterPhoneNumber")}
            value={formData.ParentPhoneNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ParentPhoneNumber: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <Input
            id="Password"
            label={t("Password")}
            type="password"
            placeholder={t("EnterParentPassword")}
            value={formData.Password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Password: e.target.value }))
            }
          />
        </div>
        <div>
          <Input
            id="ConfirmPassword"
            label={t("ConfirmPassword")}
            type="password"
            placeholder={t("EnterParentConfirmPassword")}
            value={formData.ConfirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ConfirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label>{t("Gender")}</Label>
            <div className="flex items-center gap-3">
              <Radio
                id="male"
                name="GenderId"
                value="1"
                checked={selectedValue === "male"}
                label={t("Male")}
                onChange={handleChange}
              />
              <Radio
                id="female"
                name="gender"
                value="2"
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
