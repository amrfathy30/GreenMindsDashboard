import React from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { deleteGame } from "../../api/services/gameService";
import { useLanguage } from "../../api/locales/LanguageContext";

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number | null;
  onSuccess: () => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ isOpen, onClose, gameId, onSuccess }) => {
  const { t } = useLanguage();
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
        title={t("delete_game_title")}
        description={t("confirm_delete_game")}
      />
  );
};

export default DeleteGameModal;