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
    className="max-w-xl mx-4"
    >
      <Form onSubmit={onSubmit}  className="flex flex-col gap-3 p-6 my-6  border rounded-2xl">
      
          <Input
            id="name"
            label="Display Name (اسم المرسل)"
            placeholder="Enter name here"
            // error
            // hint="Name is required"
          />
  
          <Input
            id="email"
            label="SMTP Email (بريد الإرسال)"
            placeholder="Enter email here"
            // error
            // hint="Email is required"
          />
       
          <Input
            id="password"
            label="App Password (كلمة سر التطبيق)"
            placeholder="*********"
            // error
            // hint="password is required"
          />
     
          <Input
            id="server"
            label="SMTP server (الخادم)"
            placeholder="smtp.gmail.com"
            // error
            // hint="server is required"
          />
      
          <Input
            id="port"
            label="Port (المنفذ)"
            placeholder="321"
            // error
            // hint="port is required"
          />
       
          <Input
            id="encryption"
            label="Encryption (التشفير)"
            placeholder="TLS"
            // error
            // hint="Encryption is required"
          />
       

        <Button className="mt-2">save</Button>
      </Form>
    </Modal>
  );
}
