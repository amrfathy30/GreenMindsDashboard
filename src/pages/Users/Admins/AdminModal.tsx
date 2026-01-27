import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { AdminsModalProps } from "../../../utils/types/adminType";

export default function AdminModal({
  open,
  onClose,
  onSave,
  loading,
  userTypeList,
  initialData,
}: AdminsModalProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Type: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name,
        Email: initialData.Email,
        Password: initialData.Password,
        Type: initialData.Type,
      });
    } else {
      setFormData({
        Name: "",
        Email: "",
        Password: "",
        Type: 0,
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
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
          <label className="block text-sm font-medium">{t("UserType")}</label>

          <select
            id="Type"
            value={formData.Type}
            onChange={(e) =>
              setFormData({ ...formData, Type: Number(e.target.value) })
            }
            className="w-full rounded-lg border py-2.5 px-4"
          >
            <option value={0} disabled>
              {t("select_UserType")}
            </option>

            {userTypeList?.map((type) => (
              <option
                key={type.Id}
                value={type.Id}
                className="dark:bg-[#1a222c]"
              >
                {type.Name}
              </option>
            ))}
          </select>
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
