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
    console.log("Attempting to delete game with ID:", gameId); // شوفي الرقم هيطلع كام في الـ Console
    if (gameId) {
      try {
        await deleteGame(gameId);
        onSuccess(); 
        onClose();
      } catch (error) {
        console.error("Delete failed", error);
        alert("حدث خطأ أثناء الحذف، تأكدي من الصلاحيات.");
      }
    } else {
      console.error("No Game ID provided to modal");
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