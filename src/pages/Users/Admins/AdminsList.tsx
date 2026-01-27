/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import AdminModal from "./AdminModal";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import {
  AdminApiResponse,
  AdminList,
  UserTypeApiResponse,
  UserTypeList,
} from "../../../utils/types/adminType";
import {
  allAdminData,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  UserTypes,
} from "../../../api/services/adminService";
import { TableLoading } from "../../../components/loading/TableLoading";

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
            Email: item.Email,
            Password: item.Password,
            Type: item.Type,
            TypeName: item.TypeName,
            Phone: item.Phone,
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

  // userTypeList
  const [userTypeList, setUserType] = useState<UserTypeList[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTableLoading(true);
        const data: UserTypeApiResponse = await UserTypes();

        setUserType(
          data.Data.map((item) => ({
            Id: item.Id,
            Name: item.Name,
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

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeleteLoading(true);
      const res = await deleteAdmin(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("ParentDeletedSuccessfully"));

      setAdminList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete_parent"));
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
        data.Email === "" ||
        data.Password === "" ||
        data.Type === 0
      ) {
        toast.error(t("all_fields_required"));
        return;
      }

      setModalLoading(true);

      let res;
      if (editData) {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("Phone", data.Phone || "");
        formData.append("Type", data.Type.toString());
        if (data.Password) formData.append("Password", data.Password);

        res = await updateAdmin(formData, editData.id!);
      } else {
        res = await createAdmin({ ...data });
      }

      const listRes: AdminApiResponse = await allAdminData();

      setAdminList(
        listRes.Data.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          Email: item.Email,
          Password: item.Password,
          Type: item.Type,
        })),
      );

      ShowToastSuccess(
        res?.Message || (editData ? t("success_update") : t("success_create")),
      );
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
      label: t("Phone"),
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
        <BasicTableOne data={adminList} columns={columns} />
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
        userTypeList={userTypeList}
        onSave={handleSave}
      />
    </div>
  );
}
