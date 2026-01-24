/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { sendEmail, updatePassword } from "../../api/services/profileService";
import { ModalProps } from "../../utils/types/profileType";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

const ChangePasswordModal: React.FC<ModalProps> = ({
  setShowResetPassword,
  setShowChangePassword,
  email,
}) => {
  const [loading, setLoading] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { CurrentPassword, NewPassword, ConfirmPassword } = formData;

    if (!CurrentPassword || !NewPassword || !ConfirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await updatePassword({
        CurrentPassword: CurrentPassword,
        NewPassword: NewPassword,
        ConfirmPassword: ConfirmPassword,
      });

      ShowToastSuccess(res?.Message || "Password updated successfully");

      setShowChangePassword(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!email) return;

    try {
      setSendEmailLoading(true);

      const res = await sendEmail(email);

      ShowToastSuccess(res?.Message || "Reset email sent successfully");

      setShowChangePassword(false);
      setShowResetPassword(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to send reset email",
      );
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
    >
      <Input
        type="password"
        id="CurrentPassword"
        label="Old Password"
        placeholder="Enter old password here"
        value={formData.CurrentPassword}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="NewPassword"
        label="New Password"
        placeholder="Enter new password here"
        value={formData.NewPassword}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="ConfirmPassword"
        label="Confirm New Password"
        placeholder="Enter new password confirmation here"
        value={formData.ConfirmPassword}
        onChange={handleChange}
        required
      />

      <div className="flex items-center gap-2">
        <p>Forgot your password?</p>
        <button
          type="button"
          className="text-red-500 text-sm"
          onClick={handleSendResetEmail}
          disabled={sendEmailLoading}
        >
          {sendEmailLoading ? "Sending..." : "Send email to reset password"}
        </button>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
};

export default ChangePasswordModal;
