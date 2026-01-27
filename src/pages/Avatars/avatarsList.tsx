import { useState,useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import PageMeta from "../../components/common/PageMeta";
import AvatarCard from "./avatarCard";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import AvatarModal from "./avatarModal";
import { getAvatarsPaged, deleteAvatar } from "../../api/services/avatarService";
import AvatarSkeleton from "../../components/loading/avatarLoading";
import EmptyState from "../../components/common/no-data-found";
import { PlusIcon } from "../../icons";



export default function GamesList() {
  const { t } = useLanguage();
  const [avatars, setAvatars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  const handleEditClick = (avatar: any) => {
    setSelectedAvatar(avatar);
    setIsEditModalOpen(true);
  };

const loadAvatars = async () => {
    setLoading(true);
    try {
      const response = await getAvatarsPaged(currentPage, pageSize);
      setAvatars(response.data);
      setTotalPages(Math.ceil(response.totalCount / pageSize));
    } catch (error) {
      console.error("Failed to fetch avatars", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvatars();
  }, [currentPage]);

  const handleDeleteClick = (avatar: any) => {
    setSelectedAvatar(avatar);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteAvatar(selectedAvatar.id);
      loadAvatars(); 
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete failed");
    }
  };
  return (
    <>
      <PageMeta
        title="Green minds Admin | Avatars"
        description=""
      />

<div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("avatars_admin")}
          </h2>
          <Button
            size="sm"
            variant="primaryGrid"
            onClick={() => setIsModalOpen(true)}
          >
              <div className="text-white">
              <PlusIcon />
            </div>
            {t("add_avatar")}
          </Button>
        </div>
        {avatars?.length == 0 && !loading ? <EmptyState title={t("no_avatars_found")} description={t("no_avatars_desc")}/> : ""}
   
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[80%] px-5">
          {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <AvatarSkeleton key={index} />
          ))
        ) : avatars && avatars.length > 0 ? (
          avatars.map((avatar: any) => (
            <AvatarCard
              key={avatar.id}
              ageGroup={avatar.ageSector?.name || "N/A"}
              image={avatar.imagePath || avatar.image}
              onEdit={() => handleEditClick(avatar)}
              onDelete={() => handleDeleteClick(avatar)}
            />
          ))
        ) : (''
        )}
        </div>

        <div className="absolute bottom-0 my-4 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          loadAvatars(); 
        }}
        type="add"
      />
      <AvatarModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        avatarData={selectedAvatar}
        type="edit"
      />
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("delete_avatar")}
       description={t("confirm_delete_avatar")}
      />
    </>
  );
}