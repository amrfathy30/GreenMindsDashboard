import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Form from "../../components/form/Form";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData?: any;
  type: 'add' | 'edit'
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, gameData, type }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(gameData?.image || null);
  const ageGroups = ["2-4 Years", "5-7 Years", "8-10 Years", "11-13 Years"];
  if (!isOpen) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = () => {
    onClose()
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={type == 'edit' ? "Edit Game" : "Add New Game"}
    >
      <Form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-6 my-6  border rounded-2xl"
      >

        <Input
          id="name_En"
          label="Game Name (EN)"
          placeholder="Enter Name Here"

        />

        <Input
          id="name_ar"
          label="Game Name (AR)"
          placeholder="Enter Name Here"

        />
        <Input
          id="name_ar"
          label="Game Name (AR)"
          placeholder="Enter Name Here"

        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black dark:text-gray-300">
            Select Age Group
          </label>
          <select 
            id="age_group"
            defaultValue={gameData?.ageGroup || ""}
            className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 px-4 text-black outline-none transition focus:border-primary dark:border-gray-700 dark:text-white dark:bg-[#1a222c]"
          >
            <option value="" disabled>Select Age Group</option>
            {ageGroups.map((group) => (
              <option key={group} value={group} className="dark:bg-[#1a222c]">
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 space-x-2 w-full">
          <TextArea
            id="description_en"
            label="Description (EN)"
            placeholder="Enter description Here"
          />
          <TextArea
            id="description_ar"
            label="Description (AR)"
            placeholder="Enter description Here"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Android Link", placeholder: "Enter game URL here", id: "android" },
            { label: "iOS Link", placeholder: "Enter game URL here", id: "ios" },
            { label: "API Link", placeholder: "Enter URL here", id: "api_link" },
            { label: "API Key", placeholder: "Enter API Key here", id: "ai_key" }
          ].map((field) => (
            <Input
              key={field.label}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}

            />
          ))}
        </div>

        <div className="space-y-2">
          <label className="mb-1.5 block text-sm font-medium text-black dark:text-gray-300">
            Upload Game Thumbnail or Add the Game Thumbnail link
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4 ">
            <div className="relative flex h-[80px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-[#adf4b514] overflow-hidden border border-gray-100 border-gray-700">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon size={26} className="text-gray-400" />
              )}
            </div>
            <div className="w-full space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                <div className="text-[#25B16F]">
                  <Upload size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-[#00A7E1] to-[#25B16F] bg-clip-text text-transparent">
                  Upload Thumbnail
                </span>
              </button>
              <Input placeholder="Enter Game thumbnail URL here"

              />
            </div>
          </div>
        </div>


        <Button className="mt-2" type="submit">Save</Button>
      </Form>
    </Modal>

  );
};

export default GameModal;