/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { sendEmail, updatePassword } from "../../api/services/profileService";
import { ModalProps } from "../../utils/types/profileType";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import { useLanguage } from "../../locales/LanguageContext";

const ChangePasswordModal: React.FC<ModalProps> = ({
  setShowResetPassword,
  setShowChangePassword,
  email,
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { CurrentPassword, NewPassword, ConfirmPassword } = formData;

    if (!CurrentPassword || !NewPassword || !ConfirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (NewPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await updatePassword({
        CurrentPassword: CurrentPassword,
        NewPassword: NewPassword,
        ConfirmPassword: ConfirmPassword,
      });

      ShowToastSuccess(res?.Message || "Password updated successfully");

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 1000);

      setShowChangePassword(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!email) return;

    try {
      setSendEmailLoading(true);

      const res = await sendEmail(email);

      ShowToastSuccess(res?.Message || "Reset email sent successfully");

      setShowChangePassword(false);
      setShowResetPassword(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to send reset email",
      );
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
    >
      <Input
        type="password"
        id="CurrentPassword"
        label={t("oldPassword")}
        placeholder={t("placeholderOldPass")}
        value={formData.CurrentPassword}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="NewPassword"
        label={t("newPassword")}
        placeholder={t("placeholderNewPass")}
        value={formData.NewPassword}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="ConfirmPassword"
        label={t("confirmNewPassword")}
        placeholder={t("placeholderConfirmPass")}
        value={formData.ConfirmPassword}
        onChange={handleChange}
        required
      />

      <div className="flex items-center gap-2">
        <p className="dark:text-white">{t("forgotPassword")}</p>
        <button
          type="button"
          className="text-red-500 text-sm"
          onClick={handleSendResetEmail}
          disabled={sendEmailLoading}
        >
          {sendEmailLoading ? t("sending") : t("sendResetEmail")}
        </button>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? t("saving") : t("saveButton")}
      </Button>
    </Form>
  );
};

export default ChangePasswordModal;
