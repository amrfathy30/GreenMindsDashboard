import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-md mx-4 "
      title={title}
    >
      <div className="p-6">
        <p className="mb-4 text-gray-700">{description}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
