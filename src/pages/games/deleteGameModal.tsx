import React from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { deleteGame } from "../../api/services/gameService";

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number | null;
  onSuccess: () => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ isOpen, onClose, gameId, onSuccess }) => {
  if (!isOpen) return null;
const handleOnClick = async () => {
    if (gameId) {
      try {
        await deleteGame(gameId);
        onSuccess(); 
        onClose();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };
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