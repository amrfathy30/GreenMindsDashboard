/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import { Link } from "react-router";
import Pagination from "../../../components/common/Pagination";
import ParentModal from "./ParentModal";

export type Parents = {
  id: number;
  name_en: string;
  name_ar: string;
  email: string;
  childrenList: Child[];
  LastRegister?: string;
};

export type Child = {
  name: string;
  phone: string;
  email: string;
  points: string;
  streaks: string;
};

export default function ParentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [openParentModal, setOpenParentModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parents | null>(null);

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

  const [parentList, setParentList] = useState<Parents[]>([
    {
      id: 1,
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
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
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
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
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
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
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
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
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
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
      key: "name_ar",
      label: "Name (Ar)",
    },
    {
      key: "name_en",
      label: "Name (En)",
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
          ({row.childrenList.length})
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedParent(row);
              setOpenParentModal(true);
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
              <div className="flex justify-between items-center">
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
        title="Delete Parent"
        description="Are you sure you want to delete this Parent?"
      />

      <ParentModal
        open={openParentModal}
        onClose={() => {
          setOpenParentModal(false);
          setSelectedParent(null);
        }}
        initialData={selectedParent}
        onSave={(Parent) => {
          setParentList((prev) =>
            selectedParent
              ? prev.map((p) => (p.id === Parent.id ? Parent : p))
              : [...prev, Parent],
          );
        }}
      />
    </div>
  );
}
