import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { ParentsModalProps } from "../../../utils/types/parentType";

export default function ParentModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ParentsModalProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    Name_en: "",
    Name_ar: "",
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ParentPhoneNumber: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name,
        Name_en: initialData.Name_en,
        Name_ar: initialData.Name_ar,
        UserName: initialData.UserName,
        Email: initialData.Email,
        Password: initialData.Password,
        ConfirmPassword: initialData.ConfirmPassword,
        ParentPhoneNumber: initialData.ParentPhoneNumber,
      });
    } else {
      setFormData({
        Name_en: "",
        Name_ar: "",
        UserName: "",
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ParentPhoneNumber: "",
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
