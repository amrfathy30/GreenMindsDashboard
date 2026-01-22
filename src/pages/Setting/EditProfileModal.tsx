import { FormEvent, useRef, useState } from "react";
import Label from "../../components/form/Label";
import { Modal } from "../../components/ui/modal";
import { createPortal } from "react-dom";
import { Edit2 } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Form from "../../components/form/Form";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  const [avatar, setAvatar] = useState("/images/user.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (!target || !target.files || target.files.length === 0) return;

    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return createPortal(
    <Modal isOpen={open} onClose={onClose} className="max-w-xl p-6 mx-4" title="edit profile">
      <div>
        <Form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt="user-avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div
                onClick={handleEditClick}
                className="w-5 h-5 bg-white rounded-full p-1 border flex justify-center items-center cursor-pointer text-Black absolute -right-2 -bottom-2"
              >
                <Edit2 className="w-full h-full" />
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col">
              <h2>Mohamed</h2>
              <h2>mohamed@greenminds.com</h2>
            </div>
          </div>

          <div className="border border-[#E5E7EB]"></div>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <Label htmlFor="">name</Label>
            <input
              type="text"
              placeholder="mohamed"
              className="border-b border-gray-300 focus:outline-none focus:ring-0 w-full md:w-1/2"
            />
          </div>

          <div className="border border-[#E5E7EB]"></div>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <Label htmlFor="">Email account</Label>
            <input
              type="email"
              placeholder="mohamed@green minds.com"
              className="border-b border-gray-300 focus:outline-none focus:ring-0 w-full md:w-1/2"
            />
          </div>

          <div className="border border-[#E5E7EB]"></div>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <Label htmlFor="">Reset password</Label>
            <input
              type="password"
              placeholder="************"
              className="border-b border-gray-300 focus:outline-none focus:ring-0 w-full md:w-1/2"
            />
          </div>

          <div className="border border-[#E5E7EB]"></div>
          <Button>save</Button>
        </Form>
      </div>
    </Modal>,
    document.body,
  );
}
