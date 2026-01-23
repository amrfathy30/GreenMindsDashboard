/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import { Link } from "react-router";
import EditParentModal from "./EditParentModal";

export default function ParentsList() {
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setParentList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The parent has been deleted successfully");
    }
    setSelectedDeleteId(null);
  };

  const [openEditModal, setOpenEditModal] = useState(false);

  const [parentList, setParentList] = useState([
    {
      id: 1,
      name: "Mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3)",
      childrenList: [
        {
          name: "Ahmed",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Mona",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Seif",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
      ],
    },
    {
      id: 2,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3)",
      childrenList: [
        {
          name: "Ahmed",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Mona",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Seif",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
      ],
    },
    {
      id: 3,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3)",
      childrenList: [
        {
          name: "Ahmed",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Mona",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Seif",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
      ],
    },
    {
      id: 4,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3)",
      childrenList: [
        {
          name: "Ahmed",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Mona",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Seif",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
      ],
    },
    {
      id: 5,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3)",
      childrenList: [
        {
          name: "Ahmed",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Mona",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
        {
          name: "Seif",
          phone: "0123456789",
          email: "abce@123.com",
          points: "3pts",
          streaks: "5 streaks",
        },
      ],
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
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "Children",
      label: "childrenList",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-1">
          {row.childrenList.map((item: { name: string }, index: number) => (
            <div key={index}>
              <span>{item?.name},</span>
            </div>
          ))}
          <span>({row.childrenList.length})</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit", row);
            }}
          >
            <AddIcon className="w-8 h-8" />
          </button> */}
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
      <BasicTableOne
        data={parentList}
        columns={columns}
        expandable={{
          title: "Children",
          canExpand: (row) => row.childrenList?.length > 0,
          renderExpandedRows: (row) =>
            row.childrenList.map((child: any) => (
              <div className="flex justify-between">
                <span className="font-semibold">{child.name}</span>
                <span className="font-semibold">{child.phone}</span>
                <span className="font-semibold">{child.email}</span>
                <span className="font-semibold">{child.points}</span>
                <span className="font-semibold">{child.streaks}</span>
                <Link
                  to="/children-info"
                  className="text-[#25B16F] font-semibold hover:underline"
                >
                  See more
                </Link>
              </div>
            )),
        }}
      />

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this Parent?"
      />

      <EditParentModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
}
