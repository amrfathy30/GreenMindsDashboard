/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import AddButton from "../../components/ui/button/AddButton";
import { Plus } from "lucide-react";
import AgeGroupModal from "./AgeGroupModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "sonner";
import PageMeta from "../../components/common/PageMeta";

export default function AgeGroup() {
  const [ageGroups, setAgeGroups] = useState([
    { id: 1, from: "2", to: "4" },
    { id: 2, from: "5", to: "7" },
    { id: 3, from: "8", to: "10" },
  ]);

  const [openModalAge, setOpenModalAge] = useState(false);
  const [editData, setEditData] = useState<{ from: string; to: string } | null>(
    null,
  );

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setAgeGroups((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success("The age group has been deleted successfully");
    }
    setSelectedDeleteId(null);
  };

  const handleSave = (data: { from: string; to: string }) => {
    if (editData) {
      setAgeGroups((prev) =>
        prev.map((item) =>
          item.from === editData.from && item.to === editData.to
            ? { ...item, ...data }
            : item,
        ),
      );
    } else {
      setAgeGroups((prev) => [...prev, { id: prev.length + 1, ...data }]);
    }
    setEditData(null);
  };

  const columns = [
    {
      key: "ageGroups",
      label: "Age groups",
      render: (row: any) => `From ${row.from} : ${row.to}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({ from: row.from, to: row.to });
              setOpenModalAge(true);
            }}
          >
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
      <PageMeta
        title="Age Group | Green minds Admin Dashboard"
        description="Age Group | Green minds Admin Dashboard"
      />
      <div className="md:px-10">
        <h2 className="font-medium text-2xl p-4 text-[#000000]">Age Group</h2>
        <div className="flex justify-end my-4">
          <AddButton startIcon={<Plus />} onClick={() => setOpenModalAge(true)}>
            add age group
          </AddButton>
        </div>
        <BasicTableOne data={ageGroups} columns={columns} />
      </div>

      <AgeGroupModal
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
        title="Delete Age Group"
        description="Are you sure you want to delete this age group?"
      />
    </div>
  );
}
