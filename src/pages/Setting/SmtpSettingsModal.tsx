import { FormEvent } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";

interface SmtpSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SmtpSettingsModal({
  open,
  onClose,
}: SmtpSettingsModalProps) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal
      title="Smtp Settings"
      isOpen={open}
      onClose={onClose}
      className="mx-4 md:0 md:h-[80%]! max-w-xl pb-4 pt-10! md:p-6"
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="border-b pb-4">
          <Input
            id="name"
            label="Display Name (اسم المرسل)"
            placeholder="Enter name here"
            // error
            // hint="Name is required"
          />
        </div>

        <div className="border-b pb-4">
          <Input
            id="email"
            label="SMTP Email (بريد الإرسال)"
            placeholder="Enter email here"
            // error
            // hint="Email is required"
          />
        </div>

        <div className="border-b pb-4">
          <Input
            id="password"
            label="App Password (كلمة سر التطبيق)"
            placeholder="*********"
            // error
            // hint="password is required"
          />
        </div>

        <div className="border-b pb-4">
          <Input
            id="server"
            label="SMTP server (الخادم)"
            placeholder="smtp.gmail.com"
            // error
            // hint="server is required"
          />
        </div>

        <div className="border-b pb-4">
          <Input
            id="port"
            label="Port (المنفذ)"
            placeholder="321"
            // error
            // hint="port is required"
          />
        </div>

        <div>
          <Input
            id="encryption"
            label="Encryption (التشفير)"
            placeholder="TLS"
            // error
            // hint="Encryption is required"
          />
        </div>

        <Button className="mt-2">save</Button>
      </Form>
    </Modal>
  );
}
