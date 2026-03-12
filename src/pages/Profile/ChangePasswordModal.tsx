/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updatePassword } from "../../api/services/profileService";
import { ModalProps } from "../../utils/types/profileType";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import { useLanguage } from "../../locales/LanguageContext";
import { getTranslatedApiError } from "../../utils/handleApiError";

const ChangePasswordModal: React.FC<ModalProps> = ({
  // setShowResetPassword,
  setShowChangePassword,
  // email,
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  // const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const validatePassword = (password: string) => {
    const minLength = 8;
    const maxLength = 15;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      return "PasswordBetween";
    }

    if (!hasUppercase) {
      return "PasswordsUppercase";
    }

    if (!hasLowercase) {
      return "PasswordsLowercase";
    }

    if (!hasNumber) {
      return "PasswordsDigit";
    }

    if (!hasSpecialChar) {
      return "PasswordsAlphanumeric";
    }

    return null;
  };

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

    if (NewPassword) {
      const passwordErrorKey = validatePassword(NewPassword);

      if (passwordErrorKey) {
        toast.error(t(passwordErrorKey));
        return;
      }

      if (NewPassword !== ConfirmPassword) {
        toast.error(t("passMatchError"));
        return;
      }
    }
    try {
      setLoading(true);
      const res = await updatePassword({
        CurrentPassword,
        NewPassword,
        ConfirmPassword,
      });
      ShowToastSuccess(res?.Message || t("password_updated_success"));
      localStorage.removeItem("GMadminData");
      localStorage.removeItem("GMadminPermissions");
      localStorage.removeItem("GMadminToken");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
      setShowChangePassword(false);
    } catch (error: any) {
      const translations: Record<string, string> = {
        "Password Must be 8 digits or more": t("password_min_length"),
        "Current password is incorrect": t("current_password_incorrect"),
        "Incorrect current password": t("current_password_incorrect"),
        "Password Should contain one at least of (a capital letter, small letter, symbol, and number)":
          t("PasswordContain"),
        "Account locked due to multiple failed attempts": t("account_locked"),
        "Another user with the same username already exists": t("username_exists"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  // const handleSendResetEmail = async () => {
  //   if (!email) return;

  //   try {
  //     setSendEmailLoading(true);

  //     const res = await sendEmail(email);

  //     ShowToastSuccess(res?.Message || t("reset_email_sent_success"));

  //     setShowChangePassword(false);
  //     setShowResetPassword(true);
  //   } catch (error: any) {
  //     const translations: Record<string, string> = {
  //       "Please try again": t("please_try_again"),
  //     };

  //     const finalMsg = getTranslatedApiError(error, t, translations);
  //     toast.error(finalMsg);
  //   } finally {
  //     setSendEmailLoading(false);
  //   }
  // };

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
        star
      />

      <Input
        type="password"
        id="NewPassword"
        label={t("newPassword")}
        placeholder={t("placeholderNewPass")}
        value={formData.NewPassword}
        onChange={handleChange}
        star
      />

      <Input
        type="password"
        id="ConfirmPassword"
        label={t("confirmNewPassword")}
        placeholder={t("placeholderConfirmPass")}
        value={formData.ConfirmPassword}
        onChange={handleChange}
        star
      />

      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
        <p className="dark:text-white text-sm sm:text-base">
          {t("forgotPassword")}
        </p>
        <button
          type="button"
          className="text-red-500 text-xs sm:text-sm hover:underline"
          onClick={handleSendResetEmail}
          disabled={sendEmailLoading}
        >
          {sendEmailLoading ? t("sending") : t("sendResetEmail")}
        </button>
      </div> */}

      <Button type="submit" disabled={loading}>
        {loading ? t("saving") : t("saveButton")}
      </Button>
    </Form>
  );
};

export default ChangePasswordModal;
