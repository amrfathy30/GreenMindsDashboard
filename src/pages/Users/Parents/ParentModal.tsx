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

  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    GenderId: "",
    DateOfBirth: "",
  });

  const formatDateForInput = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.DateOfBirth
        ? formatDateForInput(initialData.DateOfBirth)
        : "";
      setFormData({
        Name: initialData.Name,
        UserName: initialData.UserName,
        Email: initialData.Email,
        Password: initialData.Password,
        ConfirmPassword: initialData.ConfirmPassword,
        PhoneNumber: initialData.PhoneNumber ?? "",
        GenderId: String(initialData.GenderId),
        DateOfBirth: formattedDate,
      });
    } else {
      setFormData({
        UserName: "",
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: "",
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
            placeholder={t("UserName")}
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
            id="PhoneNumber"
            label={t("PhoneNumber")}
            placeholder={t("PhoneNumber")}
            value={formData.PhoneNumber}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, PhoneNumber: onlyNumbers });
            }}
          />
        </div>
        {/* {!initialData && (
          <> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Input
              id="Password"
              label={t("Password")}
              type="password"
              placeholder={t("Password")}
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
              placeholder={t("ConfirmPassword")}
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ConfirmPassword: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <p className="text-xs text-gray-600">{t("PasswordContain")}</p>
        {/* </>
        )} */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label>{t("Gender")}</Label>
            <div className="flex items-center gap-3">
              <Radio
                id="male"
                name="GenderId"
                value="1"
                checked={formData.GenderId === "1"}
                label={t("Male")}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, GenderId: value }))
                }
              />

              <Radio
                id="female"
                name="GenderId"
                value="2"
                checked={formData.GenderId === "2"}
                label={t("Female")}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, GenderId: value }))
                }
              />
            </div>
          </div>
          <div>
            <Input
              id="DateOfBirth"
              label={t("Age")}
              value={formData.DateOfBirth}
              type="date"
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
