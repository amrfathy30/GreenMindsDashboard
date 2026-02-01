import React from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { deleteGame } from "../../api/services/gameService";
import { useLanguage } from "../../locales/LanguageContext";
import { toast } from "sonner"; 

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
    if (!gameId) {
      console.error("No Game ID provided");
      return;
    }
    const toastId = toast.loading(t("deleting...")); 

    try {
      await deleteGame(gameId);
      
      toast.success(t("deleted_successfully"), { id: toastId });
      
      onSuccess(); 
      onClose();
    } catch (error: any) {
      console.error("Delete failed", error);
      toast.error(error.response?.data?.Message || t("delete_failed"), { id: toastId });
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