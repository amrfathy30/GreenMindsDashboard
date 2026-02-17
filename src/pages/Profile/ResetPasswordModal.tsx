/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import {
  ForgetPassReset,
  resendEmail,
} from "../../api/services/profileService";
import { useLanguage } from "../../locales/LanguageContext";
import { getTranslatedApiError } from "../../utils/handleApiError";
import { ModalProps } from "../../utils/types/profileType";

const ResetPasswordModal: React.FC<ModalProps> = ({ email }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { otp, NewPassword, ConfirmPassword } = formData;

    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 15;

    if (
      NewPassword.length < MIN_PASSWORD_LENGTH ||
      NewPassword.length > MAX_PASSWORD_LENGTH
    ) {
      toast.error(t("PasswordBetween"));
      return;
    }

    if (!otp || !NewPassword || !ConfirmPassword) {
      toast.error(t("AllFieldsAreRequired"));
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error(t("PasswordsDoNotMatch"));
      return;
    }

    try {
      setLoading(true);

      const res = await ForgetPassReset({
        otp: otp,
        NewPassword: NewPassword,
        ConfirmPassword: ConfirmPassword,
      });

      ShowToastSuccess(res?.Message || t("PasswordUpdatedSuccessfully"));
      localStorage.removeItem("GMadminData");
      localStorage.removeItem("GMadminPermissions");
      localStorage.removeItem("GMadminToken");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      const translations: Record<string, string> = {
        "try again": t("otpWrong"),
        "Password Should contain one at least of (a capital letter, small letter, symbol, and number)":
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

      const res = await resendEmail(email);

      ShowToastSuccess(res?.Message || t("reset_email_sent_success"));
    } catch (error: any) {
      const translations: Record<string, string> = {
        "Please try again": t("please_try_again"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
    >
      <div className="flex items-center gap-2">
        <p className="text-secondary">{t("OtpSentMessage")}</p>
      </div>
      <Input
        type="text"
        id="otp"
        label={t("OTP")}
        value={formData.otp}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          if (value.length <= 4) {
            setFormData({ ...formData, otp: value });
          }
        }}
        placeholder={t("EnterOtpHere")}
        max="4"
      />
      <Input
        type="password"
        id="NewPassword"
        label={t("NewPassword")}
        placeholder={t("EnterNewPasswordHere")}
        value={formData.NewPassword}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="ConfirmPassword"
        label={t("NewPasswordConfirmation")}
        placeholder={t("EnterNewPasswordConfirmationHere")}
        value={formData.ConfirmPassword}
        onChange={handleChange}
      />
      <div>
        <button
          type="button"
          className="text-red-500 text-xs sm:text-sm hover:underline"
          onClick={handleSendResetEmail}
          disabled={sendEmailLoading}
        >
          {sendEmailLoading ? t("sending") : t("resendOtp")}
        </button>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? t("Saving") : t("Save")}
      </Button>
    </Form>
  );
};
export default ResetPasswordModal;
