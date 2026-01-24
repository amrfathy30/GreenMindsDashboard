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
import { GetPersonalInfoById } from "../../api/services/profileService";

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  const Id = "1";
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
      setLoading(true);

      const res = await GetPersonalInfoById(Id);

      setPersonalInfo(res?.Data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to load personal info",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  if (!open) return null;

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (!target || !target.files || target.files.length === 0) return;

    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          ? "Change Password"
          : showResetPassword
            ? "Reset Password"
            : "Edit profile"
      }
    >
      {showChangePassword || showResetPassword ? (
        <button
          className="text-sm text-primary flex items-center gap-2 mt-3"
          onClick={() => handleBack()}
        >
          <ArrowBigLeft />
          <span>Back to edit</span>
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
                <h2>{personalInfo?.TypeName}</h2>
                <h2>{personalInfo?.Email}</h2>
              </div>
            </div>
            <div>
              <button
                className="text-red-500"
                onClick={() => setShowChangePassword(true)}
              >
                Change password
              </button>
            </div>
          </div>

          <div className="border border-[#E5E7EB] dark:border-gray-800"></div>

          <Input
            id="name"
            value={personalInfo?.TypeName || ""}
            label="Admin Name"
            placeholder="Enter Name Here"
          />

          <Input
            id="email"
            label="Admin Email"
            placeholder="Enter email Here"
            value={personalInfo?.Email || ""}
          />

          <Button>save</Button>
        </Form>
      )}
    </Modal>,
    document.body,
  );
}
