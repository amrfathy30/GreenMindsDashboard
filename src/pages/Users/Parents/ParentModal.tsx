import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Checkbox from "../../../components/form/input/Checkbox";
import Label from "../../../components/form/Label";
import { Child, Parents } from "./ParentsList";

interface ParentModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Parents | null;
  onSave: (data: Parents) => void;
}

export default function ParentModal({
  open,
  onClose,
  initialData,
  onSave,
}: ParentModalProps) {
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    email: "",
    childrenList: [] as Child[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_en: initialData.name_en,
        name_ar: initialData.name_ar,
        email: initialData.email,
        childrenList: initialData.childrenList,
      });
    } else {
      setFormData({
        name_en: "",
        name_ar: "",
        email: "",
        childrenList: [],
      });
    }
  }, [initialData, open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      id: initialData?.id ?? Date.now(),
      ...formData,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={initialData ? "Edit Parent" : "Add New Parent"}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 my-6  border rounded-2xl"
      >
        <div>
          <Input
            id="name_en"
            label="Parent Name (EN)"
            placeholder="Enter Name Here"
            // error
            // hint="Parent Name (EN) is required"
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label="Parent Name (AR)"
            placeholder="Enter Name Here"
            // error
            // hint="Parent Name (AR) is required"
          />
        </div>
        <div>
          <Input
            id="email"
            label="Parent Email"
            placeholder="Enter Parent Email"
            // error
            // hint="Parent Email is required"
          />
        </div>
        <div className="flex justify-between items-center gap-3 flex-col md:flex-row">
          <Label htmlFor="" className="w-full">
            Parent Children
          </Label>
          <Input id="search" placeholder="Children Search" />
        </div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Children 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
          </div>
        </div>

        <Button className="mt-2">
          {" "}
          {initialData ? "Update Parent" : "Add Parent"}
        </Button>
      </Form>
    </Modal>
  );
}
