/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
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
  const [coolDown, setCoolDown] = useState(0);

  useEffect(() => {
    if (coolDown <= 0) return;

    const timer = setInterval(() => {
      setCoolDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [coolDown]);

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
    if (!otp || !NewPassword || !ConfirmPassword) {
      toast.error(t("AllFieldsAreRequired"));
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
      toast.error(t("PasswordsDoNotMatch"));
      return;
    }

    try {
      setLoading(true);

      const res = await ForgetPassReset({
        otp: otp,
        email: email,
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
        "Maximum OTP attempts reached. Your OTP has expired. Please request a new OTP":
          t("MaximumOTP"),
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
    if (!email || coolDown > 0) return;

    try {
      setSendEmailLoading(true);
      await resendEmail(email);
      ShowToastSuccess(t("resend_otp_success"));

      setCoolDown(60);
    } catch (error: any) {
      const statusCode = error?.response?.data?.StatusCode;
      const apiData = error?.response?.data?.Data;
      const apiMessage = error?.response?.data?.Message;

      let finalMsg = "";

      if (statusCode === 429 && apiData?.IsLocked) {
        const lockoutUntil = apiData?.LockoutUntil;
        const lockTime = lockoutUntil
          ? new Date(lockoutUntil).toLocaleString()
          : "";
        finalMsg = t("TooManyAttemptsUntil").replace("{{time}}", lockTime);
      } else if (apiData?.Message) {
        finalMsg = apiData.Message;
      } else {
        finalMsg = apiMessage || t("please_try_again");
      }

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
          className="text-red-500 text-xs sm:text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendResetEmail}
          disabled={sendEmailLoading || coolDown > 0}
        >
          {sendEmailLoading
            ? t("sending")
            : coolDown > 0
              ? `${t("resendAfter")} ${coolDown} ${t("seconds")}`
              : t("resendOtp")}
        </button>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? t("Saving") : t("Save")}
      </Button>
    </Form>
  );
};
export default ResetPasswordModal;
