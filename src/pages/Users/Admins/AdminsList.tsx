/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import Pagination from "../../../components/common/Pagination";
import AdminModal from "./AdminModal";

export type Admin = {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  status?: string;
};

export default function AdminsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

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
      label: "Name",
    },
    {
      key: "email",
      label: "email",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <span>{row.email}</span>
          <span
            className={`text-sm ${
              row.status === "verified" ? "text-[#25B16F]" : "text-[#E51C1C]"
            }`}
          >
            {row.status === "verified" ? "Verified" : "Not Verified"}
          </span>
        </div>
      ),
    },
    {
      key: "LastRegister",
      label: "Last Register",
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "permissions",
      label: "permissions",
    },
    {
      key: "actions",
      label: "actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAdmin(row);
              setOpenAdminModal(true);
            }}
          >
            <EditIcon className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
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
        title="Delete Admin"
        description="Are you sure you want to delete this admin?"
      />
      <AdminModal
        open={openAdminModal}
        onClose={() => {
          setOpenAdminModal(false);
          setSelectedAdmin(null);
        }}
        initialData={selectedAdmin}
        onSave={(admin) => {
          setAdminList((prev) =>
            selectedAdmin
              ? prev.map((a) => (a.id === admin.id ? admin : a))
              : [...prev, admin],
          );
        }}
      />
    </div>
  );
}
