import { FormEvent, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";

interface EditChildModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditChildModal({ open, onClose }: EditChildModalProps) {
  const [selectedValue, setSelectedValue] = useState<string>("male");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title="Edit Children"
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 my-6  border rounded-2xl"
      >
        <div>
          <Input
            id="name_En"
            label="Children Name (EN)"
            placeholder="Enter Name Here"
            // error
            // hint="Children Name (EN) is required"
          />
        </div>
        <div>
          <Input
            id="name_ar"
            label="Children Name (AR)"
            placeholder="Enter Name Here"
            // error
            // hint="Children Name (AR) is required"
          />
        </div>
        <div>
          <Input
            id="email"
            label="Children Email"
            placeholder="Enter Children Email"
            // error
            // hint="Children Email is required"
          />
        </div>
        <div>
          <Input
            id="phone"
            label="Children phone"
            placeholder="Enter Children phone"
            // error
            // hint="Children phone is required"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Input
              id="Password"
              label="Children Password"
              placeholder="Enter Children Password"
              // error
              // hint="Children Password is required"
            />
          </div>
          <div>
            <Input
              id="Confirm_Password"
              label="Children Confirm Password"
              placeholder="Enter Children Confirm Password"
              // error
              // hint="Children Confirm Password is required"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label>Gender</Label>
            <div className="flex items-center gap-3">
              <Radio
                id="male"
                name="gender"
                value="male"
                checked={selectedValue === "male"}
                label="Male"
                onChange={handleChange}
              />
              <Radio
                id="female"
                name="gender"
                value="female"
                checked={selectedValue === "female"}
                label="Female"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Input
              id="age"
              label="age"
              placeholder="Enter Children age"
              // error
              // hint="Children age is required"
            />
          </div>
        </div>

        <div>
          <Input
            id="parent_phone"
            label="Parent phone"
            placeholder="Enter Parent phone"
            // error
            // hint="Parent phone is required"
          />
        </div>

        <Button className="mt-2">Edit Children</Button>
      </Form>
    </Modal>
  );
}
