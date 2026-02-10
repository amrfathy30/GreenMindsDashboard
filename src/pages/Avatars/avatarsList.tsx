/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useLanguage } from "../../locales/LanguageContext";
import PageMeta from "../../components/common/PageMeta";
import AvatarCard from "./avatarCard";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import AvatarModal from "./avatarModal";
import {
  getAvatarsPaged,
  deleteAvatar,
} from "../../api/services/avatarService";
import AvatarSkeleton from "../../components/loading/avatarLoading";
import EmptyState from "../../components/common/no-data-found";
import { PlusIcon } from "../../icons";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../utils/permissions/permissions";
import { toast } from "sonner";

const IMAGE_BASE_URL = "https://kidsapi.pulvent.com/";
export default function AvatarList() {
  const { t } = useLanguage();
  const [avatars, setAvatars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPermissions();
  }, []);
  const canAdd = hasPermission("Avatars_Create");
  const canEdit = hasPermission("Avatars_Update");
  const canDelete = hasPermission("Avatars_Delete");
  const canView = hasPermission("Avatars_GetPaged");

  const handleEditClick = (avatar: any) => {
    setSelectedAvatar(avatar);
    setIsEditModalOpen(true);
  };

  const loadAvatars = async () => {
    if (!canView) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await getAvatarsPaged(currentPage, pageSize);

      const apiResponse = response.data || response;
      const dataContainer = apiResponse.Data || apiResponse.data;

      const fetchedItems = dataContainer?.Items || [];
      const totalCount = dataContainer?.Total || 0;

      setAvatars(fetchedItems);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error: any) {
      setAvatars([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAvatars();
  }, [currentPage, canView, pageSize]);

  const handleDeleteClick = (avatar: any) => {
    setSelectedAvatar(avatar);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    const loadingToast = toast.loading(t("deleting..."));
    try {
      await deleteAvatar(selectedAvatar.Id || selectedAvatar.id);

      loadAvatars();
      setIsDeleteModalOpen(false);

      toast.success(t("deleted_successfully"), { id: loadingToast });
    } catch (error) {
      toast.error(t("delete_failed"), { id: loadingToast });
    }
  };

  if (!canView) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Green minds Admin | Avatars" description="" />

      <div className="rounded-2xl border-b border-[#D9D9D9] dark:border-gray-800 min-h-[calc(100vh-60px)] dark:bg-neutral-800 bg-[#EDEDED] flex flex-col overflow-hidden">
        <div className="h-17.5 flex shrink-0 items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("avatars_admin")}
          </h2>
          {canAdd && (
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
          )}
        </div>

        <div className="grow overflow-y-auto px-5 py-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <AvatarSkeleton key={index} />
              ))
            ) : avatars && avatars.length > 0 ? (
              avatars.map((avatar: any) => (
                <AvatarCard
                  key={avatar.Id}
                  name={avatar.Name}
                  ageGroup={avatar.AgeSectorName || "N/A"}
                  image={
                    avatar.ImageUrl
                      ? avatar.ImageUrl.startsWith("http")
                        ? avatar.ImageUrl
                        : `${IMAGE_BASE_URL}${avatar.ImageUrl}`
                      : ""
                  }
                  canEdit={canEdit}
                  canDelete={canDelete}
                  onEdit={() => handleEditClick(avatar)}
                  onDelete={() => handleDeleteClick(avatar)}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-20">
                <EmptyState
                  title={t("no_avatars_found")}
                  description={t("no_avatars_desc")}
                />
              </div>
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>

      {canAdd && (
        <AvatarModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadAvatars}
          type="add"
        />
      )}

      {canEdit && (
        <AvatarModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedAvatar(null);
          }}
          onSuccess={loadAvatars}
          avatarData={selectedAvatar}
          type="edit"
        />
      )}
      {canDelete && (
        <ConfirmModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t("delete_avatar")}
          description={t("confirm_delete_avatar")}
        />
      )}
    </>
  );
}
