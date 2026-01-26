/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import Pagination from "../../../components/common/Pagination";
import AdminModal from "./AdminModal";
import { useLanguage } from "../../../api/locales/LanguageContext";
import { ParentList } from "../../../utils/types/parentType";

export type Admin = {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  status?: string;
};

export default function AdminsList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const { t } = useLanguage();

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<ParentList | null>(null);

  useEffect(() => {
    if (openAddModal) {
      setEditData(null);
      setOpenModal(true);
      setOpenAddModal?.(false);
    }
  }, [openAddModal, setOpenAddModal]);

  // const [openAdminModal, setOpenAdminModal] = useState(false);
  // const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [adminList, setAdminList] = useState<Admin[]>([
    {
      id: 1,
      name: "mohamed",
      email: "mohamed@gmail.com",
      status: "verified",
      permissions: ["Parents", "Games"],
    },
    {
      id: 2,
      name: "mohamed",
      email: "mohamed@gmail.com",
      status: "verified",
      permissions: ["Parents", "Games"],
    },
  ]);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setAdminList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The admin has been deleted successfully");
    }

    setSelectedDeleteId(null);
  };

  const columns = [
    {
      key: "name",
      label: t("name"),
    },
    {
      key: "email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <span>{row.email}</span>
          <span
            className={`text-sm ${
              row.status === "verified" ? "text-[#25B16F]" : "text-[#E51C1C]"
            }`}
          >
            {row.status === "verified" ? t("verified") : t("notVerified")}
          </span>
        </div>
      ),
    },
    {
      key: "LastRegister",
      label: t("lastRegister"),
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "permissions",
      label: t("permissions"),
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // setSelectedAdmin(row);
              // setOpenAdminModal(true);
            }}
            aria-label={t("common.edit")}
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
      <BasicTableOne data={adminList} columns={columns} />{" "}
      <div className="my-6 w-full flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <ConfirmModal
        open={openConfirm}
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
        // onSave={handleSave}
        // loading={modalLoading}
      />
    </div>
  );
}
