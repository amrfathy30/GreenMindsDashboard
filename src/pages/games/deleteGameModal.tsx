import React from "react";
import ConfirmModal from "../../components/common/ConfirmModal";

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleOnClick = () => {
    onClose()

  }
  return (
    <ConfirmModal
        open={isOpen}
        onClose={onClose}
        onConfirm={handleOnClick}
        title="Delete Game"
        description=" Are you sure you want to delete this game ?"
      />
  );
};

export default DeleteGameModal;