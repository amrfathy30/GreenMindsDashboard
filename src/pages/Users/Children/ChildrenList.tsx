/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { EditIcon, RemoveIcon } from "../../../icons";
import { toast } from "sonner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import EditChildModal from "./EditChildModal";

export default function ChildrenList() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [childrenList, setChildrenList] = useState([
    {
      id: 1,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent: "ali mohamed",
    },
    {
      id: 2,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent: "ali mohamed",
    },
    {
      id: 3,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent: "ali mohamed",
    },
    {
      id: 4,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent: "ali mohamed",
    },
    {
      id: 5,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      parent: "ali mohamed",
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
      key: "name",
      label: "Name",
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
      key: "parent",
      label: "parent",
    },
    {
      key: "actions",
      label: "actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenEditModal(true);
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
      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Child"
        description="Are you sure you want to delete this child?"
      />
      <EditChildModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
}
