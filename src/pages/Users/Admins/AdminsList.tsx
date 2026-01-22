import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";

export default function AdminsList() {
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

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

  const [adminList, setAdminList] = useState([
    {
      id: 1,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 2,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 3,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 4,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 5,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
  ]);

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
    },
    {
      key: "Children",
      label: "Children",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => console.log("Edit", row)}>
            <img
              src="/src/icons/Edit.svg"
              alt="edit"
              className="w-8 h-8 object-cover"
            />
          </button>

          <button onClick={() => handleDelete(row.id)}>
            <img
              src="/src/icons/Remove.svg"
              alt="remove"
              className="w-9 h-9 object-cover"
            />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <BasicTableOne data={adminList} columns={columns} />{" "}
      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this admin?"
      />
    </div>
  );
}
