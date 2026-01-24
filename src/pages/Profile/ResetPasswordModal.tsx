/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { toast } from "sonner";
import { resetPassword } from "../../api/services/profileService";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

export default function ResetPasswordModal() {
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

    if (!otp || !NewPassword || !ConfirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (NewPassword !== ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword({
        otp: otp,
        NewPassword: NewPassword,
        ConfirmPassword: ConfirmPassword,
      });

      ShowToastSuccess(res?.Message || "Password updated successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 p-6 my-6  border rounded-2xl"
    >
      <div className="flex items-center gap-2">
        <p className="text-secondary">
          A one time password (otp) has been sent to your email.
        </p>
      </div>
      <Input
        type="number"
        id="otp"
        label="OTP"
        value={formData.otp}
        onChange={handleChange}
        placeholder="Enter OTP here"
      />
      <Input
        type="password"
        id="NewPassword"
        label="New Password"
        placeholder="Enter new password here"
        value={formData.NewPassword}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="ConfirmPassword"
        label="New password Confirmation"
        placeholder="Enter new password confirmation here"
        value={formData.ConfirmPassword}
        onChange={handleChange}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>{" "}
    </Form>
  );
}
