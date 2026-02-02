/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import AdminModal from "./AdminModal";
import { useLanguage } from "../../../locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import { AdminApiResponse, AdminList } from "../../../utils/types/adminType";
import {
  allAdminData,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from "../../../api/services/adminService";
import { TableLoading } from "../../../components/loading/TableLoading";
import {
  AddAdminRole,
  allAdminRoles,
} from "../../../api/services/adminRolesService";
import { AgeApiResponse } from "../../../utils/types/ageType";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";

export default function AdminsList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const { t } = useLanguage();
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<AdminList | null>(null);

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canViewAdmin = hasPermission("Account_GetAdmins");
  const canViewAdminRoles = hasPermission("AdminRoles_GetAllRoles");
  const canEditAdmin = hasPermission("Account_Update");
  const canDeleteAdmin = hasPermission("Account_Delete");

  useEffect(() => {
    if (openAddModal) {
      setEditData(null);
      setOpenModal(true);
      setOpenAddModal?.(false);
    }
  }, [openAddModal, setOpenAddModal]);

  // adminList
  const [adminList, setAdminList] = useState<AdminList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!canViewAdmin) {
        setTableLoading(false);
        return;
      }
      try {
        setTableLoading(true);
        const data: AdminApiResponse = await allAdminData();

        setAdminList(
          data.Data.map((item) => ({
            id: item.Id,
            Name: item.Name,
            UserName: item.UserName,
            Email: item.Email,
            Password: item.Password,
            Phone: item.Phone,
            ConfirmPassword: item.ConfirmPassword,
          })),
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("operation_failed"));
      } finally {
        setTableLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const [adminRoles, setAdminRoles] = useState<any[]>([]);
  // fetchAdminRoles
  useEffect(() => {
    const fetchAdminRoles = async () => {
      if (!canViewAdminRoles) {
        return;
      }
      try {
        const data: AgeApiResponse = await allAdminRoles();

        setAdminRoles(data.Data);
      } catch (error) {
        toast.error(t("failed_load_data"));
      }
    };

    fetchAdminRoles();
  }, [t]);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeleteLoading(true);
      const res = await deleteAdmin(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("DeletedSuccessfully"));

      setAdminList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete"));
    } finally {
      setDeleteLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: AdminList) => {
    try {
      if (
        !data.Name?.trim() ||
        !data.UserName?.trim() ||
        !data.Email?.trim() 
      ) {
        toast.error(t("all_fields_required"));
        return;
      }

      if (!editData?.id && data.Password.length < 8) {
        toast.error(t("PasswordMustBeAtLeast8Characters"));
        return;
      }

      if (data.Password !== data.ConfirmPassword) {
        toast.error(t("PasswordNotMatch"));
        return;
      }

      setModalLoading(true);

      let res;
      let createdAdminId: number | undefined;

      if (editData?.id) {
        res = await updateAdmin(editData.id, data);

        if (data.roleName && data.roleName !== editData.roleName) {
          await AddAdminRole(data.roleName, String(editData.id));
        }
      } else {
        res = await createAdmin(data);
        createdAdminId = res?.Data?.Id;

        if (createdAdminId && data.roleName) {
          await AddAdminRole(data.roleName, String(createdAdminId));
        }
      }

      const listRes: AdminApiResponse = await allAdminData();

      setAdminList(
        listRes.Data.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          UserName: item.UserName || "",
          Email: item.Email,
          Phone: item.Phone,
          ConfirmPassword: item.ConfirmPassword,
          Password: item.Password,
        })),
      );

      ShowToastSuccess(
        res?.Message || (editData ? t("success_update") : t("success_create")),
      );

      setOpenModal(false);
      setEditData(null);
    } catch (error: any) {
      const errData = error?.response?.data;

      if (Array.isArray(errData?.Data)) {
        toast.error(errData.Data.join("\n"));
      } else if (errData?.Data && typeof errData.Data === "object") {
        const messages: string[] = [];

        for (const key in errData.Data) {
          if (Array.isArray(errData.Data[key])) {
            messages.push(...errData.Data[key]);
          }
        }

        toast.error(messages.join("\n"));
      } else {
        toast.error(errData?.Message || t("operation_failed"));
      }
    } finally {
      setModalLoading(false);
    }
  };

  const columns = [
    {
      key: "Name",
      label: t("name"),
    },
    {
      key: "UserName",
      label: t("UserName"),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <span>{row.Email || "__"}</span>
        </div>
      ),
    },
    {
      key: "Phone",
      label: t("PhoneNumber"),
      render: (row: any) => (
        <span className="text-[#757575] dark:text-white">{row.Phone || "__"}</span>
      ),
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {canEditAdmin && (
            <button
              onClick={() => {
                setEditData({
                  id: row.id,
                  Name: row.Name,
                  Email: row.Email,
                  Phone: row.Phone,
                  Password: row.Password,
                  UserName: row.UserName,
                });
                setOpenModal(true);
              }}
            >
              <EditIcon className="w-6 h-6 invert-0 dark:invert" />
            </button>
          )}
          {canDeleteAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id);
              }}
              aria-label={t("common.delete")}
            >
              <RemoveIcon className="w-6 h-6 invert-0 dark:invert" />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (!canViewAdmin && !tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <div>
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
          <BasicTableOne data={adminList} columns={columns} />
        </div>
      )}

      <ConfirmModal
        open={openConfirm}
        loading={deleteLoading}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title={t("deleteAdmin")}
        description={t("confirmDeleteAdmin")}
      />
      <AdminModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
        loading={modalLoading}
        adminRoles={adminRoles}
        onSave={handleSave}
      />
    </div>
  );
}
