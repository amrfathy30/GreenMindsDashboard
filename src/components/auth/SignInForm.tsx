import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { adminLogin } from "../../api/services/authService";
import { useLanguage } from "../../api/locales/LanguageContext";

export default function SignInForm() {
  const {  isRTL} = useLanguage();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForgetPassword, setShowForgetPassword] = useState(false);


  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('GMadminToken');
      if(token){
        navigate('/videos');
      }
    };

    checkExistingAuth();
  }, []);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // if (!validateEmail(email)) {
    //   setError('Please Enter a valid email')
    //   setLoading(false)
    //   return;
    // }

    try {
      const response = await adminLogin({ email, password });
      setLoading(false)
      if (response.StatusCode == 200) {
        console.log(response)
        localStorage.setItem('GMadminData', response.Data);
        localStorage.setItem('GMadminToken', response.Data?.token);
        window.location.href='/videos'
        // navigate('/videos');
      }
      else {
        setError(isRTL?"بريد الكتروني غير صحيح او كلمه مرور غير صحيحه":"Invalid email or password")
      }

    } catch (err: any) {
      setError(err)
    }

  };

  return (
    <div className="flex flex-col flex-1">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-center mb-2 font-semibold text-[#525252] text-title-sm dark:text-white/90 sm:text-title-md">
              Login to your Account
            </h1>
          </div>
          <div>

{/* <div>{error}</div> */}
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                <div>
                  <Button className="w-full" variant="primaryGrid" size="lg" type="submit" disabled={!(email && password)} loading={loading}>
                    Login
                  </Button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
