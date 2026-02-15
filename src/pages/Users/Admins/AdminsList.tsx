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
  createUser,
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

  const canViewAction =
    hasPermission("Account_Update") || hasPermission("Account_Delete");

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
            PhoneNumber: item.PhoneNumber,
            ConfirmPassword: item.ConfirmPassword,
            GenderId: item.GenderId,
            DateOfBirth: item.DateOfBirth,
            RolesNames: item.RolesNames ?? [],
          })),
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("operation_failed"));
      } finally {
        setTableLoading(false);
      }
    };

    fetchData();
  }, [canViewAdmin, t]);

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
  }, [canViewAdminRoles, t]);

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

  const isValidPhone = (phone?: string) => {
    if (!phone) return false;
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length > 4;
  };

  const handleSave = async (data: AdminList) => {
    try {
      if (!data.Name?.trim() || !data.UserName?.trim() || !data.Email?.trim()) {
        toast.error(t("all_fields_required"));
        return;
      }

      if (!isValidPhone(data.PhoneNumber)) {
        toast.error(t("please_enter_valid_phone"));
        return;
      }

      const MIN_PASSWORD_LENGTH = 8;
      const MAX_PASSWORD_LENGTH = 15;

      if (!editData?.id && data.Password) {
        if (
          data.Password.length < MIN_PASSWORD_LENGTH ||
          data.Password.length > MAX_PASSWORD_LENGTH
        ) {
          toast.error(t("PasswordBetween"));
          return;
        }

        if (data.Password !== data.ConfirmPassword) {
          toast.error(t("PasswordNotMatch"));
          return;
        }
      }

      setModalLoading(true);

      let res;
      let createdAdminId: number | undefined;

      if (editData?.id) {
        res = await updateAdmin(editData.id, data);

        if (data.roleName && data.roleName !== editData.roleName) {
          await AddAdminRole(String(editData.id), [data.roleName]);
        }
      } else {
        res = await createUser(data);
        createdAdminId = res?.Data?.Id;

        if (createdAdminId && data.roleName) {
          await AddAdminRole(String(createdAdminId), [data.roleName]);
        }
      }

      const listRes: AdminApiResponse = await allAdminData();

      setAdminList(
        listRes.Data.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          UserName: item.UserName || "",
          Email: item.Email,
          PhoneNumber: item.PhoneNumber,
          ConfirmPassword: item.ConfirmPassword,
          Password: item.Password,
          GenderId: item.GenderId,
          DateOfBirth: item.DateOfBirth,
          RolesNames: item.RolesNames || [],
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

  // const calculateAge = (dateOfBirth: string) => {
  //   if (!dateOfBirth) return "__";

  //   const birthDate = new Date(dateOfBirth);
  //   const today = new Date();

  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();

  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //   ) {
  //     age--;
  //   }

  //   return age;
  // };

  // const getGenderLabel = (genderId: string | number, t: any) => {
  //   if (String(genderId) === "1") return t("Male");
  //   if (String(genderId) === "2") return t("Female");
  //   return "__";
  // };

  const columns: any[] = [
    {
      key: "Name",
      label: t("name"),
      render: (row: any) => (
        <span className="block max-w-25 truncate">{row.Name || "__"}</span>
      ),
    },
    {
      key: "UserName",
      label: t("UserName"),
      render: (row: any) => (
        <span className="dark:text-white block max-w-25 truncate">
          {row.UserName || "__"}
        </span>
      ),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <span className="dark:text-white block max-w-60 truncate">
          {row.Email || "__"}
        </span>
      ),
    },
    {
      key: "RolesNames",
      label: t("RolesNames"),
      render: (row: any) => (
        <span className="dark:text-white">{row.RolesNames?.[0] ?? "__"}</span>
      ),
    },
    {
      key: "PhoneNumber",
      label: t("PhoneNumber"),
      render: (row: any) => (
        <span className="dark:text-white">{row.PhoneNumber || "__"}</span>
      ),
    },
  ];

  if (canViewAction) {
    columns.push({
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {canEditAdmin && (
            <button
              onClick={() => {
                setEditData({
                  id: row.id,
                  Name: row.Name ?? "",
                  Email: row.Email ?? "",
                  PhoneNumber: row.PhoneNumber ?? "",
                  UserName: row.UserName ?? "",
                  Password: "",
                  ConfirmPassword: "",
                  roleName: row.RolesNames?.[0] ?? "",
                  GenderId: row.GenderId ?? 1,
                  DateOfBirth: row.DateOfBirth ?? "1979-03-04",
                  Type: 2,
                });

                setOpenModal(true);
              }}
            >
              <EditIcon className="w-5 h-5 invert-0 dark:invert" />
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
              <RemoveIcon className="w-5 h-5  invert-0 dark:invert" />
            </button>
          )}
        </div>
      ),
    });
  }

  if (!canViewAdmin && !tableLoading) {
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
        key={editData?.id ?? "create"}
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
