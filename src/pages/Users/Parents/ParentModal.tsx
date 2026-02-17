/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../locales/LanguageContext";
import {
  ParentFormData,
  ParentsModalProps,
} from "../../../utils/types/parentType";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function ParentModal({
  open,
  onClose,
  onSave,
  loading,
  initialData,
}: ParentsModalProps) {
  const { t } = useLanguage();
  const lang = localStorage.getItem("GM-language");

  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    GenderId: 1,
    DateOfBirth: "1979-03-04",
    Type: 0,
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
        Name: initialData.Name ?? "",
        UserName: initialData.UserName ?? "",
        Email: initialData.Email ?? "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: initialData.PhoneNumber ?? "",
        GenderId: initialData.GenderId ?? 1,
        DateOfBirth: formattedDate || "1979-03-04",
        Type: initialData.Type ?? 0,
      });
    } else {
      setFormData({
        UserName: "",
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        PhoneNumber: "",
        GenderId: 1,
        DateOfBirth: "1979-03-04",
        Type: 0,
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: ParentFormData = {
      Name: formData.Name,
      UserName: formData.UserName,
      PhoneNumber: formData.PhoneNumber,
      GenderId: formData.GenderId,
      DateOfBirth: formData.DateOfBirth,
      Type: formData.Type,
    };
    if (!initialData) {
      payload.Email = formData.Email;
    }

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
        {!initialData && (
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
        )}
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-gray-300">
            {t("PhoneNumber")}
          </label>

          <PhoneInput
            defaultCountry="eg"
            value={formData.PhoneNumber}
            onChange={(phone: any) =>
              setFormData({ ...formData, PhoneNumber: phone })
            }
            inputClassName={`w-full !h-[42px] ${lang === "en" ? "!rounded-tr-lg !rounded-tl-none !rounded-bl-none !rounded-br-lg" : "!rounded-tl-lg !rounded-bl-lg !rounded-br-none !rounded-tr-none"} `}
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
        </div> */}

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
