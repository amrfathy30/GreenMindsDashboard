/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";
import { ForgetPassReset } from "../../api/services/profileService";
import { useLanguage } from "../../locales/LanguageContext";

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

    if (NewPassword.length < 8) {
      toast.error(t("PasswordMustBeAtLeast8Characters"));
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
      toast.error(
        error?.response?.data?.Message || t("FailedToUpdatePassword"),
      );
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
