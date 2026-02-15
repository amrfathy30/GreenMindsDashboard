/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";
import { useLanguage } from "../../../locales/LanguageContext";
import { ChildrenModalProps } from "../../../utils/types/childrenType";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function ChildrenModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ChildrenModalProps) {
  const { t } = useLanguage();
  const lang = localStorage.getItem("GM-language");

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    DateOfBirth: "",
    GenderId: "",
    Type: 1,
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
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: initialData.PhoneNumber || "",
        GenderId: String(initialData.GenderId ?? 1),
        DateOfBirth: formattedDate,
        Type: 1,
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
        Type: 1,
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: any = {
      Name: formData.Name,
      Email: formData.Email,
      UserName: formData.UserName,
      PhoneNumber: formData.PhoneNumber,
      DateOfBirth: formData.DateOfBirth,
      GenderId: Number(formData.GenderId),
      Type: 1,
      id: initialData?.id,
    };

    if (formData.Password.trim()) {
      payload.Password = formData.Password;
      payload.ConfirmPassword = formData.ConfirmPassword;
    }

    onSave(payload);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      closeOnEscape={false}
      closeOnOutsideClick={false}
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
        {!initialData && (
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
        )}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">
            {t("PhoneNumber")}
          </label>

          <div
            className="flex flex-col gap-1"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <PhoneInput
              defaultCountry="eg"
              value={formData.PhoneNumber}
              onChange={(phone) =>
                setFormData({ ...formData, PhoneNumber: phone })
              }
              className="flex dark:[&_.react-international-phone-input-container]:bg-[#1a222c] dark:[&_.react-international-phone-input-container]:border-gray-700"
              inputClassName={`w-full !h-[42px] dark:!bg-transparent dark:!text-white !border-[#E5E7EB] dark:!border-gray-700 ${
                lang === "en"
                  ? "!rounded-tr-lg !rounded-tl-none !rounded-bl-none !rounded-br-lg !border-l-0"
                  : "!rounded-tl-lg !rounded-bl-lg !rounded-br-none !rounded-tr-none !border-r-0"
              }`}
              countrySelectorStyleProps={{
                buttonClassName: `!h-[42px] !border-[#E5E7EB] dark:!border-gray-700 dark:!bg-transparent ${
                  lang === "en"
                    ? "!rounded-tl-lg !rounded-bl-lg !rounded-tr-none !rounded-br-none"
                    : "!rounded-tr-lg !rounded-br-lg !rounded-tl-none !rounded-bl-none"
                }`,
              }}
              inputStyle={{
                direction: "ltr",
                textAlign: lang === "ar" ? "right" : "left",
              }}
            />
          </div>
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
