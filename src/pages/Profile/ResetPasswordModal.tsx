/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import { ForgetPassReset } from "../../api/services/profileService";
import { useLanguage } from "../../locales/LanguageContext";
import { getTranslatedApiError } from "../../utils/handleApiError";

export default function ResetPasswordModal() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

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
    } catch (error: any) {
      const translations: Record<string, string> = {
        "try again": t("SomethingWentWrongPleaseTryAgain"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setLoading(false);
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
        type="number"
        id="otp"
        label={t("OTP")}
        value={formData.otp}
        onChange={handleChange}
        placeholder={t("EnterOtpHere")}
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
      <Button type="submit" disabled={loading}>
        {loading ? t("Saving") : t("Save")}
      </Button>
    </Form>
  );
}
