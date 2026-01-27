/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useRef, useState } from "react";
import { Modal } from "../../components/ui/modal";
import { createPortal } from "react-dom";
import { ArrowBigLeft, Edit2 } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import React from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import {
  EditProfileModalProps,
  PersonalInfoRequest,
} from "../../utils/types/profileType";
import { toast } from "sonner";
import { GetPersonalInfoById, updateProfile } from "../../api/services/profileService";
import { useLanguage } from "../../locales/LanguageContext";

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  const { t} = useLanguage();
  const adminData: any = localStorage.getItem("GMadminData");
  const GMadminData: any = JSON.parse(adminData);
  const adminId = GMadminData?.UserId;

  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoRequest | null>(
    null,
  );

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [avatar, setAvatar] = useState("/images/user.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPersonalInfo = async () => {
    try {
      // setLoading(true);

      const res = await GetPersonalInfoById(adminId);

      setPersonalInfo(res?.Data);

      const data = res?.Data;
      setFormData({
        Name: data?.Name ?? "",
        UserName: data?.UserName ?? "",
        Email: data?.Email ?? "",
        Phone: data?.Phone ?? "",
        Id: data?.Id,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to load personal info",
      );
    }
  };

  useEffect(() => {
    if (personalInfo?.AvatarUrl) {
      setAvatar(personalInfo.AvatarUrl);
    }
  }, [personalInfo]);

  const [formData, setFormData] = useState<PersonalInfoRequest>({
    Name: "",
    Email: "",
    Phone: "",
    UserName: "",
  });

  useEffect(() => {
    if (open) fetchPersonalInfo();
  }, [open]);

  if (!open) return null;

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      AvatarImg: file,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload: PersonalInfoRequest = {
        id: adminId,
        Name: formData.Name,
        Email: formData.Email,
        Phone: formData.Phone,
        UserName: formData.UserName,
        Password: "",
        ConfirmPassword: "",
      };

      await updateProfile(payload, adminId);

      toast.success("Profile updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowResetPassword(false);
    setShowChangePassword(false);
  };

  return createPortal(
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={
        showChangePassword
          ? t("changePassword")
          : showResetPassword
            ? t("resetPassword")
            : t("Editprofile")
      }
    >
      {showChangePassword || showResetPassword ? (
        <button
          className="text-sm text-primary flex items-center gap-2 mt-3"
          onClick={() => handleBack()}
        >
          <ArrowBigLeft />
          <span>{t("backToEdit")}</span>
        </button>
      ) : (
        ""
      )}
      {showChangePassword ? (
        <ChangePasswordModal
          setShowResetPassword={setShowResetPassword}
          setShowChangePassword={setShowChangePassword}
          email={personalInfo?.Email}
        />
      ) : showResetPassword ? (
        <ResetPasswordModal />
      ) : (
        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 p-6 my-6  border rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt="user-avatar"
                  className="w-10 h-10 rounded-full object-cover invert-0 dark:invert"
                />
                <div
                  onClick={handleEditClick}
                  className="w-5 h-5 bg-white rounded-full p-1 border flex justify-center items-center cursor-pointer text-Black absolute -right-2 -bottom-2"
                >
                  <Edit2 className="w-full h-full" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex flex-col dark:text-white">
                <h2>{personalInfo?.Name}</h2>
                <h2>{personalInfo?.Email}</h2>
              </div>
            </div>
            <div>
              <button
                className="text-red-500"
                onClick={() => setShowChangePassword(true)}
              >
                {t("changePassword")}
              </button>
            </div>
          </div>

          <div className="border border-[#E5E7EB] dark:border-gray-800"></div>

          <Input
            id="Name"
            label={t("adminName")}
            placeholder={t("EnterNameHere")}
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />
          <Input
            id="UserName"
            label={t("UserName")}
            placeholder={t("UserName")}
            value={formData.UserName}
            onChange={(e) => setFormData({ ...formData, UserName: e.target.value })}
          />

          <Input
            id="email"
            label={t("adminEmail")}
            placeholder={t("enterEmail")}
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />

          <Input
            id="Phone"
            label={t("adminPhone")}
            placeholder={t("enterPhone")}
            value={formData.Phone}
            onChange={(e) =>
              setFormData({ ...formData, Phone: e.target.value })
            }
          />

          <Button type="submit" disabled={loading}>
            {loading ? t("saving") : t("saveButton")}
          </Button>
        </Form>
      )}
    </Modal>,
    document.body,
  );
}
