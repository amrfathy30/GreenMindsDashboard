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

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    DateOfBirth: "",
    GenderId: "",
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
        Name: initialData.Name || "",
        Email: initialData.Email || "",
        UserName: initialData.UserName || "",
        Password: initialData.Password || "",
        ConfirmPassword: initialData.ConfirmPassword || "",
        PhoneNumber: initialData.PhoneNumber || "",
        GenderId: String(formData.GenderId),
        DateOfBirth: formattedDate,
      });
    } else {
      setFormData({
        Name: "",
        UserName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: "",
        DateOfBirth: "",
        GenderId: "1",
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSave({
      ...formData,
      GenderId: Number(formData.GenderId),
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
            id="UserName"
            label={t("UserName")}
            placeholder={t("UserName")}
            value={formData.UserName}
            onChange={(e) =>
              setFormData({ ...formData, UserName: e.target.value })
            }
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
                setFormData({
                  ...formData,
                  ConfirmPassword: e.target.value,
                })
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
