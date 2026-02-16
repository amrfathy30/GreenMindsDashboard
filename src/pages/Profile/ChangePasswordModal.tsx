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
import { getTranslatedApiError } from "../../utils/handleApiError";

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
      toast.error(t("all_fields_required"));
      return;
    }

    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 15;

    if (
      NewPassword.length < MIN_PASSWORD_LENGTH ||
      NewPassword.length > MAX_PASSWORD_LENGTH
    ) {
      toast.error(t("PasswordBetween"));
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error(t("passwords_not_match"));
      return;
    }
    try {
      setLoading(true);
      const res = await updatePassword({
        CurrentPassword,
        NewPassword,
        ConfirmPassword,
      });
      ShowToastSuccess(res?.Message || t("password_updated_success"));
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 1000);
      setShowChangePassword(false);
    } catch (error: any) {
      const translations: Record<string, string> = {
        "Password Must be 8 digits or more": t("password_min_length"),
        "Current password is incorrect": t("current_password_incorrect"),
        "Incorrect current password.": t("current_password_incorrect"),
        "Password Should contain one at least of (a capital letter, small letter, symbol, and number) ":
          t("PasswordContain"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!email) return;

    try {
      setSendEmailLoading(true);

      const res = await sendEmail(email);

      ShowToastSuccess(res?.Message || t("reset_email_sent_success"));

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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
        <p className="dark:text-white text-sm sm:text-base">{t("forgotPassword")}</p>
        <button
          type="button"
          className="text-red-500 text-xs sm:text-sm hover:underline"
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
