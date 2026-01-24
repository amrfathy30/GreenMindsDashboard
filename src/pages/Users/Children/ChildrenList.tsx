/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { EditIcon, RemoveIcon } from "../../../icons";
import { toast } from "sonner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Pagination from "../../../components/common/Pagination";
import ChildrenModal from "./ChildrenModal";
import { useLanguage } from "../../../api/locales/LanguageContext";

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
  const { t } = useLanguage();

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
  ]);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedDeleteId !== null) {
      setChildrenList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
      toast.success(
        t("ChildDeletedSuccessfully") ||
          "The child has been deleted successfully",
      );
    }
    setSelectedDeleteId(null);
    setOpenConfirm(false);
  };

  const columns = [
    {
      key: "name_en",
      label: t("NameEn"),
    },
    {
      key: "name_ar",
      label: t("NameAr"),
    },
    {
      key: "email",
      label: t("email"),
    },
    {
      key: "LastRegister",
      label: t("LastRegister"),
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "parent_phone",
      label: t("ParentPhone"),
    },
    {
      key: "actions",
      label: t("Actions"),
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
      <BasicTableOne data={childrenList} columns={columns} />
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
        title={t("DeleteChild")}
        description={t("AreYouSureDeleteChild")}
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
