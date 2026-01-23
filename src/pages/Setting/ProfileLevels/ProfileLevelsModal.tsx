import { FormEvent, useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

interface ProfileLevelsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    from: string;
    to: string;
    levelNameAr: string;
    levelNameEn: string;
  }) => void;
  initialData?: {
    from: string;
    to: string;
    levelNameAr: string;
    levelNameEn: string;
  };
}

export default function ProfileLevelsModal({
  open,
  onClose,
  onSave,
  initialData,
}: ProfileLevelsModalProps) {
  const [from, setFrom] = useState("");
  const [levelNameAr, setLevelNameAr] = useState("");
  const [levelNameEn, setLevelNameEn] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    if (initialData) {
      setFrom(initialData.from);
      setTo(initialData.to);
      setLevelNameAr(initialData.levelNameAr);
      setLevelNameEn(initialData.levelNameEn);
    } else {
      setFrom("");
      setTo("");
      setLevelNameAr("");
      setLevelNameEn("");
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ from, to, levelNameEn, levelNameAr });
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? "Edit Profile Levels" : "Add Profile Levels"}
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-3 p-5 mt-4 ">
        <div className="border-b pb-4">
          <Input
            id="levelNameAr"
            label="Level Name (Ar)"
            placeholder="Enter level Name (Ar)"
            value={from}
            onChange={(e) => setLevelNameAr(e.target.value)}
          />
        </div>
        <div className="border-b pb-4">
          <Input
            id="levelNameEn"
            label="Level Name (En)"
            placeholder="Enter level Name (En)"
            value={from}
            onChange={(e) => setLevelNameEn(e.target.value)}
          />
        </div>
        <div className="border-b pb-4">
          <Input
            id="from"
            label="From"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div>
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
