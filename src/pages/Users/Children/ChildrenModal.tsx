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
  const [selectedValue, setSelectedValue] = useState<string>("1");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setFormData({ ...formData, GenderId: value });
  };

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
    ParentPhoneNumber: "",
    DateOfBirth: "",
    GenderId: "",
  });

  useEffect(() => {
    if (initialData) {
      setSelectedValue(initialData.GenderId || "1");
      setFormData({
        Name: initialData.Name || "",
        Email: initialData.Email || "",
        UserName: initialData.UserName || "",
        Password: initialData.Password || "",
        ConfirmPassword: initialData.ConfirmPassword || "",
        ParentPhoneNumber:
          initialData.ParentPhoneNumber || initialData.Phone || "",
        DateOfBirth: initialData.DateOfBirth || "",
        GenderId: initialData.GenderId || "1",
      });
    } else {
      setSelectedValue("male");
      setFormData({
        Name: "",
        UserName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ParentPhoneNumber: "",
        DateOfBirth: "",
        GenderId: "1",
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
            id="ParentPhoneNumber"
            label={t("ParentPhoneNumber")}
            placeholder={t("ParentPhoneNumber")}
            value={formData.ParentPhoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, ParentPhoneNumber: e.target.value })
            }
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
                checked={selectedValue === "1"}
                label={t("Male")}
                onChange={handleChange}
              />
              <Radio
                id="female"
                name="gender"
                value="2"
                checked={selectedValue === "2"}
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
