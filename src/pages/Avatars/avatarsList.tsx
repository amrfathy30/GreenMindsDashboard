import { useState,useEffect } from "react";
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

const MOCK_AVATARS = [
  { id: 1, ageGroup: "2-5 Years", image: "/images/avatarImages/avatar1.png" },
  { id: 2, ageGroup: "5-7 Years", image: "/images/avatarImages/avatar2.png" },
  { id: 3, ageGroup: "8-10 Years", image: "/images/avatarImages/avatar1.png" },
  { id: 4, ageGroup: "11-13 Years", image: "/images/avatarImages/avatar2.png" },
  { id: 5, ageGroup: "2-5 Years", image: "/images/avatarImages/avatar1.png" },
  { id: 6, ageGroup: "5-7 Years", image: "/images/avatarImages/avatar2.png" },
];

export default function GamesList() {
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
        title="Avatars Dashboard | Green minds Admin Dashboard"
        description="Manage your Avatars list easily."
      />

<div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-[#adf4b514]  h-[calc(100vh-48px)] dark:bg-neutral-800">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Avatars - Admin
          </h2>
          <Button
            size="sm"
            variant="primaryGrid"
            onClick={() => setIsModalOpen(true)}
          >
              <div className="text-white">
              <PlusIcon />
            </div>
            Add Avatar
          </Button>
        </div>
        {avatars?.length == 0 && !loading ? <EmptyState title="No Data Found" description="Avatars Section has no data yet, start by adding your first Avatar Now!"/> : ""}
   
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
        title="Delete Avatar"
        description="Are you sure you want to delete this avatar?"
      />
    </>
  );
}