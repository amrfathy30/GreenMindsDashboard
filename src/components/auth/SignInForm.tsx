/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { adminLogin } from "../../api/services/authService";
import { useLanguage } from "../../locales/LanguageContext";
import { toast } from "sonner";
import { ShowToastSuccess } from "../common/ToastHelper";
import { fetchUserPermissions } from "../../utils/permissions/permissions";
import { useAdmin } from "../../context/AdminContext";
import { sendEmail } from "../../api/services/profileService";
import { getTranslatedApiError } from "../../utils/handleApiError";
import ResetPasswordModal from "../../pages/Profile/ResetPasswordModal";
import { Modal } from "../ui/modal";

export default function SignInForm() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { updateAdmin } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPasswordStage, setResetPasswordStage] = useState<"email" | "reset">("email");
  const [resetEmail, setResetEmail] = useState("");
  const [coolDown, setCoolDown] = useState(0);

  useEffect(() => {
    if (coolDown <= 0) return;

    const timer = setInterval(() => {
      setCoolDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [coolDown]);

  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem("GMadminToken");
      if (token) {
        navigate("/videos");
      }
    };

    checkExistingAuth();
  }, [navigate]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const getAdminRoute = (permissions: any) => {
    if (permissions.includes("Videos_GetPaged")) return "/videos";
    else if (permissions.includes("Games_GetPaged")) return "/games";
    else return "/welcome";
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error(t("AllFieldsAreRequired"));
      return;
    }

    if (!validateEmail(email)) {
      toast.error(t("PleaseEnterAValidEmail"));
      return;
    }

    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 15;

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      toast.error(t("PasswordBetween"));
      return;
    }

    setLoading(true);

    try {
      const response = await adminLogin({ email, password });

      if (response?.StatusCode === 200) {
        ShowToastSuccess(t("LoginSuccessful"));

        localStorage.setItem(
          "GMadminPermissions",
          JSON.stringify(response.Data?.Permissions || []),
        );

        localStorage.setItem("GMadminToken", response.Data?.Token?.token);
        localStorage.setItem(
          "GMadminData",
          JSON.stringify(response.Data?.Token),
        );
        updateAdmin(response.Data?.Token);

        await fetchUserPermissions();

        const adminRoute = getAdminRoute(response.Data?.Permissions || []);
        navigate(adminRoute);
      } else {
        toast.error(response?.Message || t("InvalidEmailOrPassword"));
      }
    } catch (err: any) {
      const message = err?.response?.data?.Message;
      const remaining = err?.response?.data?.Data?.RemainingAttempts;
      const lockoutUntil = err?.response?.data?.Data?.LockoutUntil;

      let finalMsg = "";

      if (typeof remaining === "number") {
        if (remaining > 0) {
          finalMsg = t("InvalidEmailOrPasswordWithAttempts").replace(
            "{{count}}",
            String(remaining),
          );
        } else if (lockoutUntil) {
          finalMsg = t("AccountLockedUntil").replace(
            "{{time}}",
            new Date(lockoutUntil).toLocaleTimeString(),
          );
        } else {
          finalMsg = t("AccountLocked");
        }
      } else {
        finalMsg = message || t("SomethingWentWrongPleaseTryAgain");
      }

      toast.error(finalMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resetEmail || coolDown > 0) return;

    if (!validateEmail(resetEmail)) {
      toast.error(t("PleaseEnterAValidEmail"));
      return;
    }

    try {
      setSendEmailLoading(true);

      const res = await sendEmail(resetEmail);

      ShowToastSuccess(res?.Message || t("oto_sent_success"));

      setResetPasswordStage("reset");

      setCoolDown(60);
    } catch (error: any) {
      const translations: Record<string, string> = {
        "Please try again": t("please_try_again"),
        "Password Should contain one at least of (a capital letter, small letter, symbol, and number)": t("PasswordContain"),
        "Web access is restricted to admin users": t("Web_access_restricted"),
        "Too many reset requests. Please wait at least 60 seconds before trying again, and do not exceed 5 requests per hour":
          t("many_requests"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-center mb-2 font-semibold text-[#525252] text-title-sm dark:text-white/90 sm:text-title-md">
              {t("LoginToYourAccount")}
            </h1>
          </div>
          <div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    {t("Email")} <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder={t("InfoGmailCom")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    {t("Password")} <span className="text-error-500">*</span>
                  </Label>
                  <div>
                    <Input
                      type="password"
                      placeholder={t("EnterYourPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col -mt-4 sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                  <p className="dark:text-white text-sm sm:text-base">
                    {t("forgotPassword")}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 text-xs sm:text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      setResetPasswordStage("email");
                      setShowResetModal(true);
                    }}
                  >
                    {t("sendResetEmail")}
                  </button>
                </div>

                <div>
                  <Button
                    className="w-full"
                    variant="primaryGrid"
                    size="lg"
                    type="submit"
                    disabled={!email || !password || loading}
                    loading={loading}
                  >
                    {t("Login")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        className="max-w-xl mx-4"
        isOpen={showResetModal}
        closeOnEscape={false}
        closeOnOutsideClick={false}
        onClose={() => setShowResetModal(false)}
        title={t("resetPassword")}
      >
        {resetPasswordStage === "email" ? (
          <form onSubmit={handleSendResetEmail} className="flex flex-col gap-3 p-6 my-6 border rounded-2xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("enter_email_for_reset")}
            </p>
            <div>
              <Label>{t("Email")}</Label>
              <Input
                placeholder={t("Email")}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <Button
                className="w-full"
                type="submit"
                disabled={!resetEmail || sendEmailLoading || coolDown > 0}
                loading={sendEmailLoading}
              >
                {sendEmailLoading
                  ? t("sending")
                  : coolDown > 0
                    ? `${t("resendAfter")} ${coolDown} ${t("seconds")}`
                    : t("send")}
              </Button>
            </div>
          </form>
        ) : (
          <ResetPasswordModal email={resetEmail} />
        )}
      </Modal>{" "}
    </div>
  );
}
