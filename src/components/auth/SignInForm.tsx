/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { adminLogin } from "../../api/services/authService";
import { useLanguage } from "../../locales/LanguageContext";
import { toast } from "sonner";
import { ShowToastSuccess } from "../common/ToastHelper";
import { fetchUserPermissions } from "../../utils/permissions/permissions";
import { useAdmin } from "../../context/AdminContext";

export default function SignInForm() {
  const { t } = useLanguage();
  const lang = localStorage.getItem("GM-language");
  const navigate = useNavigate();
  const { updateAdmin } = useAdmin();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  // <Route path="/avatars" element={<AvatarsList />} />
  // <Route path="/analytics" element={<Analytics />} />
  // <Route path="/users" element={<Users />} />
  // <Route path="/children-info/:id" element={<ChildrenInfo />} />
  // <Route path="/setting" element={<Setting />} />
  // <Route path="/age-group" element={<AgeGroup />} />
  // <Route path="/admin-roles" element={<AdminRoles />} />
  // <Route path="/profile-levels" element={<ProfileLevels />} />
  // <Route path="/permissions-list" element={<PermissionsList />} />

  const getAdminRoute = (permissions: any) => {
    if (permissions.includes("Videos_GetPaged")) return "/videos";
    else if (permissions.includes("Games_GetPaged")) return "/games";
    else return "/welcome";
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("AllFieldsAreRequired"));
      return;
    }

    if (!validateEmail(email)) {
      toast.error(t("PleaseEnterAValidEmail"));
      return;
    }

    if (password.length < 8) {
      toast.error(t("PasswordMustBeAtLeast8Characters"));
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
      const apiMessage =
        err?.response?.data?.Message || t("SomethingWentWrongPleaseTryAgain");

      toast.error(apiMessage);
    } finally {
      setLoading(false);
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("EnterYourPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute z-30 -translate-y-1/2 cursor-pointer ${lang === "en" ? "right-4" : "left-4"}  top-1/2`}
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
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
    </div>
  );
}
