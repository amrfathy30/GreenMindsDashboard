/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { EditIcon, RemoveIcon } from "../../../icons";
import { toast } from "sonner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Pagination from "../../../components/common/Pagination";
import ChildrenModal from "./ChildrenModal";

export type Children = {
  id: number;
  name_en: string;
  name_ar: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  parent_phone: string;
  age: string;
  gender: string;
  LastRegister?: string;
};

export default function ChildrenList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [openChildrenModal, setOpenChildrenModal] = useState(false);
  const [selectedChildren, setSelectedChildren] = useState<Children | null>(
    null,
  );

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [childrenList, setChildrenList] = useState<Children[]>([
    {
      id: 1,
      name_ar: "احمد",
      name_en: "Ahmed",
      phone: "0123456789",
      age: "15",
      gender: "male",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent_phone: "012346789",
      password: "",
      confirm_password: "",
    },
    {
      id: 2,
      name_ar: "احمد",
      name_en: "Ahmed",
      phone: "0123456789",
      age: "15",
      gender: "male",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent_phone: "012346789",
      password: "",
      confirm_password: "",
    },
    {
      id: 3,
      name_ar: "احمد",
      name_en: "Ahmed",
      phone: "0123456789",
      age: "15",
      gender: "male",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent_phone: "012346789",
      password: "",
      confirm_password: "",
    },
    {
      id: 4,
      name_ar: "احمد",
      name_en: "Ahmed",
      phone: "0123456789",
      age: "15",
      gender: "male",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent_phone: "012346789",
      password: "",
      confirm_password: "",
    },
    {
      id: 5,
      name_ar: "احمد",
      name_en: "Ahmed",
      phone: "0123456789",
      age: "15",
      gender: "male",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent_phone: "012346789",
      password: "",
      confirm_password: "",
    },
  ]);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setChildrenList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The children has been deleted successfully");
    }

    setSelectedDeleteId(null);
  };

  const columns = [
    {
      key: "name_en",
      label: "Name (En)",
    },
    {
      key: "name_ar",
      label: "Name (Ar)",
    },
    {
      key: "email",
      label: "email",
    },
    {
      key: "LastRegister",
      label: "Last Register",
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "parent_phone",
      label: "parent Phone",
    },
    {
      key: "actions",
      label: "actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedChildren(row);
              setOpenChildrenModal(true);
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
      <BasicTableOne data={childrenList} columns={columns} />{" "}
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
        title="Delete Child"
        description="Are you sure you want to delete this child?"
      />
      <ChildrenModal
        open={openChildrenModal}
        onClose={() => {
          setOpenChildrenModal(false);
          setSelectedChildren(null);
        }}
        initialData={selectedChildren}
        onSave={(child) => {
          setChildrenList((prev) =>
            selectedChildren
              ? prev.map((p) => (p.id === child.id ? child : p))
              : [...prev, child],
          );
        }}
      />
    </div>
  );
}
