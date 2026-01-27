/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { toast } from "sonner";
import { SmtpList, SmtpSettingsModalProps } from "../../utils/types/SmtpType";
import { updateSmtp } from "../../api/services/SmtpService";

export default function SmtpSettingsModal({
  open,
  onClose,
  initialData,
}: SmtpSettingsModalProps) {
  const [formData, setFormData] = useState<SmtpList>({
    Host: "",
    Port: 587,
    UseSsl: true,
    Username: "",
    Password: "",
    SenderEmail: "",
    SenderName: "",
    Enabled: true,
  });

  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (open && initialData) {
    setFormData(initialData);
  }
}, [open, initialData]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateSmtp(formData);
      toast.success("SMTP settings updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || "Failed to update SMTP settings",
      );
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <Modal
      title="SMTP Settings"
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
    >
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <Input
          id="senderName"
          label="Display Name (اسم المرسل)"
          placeholder="Enter name here"
          value={formData.SenderName}
          onChange={(e) =>
            setFormData({ ...formData, SenderName: e.target.value })
          }
        />

        <Input
          id="senderEmail"
          label="SMTP Email (بريد الإرسال)"
          placeholder="Enter email here"
          value={formData.SenderEmail}
          onChange={(e) =>
            setFormData({ ...formData, SenderEmail: e.target.value })
          }
        />

        <Input
          id="username"
          label="Username"
          placeholder="Enter SMTP username"
          value={formData.Username}
          onChange={(e) =>
            setFormData({ ...formData, Username: e.target.value })
          }
        />

        <Input
          id="password"
          label="App Password (كلمة سر التطبيق)"
          placeholder="*********"
          type="password"
          value={formData.Password}
          onChange={(e) =>
            setFormData({ ...formData, Password: e.target.value })
          }
        />

        <Input
          id="host"
          label="SMTP server (الخادم)"
          placeholder="smtp.gmail.com"
          value={formData.Host}
          onChange={(e) => setFormData({ ...formData, Host: e.target.value })}
        />

        <Input
          id="port"
          label="Port (المنفذ)"
          placeholder="587"
          type="number"
          value={formData.Port}
          onChange={(e) =>
            setFormData({ ...formData, Port: Number(e.target.value) })
          }
        />

        <Input
          id="encryption"
          label="Encryption (التشفير)"
          placeholder="TLS/SSL"
          value={formData.UseSsl ? "SSL/TLS" : "None"}
          onChange={(e) =>
            setFormData({
              ...formData,
              UseSsl: e.target.value.toLowerCase().includes("ssl"),
            })
          }
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Form>
    </Modal>
  );
}
