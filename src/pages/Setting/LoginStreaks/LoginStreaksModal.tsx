import { FormEvent, useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

interface LoginStreaksModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { points: string; day: string }) => void;
  initialData?: { points: string; day: string };
}

export default function LoginStreaksModal({
  open,
  onClose,
  onSave,
  initialData,
}: LoginStreaksModalProps) {
  const [points, setPoints] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (initialData) {
      setDay(initialData.day);
      setPoints(initialData.points);
    } else {
      setDay("");
      setPoints("");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ points, day });
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? "Edit Profile Levels" : "Add Profile Levels"}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-5 my-6 border rounded-2xl">
        <div>
          <Input
            id="day"
            label="Day"
            placeholder="Enter Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div>
          <Input
            id="points"
            label="points"
            placeholder="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <Button className="mt-2">{initialData ? "Update" : "Save"}</Button>
      </Form>
    </Modal>
  );
}
