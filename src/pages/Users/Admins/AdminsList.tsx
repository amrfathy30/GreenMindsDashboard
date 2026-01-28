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
import { allAdminRoles } from "../../../api/services/adminRolesService";
import { AgeApiResponse } from "../../../utils/types/ageType";
import Pagination from "../../../components/common/Pagination";

export default function AdminsList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<AdminList | null>(null);

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
            Type: item.Type,
            TypeName: item.TypeName,
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
        !data.Email?.trim() ||
        data.Type === 0
      ) {
        toast.error(t("all_fields_required"));
        return;
      }
      if (data.Password !== data.ConfirmPassword) {
        toast.error(t("PasswordNotMatch"));
        return;
      }

      setModalLoading(true);

      let res;
      if (editData?.id) {
        res = await updateAdmin(editData.id, data);
      } else {
        res = await createAdmin(data);
      }

      const listRes: AdminApiResponse = await allAdminData({
        page: currentPage,
        pageSize: 10,
      });

      setAdminList(
        listRes.Data.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          UserName: item.UserName || "",
          Email: item.Email,
          Phone: item.Phone,
          ConfirmPassword: item.ConfirmPassword,
          Password: item.Password,
          Type: item.Type,
        })),
      );

      ShowToastSuccess(
        res?.Message || (editData ? t("success_update") : t("success_create")),
      );
      setTotalPages(Math.ceil(listRes.Total / listRes.PageSize));

      setOpenModal(false);
      setEditData(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
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
        <div className="">
          <span>{row.Email}</span>
          {/* <span
            className={`text-sm ${
              row.status === "verified" ? "text-[#25B16F]" : "text-[#E51C1C]"
            }`}
          >
            {row.status === "verified" ? t("verified") : t("notVerified")}
          </span> */}
        </div>
      ),
    },
    {
      key: "Phone",
      label: t("PhoneNumber"),
      render: (row: any) => (
        <span className="text-[#757575]">{row.Phone || "__"}</span>
      ),
    },
    {
      key: "TypeName",
      label: t("TypeName"),
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                id: row.id,
                Name: row.Name,
                Email: row.Email,
                Password: row.Password,
                Type: row.Type,
              });
              setOpenModal(true);
            }}
          >
            <EditIcon className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            aria-label={t("common.delete")}
          >
            <RemoveIcon className="w-8 h-8" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
          <BasicTableOne data={adminList} columns={columns} />
          <div className="mt-auto my-6 w-full flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
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
