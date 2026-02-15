import { useLanguage } from "../../locales/LanguageContext";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: ConfirmModalProps) {
  const { t } = useLanguage();
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-xl mx-4"
      title={title}
      dangerType
    >
      <div className="pb-6 px-4 md:px-0"> 
        <div className="border border-[#D3D3D3] dark:border-gray-800 rounded-[15px] min-h-[120px] p-5 my-4 flex items-center justify-center text-center">
          <p className="text-base sm:text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
            {description}
          </p>
        </div>
        <Button className="mt-2 w-full py-3" onClick={onConfirm} disabled={loading}>
          {loading ? t("deleting") : t("delete")}
        </Button>
      </div>
    </Modal>
  );
}