import React from "react";
import { X, AlertCircle } from "lucide-react";
import Button from "../../components/ui/button/Button";

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-2 sm:p-4">
      
      <div className="relative w-full max-w-3xl rounded-[15px] bg-white shadow-2xl dark:bg-gray-900 overflow-visible mt-10">
        
        <div 
          className="absolute -top-8 md:-top-10 right h-[60px] md:h-[90px] w-[80%] sm:w-[85%] rounded-tr-[50px] md:rounded-tr-[90px] bg-gradient-to-r from-[#D10000] to-[#402E25] flex items-center px-4 sm:px-8z-20 gap-3"
        >
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600">
              <AlertCircle size={50} />
            </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-wide truncate">Delete Game</h2>
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
              
             <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
                 Are you sure you want to delete this game ?
            </p>
            </form>
            
          </div>
          <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full !rounded-xl !bg-[#666666] !from-transparent !to-transparent py-3 sm:py-4 text-sm sm:text-base font-bold shadow-lg"
                  onClick={() => console.log("Form Submitted")}
                >
                  Delete
                </Button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGameModal;