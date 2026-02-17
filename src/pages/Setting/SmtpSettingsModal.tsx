/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { toast } from "sonner";
import { SmtpList, SmtpSettingsModalProps } from "../../utils/types/SmtpType";
import { updateSmtp } from "../../api/services/SmtpService";
import { useLanguage } from "../../locales/LanguageContext";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

export default function SmtpSettingsModal({
  open,
  onClose,
  initialData,
  onSuccess,
}: SmtpSettingsModalProps) {
  const { t } = useLanguage();
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
      const payload: any = { ...formData };
      if (!payload.Password) payload.Password = "";
      await updateSmtp(payload);
      ShowToastSuccess(t("success_update"));
      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("FailedUpdateSMTP"));
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <Modal
      title={t("smtpSettings")}
      isOpen={open}
      closeOnEscape={false}
      closeOnOutsideClick={false}
      onClose={onClose}
      className="max-w-xl mx-4"
    >
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 my-6 border rounded-2xl"
      >
        <Input
          id="SenderName"
          label="Display Name (اسم المرسل)"
          placeholder="Enter name here"
          value={formData.SenderName}
          onChange={(e) =>
            setFormData({ ...formData, SenderName: e.target.value })
          }
        />

        <Input
          id="SenderEmail"
          label="SMTP Email (بريد الإرسال)"
          placeholder="Enter email here"
          value={formData.SenderEmail}
          onChange={(e) =>
            setFormData({ ...formData, SenderEmail: e.target.value })
          }
        />

        <Input
          id="username"
          label="Username (اسم المستخدم)"
          placeholder="Enter SMTP username"
          value={formData.Username}
          onChange={(e) =>
            setFormData({ ...formData, Username: e.target.value })
          }
        />

        <Input
          id="Password"
          label="App Password (كلمة سر التطبيق)"
          placeholder="*********"
          type="password"
          value={formData.Password}
          onChange={(e) =>
            setFormData({ ...formData, Password: e.target.value })
          }
        />

        <Input
          id="Host"
          label="SMTP server (الخادم)"
          placeholder="smtp.gmail.com"
          value={formData.Host}
          onChange={(e) => setFormData({ ...formData, Host: e.target.value })}
        />

        <Input
          id="Port"
          label="Port (المنفذ)"
          placeholder="587"
          type="number"
          value={formData.Port}
          onChange={(e) =>
            setFormData({ ...formData, Port: Number(e.target.value) })
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input
            type="checkbox"
            id="UseSsl"
            label="Use SSL / TLS"
            checked={formData.UseSsl}
            onChange={(e) =>
              setFormData({ ...formData, UseSsl: e.target.checked })
            }
          />

          <Input
            id="Enabled"
            type="checkbox"
            label="Enable SMTP"
            checked={formData.Enabled}
            onChange={(e) =>
              setFormData({ ...formData, Enabled: e.target.checked })
            }
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? t("saving") : t("saveButton")}
        </Button>
      </Form>
    </Modal>
  );
}
