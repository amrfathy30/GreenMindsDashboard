import { FormEvent, useState, useEffect } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

interface AgeGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { from: string; to: string }) => void;
  initialData?: { from: string; to: string };
}

export default function AgeGroupModal({
  open,
  onClose,
  onSave,
  initialData,
}: AgeGroupModalProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    if (initialData) {
      setFrom(initialData.from);
      setTo(initialData.to);
    } else {
      setFrom("");
      setTo("");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ from, to });
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? "Edit Age Group" : "Add Age Group"}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-6 mt-4 ">
        <div className="border-b pb-4">
          <Input
            id="from"
            label="From"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="border-b pb-4">
          <Input
            id="to"
            label="To"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <Button className="mt-2">{initialData ? "Update" : "Save"}</Button>
      </Form>
    </Modal>
  );
}
