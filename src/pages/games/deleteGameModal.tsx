/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { deleteGame } from "../../api/services/gameService";
import { useLanguage } from "../../locales/LanguageContext";
import { toast } from "sonner";
import { ShowToastSuccess } from "../../components/common/ToastHelper";

interface DeleteGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number | null;
  onSuccess: () => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({
  isOpen,
  onClose,
  gameId,
  onSuccess,
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleOnClick = async () => {
    if (!gameId) {
      console.error("No Game ID provided");
      return;
    }

    setLoading(true);
    try {
      await deleteGame(gameId);
      ShowToastSuccess(t("DeletedSuccessfully"));
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.Message || t("failed_delete"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmModal
      open={isOpen}
      loading={loading}
      onClose={onClose}
      onConfirm={handleOnClick}
      title={t("delete_game_title")}
      description={t("confirm_delete_game")}
    />
  );
};

export default DeleteGameModal;
