/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../locales/LanguageContext";
import { AdminsModalProps } from "../../../utils/types/adminType";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function AdminModal({
  open,
  onClose,
  onSave,
  loading,
  adminRoles,
  initialData,
}: AdminsModalProps) {
  const { t } = useLanguage();
  const lang = localStorage.getItem("GM-language");
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    UserName: "",
    ConfirmPassword: "",
    Password: "",
    Type: 2,
    roleName: "",
    DateOfBirth: "1979-03-04",
    GenderId: "1",
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
      setFormData({
        Name: initialData.Name ?? "",
        Email: initialData.Email ?? "",
        PhoneNumber: initialData.PhoneNumber ?? "",
        UserName: initialData.UserName ?? "",
        Password: "",
        ConfirmPassword: "",
        roleName: initialData.roleName ?? "",
        Type: initialData.Type ?? 2,
        DateOfBirth: initialData.DateOfBirth
          ? formatDateForInput(initialData.DateOfBirth)
          : "1979-03-04",
        GenderId: String(initialData.GenderId ?? 1),
      });
    } else {
      setFormData({
        Name: "",
        Email: "",
        PhoneNumber: "",
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        roleName: "",
        Type: 2,
        DateOfBirth: "1979-03-04",
        GenderId: "1",
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: any = {
      Name: formData.Name,
      Email: formData.Email,
      PhoneNumber: formData.PhoneNumber,
      UserName: formData.UserName,
      Type: formData.Type,
      roleName: formData.roleName,
      GenderId: Number(formData.GenderId),
      DateOfBirth: formData.DateOfBirth,
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
      className="max-w-xl mx-4"
      title={initialData ? t("EditAdmin") : t("AddNewAdmin")}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <div>
          <Input
            id="Name"
            label={t("AdminName")}
            placeholder={t("EnterNameHere")}
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />
        </div>
        <div>
          <Input
            id="UserName"
            label={t("AdminUserName")}
            placeholder={t("AdminUserName")}
            value={formData.UserName}
            onChange={(e) =>
              setFormData({ ...formData, UserName: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            id="Email"
            label={t("AdminEmail")}
            placeholder={t("EnterAdminEmail")}
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("PhoneNumber")}
          </label>

          <PhoneInput
            defaultCountry="eg"
            value={formData.PhoneNumber}
            onChange={(phone) =>
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
              type="password"
              label={t("AdminPassword")}
              placeholder={t("EnterAdminPassword")}
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              id="ConfirmPassword"
              type="password"
              label={t("AdminConfirmPassword")}
              placeholder={t("EnterAdminPassword")}
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, ConfirmPassword: e.target.value })
              }
            />
          </div>
        </div>
        <p className="text-xs text-gray-600">{t("PasswordContain")}</p>

        {/* </>
        )} */}
        <div>
          <label className="block text-sm font-medium">{t("UserType")}</label>

          <select
            id="roleName"
            value={formData.roleName}
            onChange={(e) => {
              setFormData({ ...formData, roleName: e.target.value });
            }}
            className="w-full rounded-lg border py-2.5 px-4"
          >
            <option value="" disabled>
              {t("select_UserType")}
            </option>
            {adminRoles?.map((role) => (
              <option key={role.Id} value={role.Name}>
                {role.Name}
              </option>
            ))}
          </select>
        </div>
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
