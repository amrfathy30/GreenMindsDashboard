import { FormEvent, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Checkbox from "../../../components/form/input/Checkbox";

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddAdminModal({ open, onClose }: AddAdminModalProps) {
  const [checked, setChecked] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title="Add New Admin"
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6  border rounded-2xl"
      >
        <div>
          <Input
            id="name_En"
            label="Admin Name (EN)"
            placeholder="Enter Name Here"
            // error
            // hint="Admin Name (EN) is required"
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label="Admin Name (AR)"
            placeholder="Enter Name Here"
            // error
            // hint="Admin Name (AR) is required"
          />
        </div>
        <div>
          <Input
            id="email"
            label="Admin Email"
            placeholder="Enter Admin Email"
            // error
            // hint="Admin Email is required"
          />
        </div>
        <div className="">
          <h2>Admin Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-3">
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
            <Checkbox
              label="Permission 1"
              checked={checked}
              onChange={(newChecked) => setChecked(newChecked)}
            />
          </div>
        </div>

        <Button className="mt-2">Add Admin</Button>
      </Form>
    </Modal>
  );
}
