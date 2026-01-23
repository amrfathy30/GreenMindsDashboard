import { FormEvent, useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Radio from "../../../components/form/input/Radio";
import Label from "../../../components/form/Label";
import { Children } from "./ChildrenList";

interface ChildModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Children | null;
  onSave: (data: Children) => void;
}

export default function ChildrenModal({
  open,
  onClose,
  initialData,
  onSave,
}: ChildModalProps) {
  const [selectedValue, setSelectedValue] = useState<string>("male");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    parent_phone: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name_en: initialData.name_en,
        name_ar: initialData.name_ar,
        email: initialData.email,
        phone: initialData.phone,
        password: initialData.password,
        confirm_password: initialData.confirm_password,
        parent_phone: initialData.parent_phone,
        age: initialData.age,
        gender: initialData.gender,
      });
    } else {
      setFormData({
        name_en: "",
        name_ar: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        parent_phone: "",
        age: "",
        gender: "",
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
      title="Add New Children"
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 my-6  border rounded-2xl"
      >
        <div>
          <Input
            id="name_en"
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
              id="password"
              label="Children Password"
              placeholder="Enter Children Password"
              // error
              // hint="Children Password is required"
            />
          </div>
          <div>
            <Input
              id="confirm_password"
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

        <Button className="mt-2">Add Children</Button>
      </Form>
    </Modal>
  );
}
