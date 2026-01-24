/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus } from "lucide-react";
import ProfileLevelModal from "./ProfileLevelsModal";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import AddButton from "../../../components/ui/button/AddButton";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { EditIcon, RemoveIcon } from "../../../icons";
import Pagination from "../../../components/common/Pagination";
type ProfileLevel = {
  id: number;
  levelNameAr: string;
  levelNameEn: string;
  from: string;
  to: string;
};

export default function ProfileLevels() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const [ProfileLevels, setProfileLevels] = useState<ProfileLevel[]>([
    {
      id: 1,
      levelNameAr: "مستوي 1",
      levelNameEn: "first Level",
      from: "2 pts",
      to: "4 pts",
    },
    {
      id: 2,
      levelNameAr: "مستوي 2",
      levelNameEn: "second Level",
      from: "5 pts",
      to: "7 pts",
    },
    {
      id: 3,
      levelNameAr: "مستوي 3",
      levelNameEn: "third Level",
      from: "8 pts",
      to: "10 pts",
    },
  ]);

  const [openModalAge, setOpenModalAge] = useState(false);
  const [editData, setEditData] = useState<{
    from: string;
    to: string;
    levelNameAr: string;
    levelNameEn: string;
  } | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setProfileLevels((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The Profile Levels has been deleted successfully");
    }
    setSelectedDeleteId(null);
  };

  const handleSave = (data: {
    levelNameAr: string;
    levelNameEn: string;
    from: string;
    to: string;
  }) => {
    if (editData) {
      setProfileLevels((prev) =>
        prev.map((item) =>
          item.from === editData.from && item.to === editData.to
            ? { ...item, ...data }
            : item,
        ),
      );
    } else {
      setProfileLevels((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          levelNameAr: data.levelNameAr,
          levelNameEn: data.levelNameEn,
          from: data.from,
          to: data.to,
        },
      ]);
    }

    setEditData(null);
  };

  const columns = [
    {
      key: "levelNameAr",
      label: "Level Name (Ar)",
    },
    {
      key: "levelNameEn",
      label: "Level Name (En)",
    },
    {
      key: "from",
      label: "Points from",
    },
    {
      key: "to",
      label: "Points to",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                from: row.from,
                to: row.to,
                levelNameAr: row.levelNameAr,
                levelNameEn: row.levelNameEn,
              });
              setOpenModalAge(true);
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
        title="Profile Levels | Green minds Admin Dashboard"
        description="Profile Levels | Green minds Admin Dashboard"
      />
      <div className="md:px-10">
        <h2 className="font-medium text-2xl p-4 text-[#000000]">
          Profile Levels
        </h2>
        <div className="flex justify-end my-4">
          <AddButton startIcon={<Plus />} onClick={() => setOpenModalAge(true)}>
            add Profile Levels
          </AddButton>
        </div>
        <BasicTableOne data={ProfileLevels} columns={columns} />
        <div className="my-6 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <ProfileLevelModal
        open={openModalAge}
        onClose={() => {
          setOpenModalAge(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
        onSave={handleSave}
      />

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Profile Levels"
        description="Are you sure you want to delete this Profile Levels?"
      />
    </div>
  );
}
