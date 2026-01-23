import React, { useRef, useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Button from "../../components/ui/button/Button";

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-2 sm:p-4">
      
      <div className="relative w-full max-w-3xl rounded-[15px] bg-white shadow-2xl dark:bg-gray-900 overflow-visible mt-10">
        
        <div 
          className="absolute -top-8 md:-top-10 right h-[60px] md:h-[90px] w-[80%] sm:w-[85%] rounded-tr-[50px] md:rounded-tr-[90px] bg-gradient-to-r from-[#009DD1] to-[#25B16F] flex items-center px-4 sm:px-8z-20"
        >
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-wide truncate">Add New Game</h2>
        </div>

        <button 
          onClick={onClose} 
          className="absolute right-3 top-3 sm:right-6 sm:top-6 text-gray-400 hover:text-gray-600 transition-colors z-50 p-2"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="p-4 sm:p-8 pt-12 sm:pt-20 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white">
            <form className="space-y-2">
              
              <div className="grid grid-cols-1">
                <div className="space-y-1">
                  <label className="text-[13px] font-medium">Game Name (EN)</label>
                  <input type="text" placeholder="Enter name here" className="w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#25B16F]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-medium">Game Name (AR)</label>
                  <input type="text" placeholder="Enter name here" className="w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#25B16F]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[13px] font-medium">Description (EN)</label>
                  <textarea rows={2} className="w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#25B16F] resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-medium">Description (AR)</label>
                  <textarea rows={2} className="w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#25B16F] resize-none" />
                </div>
              </div>

              <div className="grid grid-cols-1">
                {[
                  { label: "Android Link", placeholder: "Enter game URL here" },
                  { label: "iOS Link", placeholder: "Enter game URL here" },
                  { label: "API Link", placeholder: "Enter URL here" },
                  { label: "API Key", placeholder: "Enter API Key here" }
                ].map((field) => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-[12px] font-medium">{field.label}</label>
                    <input type="text" placeholder={field.placeholder} className="w-full rounded-xl border border-gray-200 p-2 text-sm outline-none focus:border-[#25B16F]" />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium">Upload Game Thumbnail or Add the Game Thumbnail link </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50/50">
                  <div className="relative flex h-[80px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-gray-200 overflow-hidden border border-gray-100">
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
                    <input type="text" placeholder="Enter Game thumbnail URL here" className="w-full rounded-lg border border-gray-100 bg-white p-2 text-xs outline-none focus:border-[#25B16F]" />
                  </div>
                </div>
              </div>
            </form>
            
          </div>
          <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full !rounded-xl !bg-[#666666] !from-transparent !to-transparent py-3 sm:py-4 text-sm sm:text-base font-bold shadow-lg"
                  onClick={() => console.log("Form Submitted")}
                >
                  Add Game
                </Button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;