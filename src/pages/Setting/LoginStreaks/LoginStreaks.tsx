/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import AddButton from "../../../components/ui/button/AddButton";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { EditIcon, RemoveIcon } from "../../../icons";
import LoginStreaksModal from "./LoginStreaksModal";
import Pagination from "../../../components/common/Pagination";

type LoginStreaks = {
  id: number;
  points: string;
  day: string;
};

export default function LoginStreaks() {
  const [LoginStreaks, setLoginStreaks] = useState<LoginStreaks[]>([
    { id: 1, points: "3 pts", day: "day 1" },
    { id: 2, points: "5 pts", day: "day 2" },
    { id: 3, points: "1 pts", day: "day 3" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<{
    day: string;
    points: string;
  } | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setLoginStreaks((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The Login Streaks has been deleted successfully");
    }
    setSelectedDeleteId(null);
  };

  const handleSave = (data: { points: string; day: string }) => {
    if (editData) {
      setLoginStreaks((prev) =>
        prev.map((item) =>
          item.day === editData.day && item.points === editData.points
            ? { ...item, ...data }
            : item,
        ),
      );
    } else {
      setLoginStreaks((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          points: data.points,
          day: data.day,
        },
      ]);
    }

    setEditData(null);
  };

  const columns = [
    {
      key: "day",
      label: "Days",
    },
    {
      key: "points",
      label: "Points",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                day: row.day,
                points: row.points,
              });
              setOpenModal(true);
            }}
          >
            <EditIcon className="w-8 h-8" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <RemoveIcon className="w-8 h-8" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageMeta
        title="Login Streaks | Green minds Admin Dashboard"
        description="Login Streaks | Green minds Admin Dashboard"
      />
      <div className="md:px-10">
        <h2 className="font-medium text-2xl p-4 text-[#000000]">
          Login Streaks
        </h2>
        <div className="flex justify-end my-4">
          <AddButton startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            add Login Streaks
          </AddButton>
        </div>
        <BasicTableOne data={LoginStreaks} columns={columns} />
        <div className="my-6 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <LoginStreaksModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
        onSave={handleSave}
      />

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Login Streaks"
        description="Are you sure you want to delete this Login Streaks?"
      />
    </div>
  );
}
