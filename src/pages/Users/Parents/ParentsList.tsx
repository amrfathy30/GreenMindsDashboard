/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import { Link } from "react-router";
import Pagination from "../../../components/common/Pagination";
import ParentModal from "./ParentModal";
import { useLanguage } from "../../../api/locales/LanguageContext";

export type Parents = {
  id: number;
  name_en: string;
  name_ar: string;
  status: string;
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
  const { t } = useLanguage();

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
      toast.success(
        t("ParentDeletedSuccessfully") ||
          "The parent has been deleted successfully",
      );
    }
    setSelectedDeleteId(null);
    setOpenConfirm(false);
  };

  const [parentList, setParentList] = useState<Parents[]>([
    {
      id: 1,
      name_ar: "احمد",
      name_en: "Ahmed",
      email: "mohamed@gmail.com",
      status: "verified",
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
      label: t("NameAr"),
    },
    {
      key: "name_en",
      label: t("NameEn"),
    },
    {
      key: "email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <span>{row.email}</span>
          <span
            className={`text-sm ${
              row.status === "verified" ? "text-[#25B16F]" : "text-[#E51C1C]"
            }`}
          >
            {row.status === "verified" ? t("Verified") : t("NotVerified")}
          </span>
        </div>
      ),
    },
    {
      key: "LastRegister",
      label: t("LastRegister"),
      render: (row: any) => (
        <span className="text-[#757575]">{row.LastRegister}</span>
      ),
    },
    {
      key: "Children",
      label: t("Children"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-1">
          {row.childrenList.map((item: { name: string }, index: number) => (
            <span key={index}>{item.name},</span>
          ))}
          ({row.childrenList.length})
        </div>
      ),
    },
    {
      key: "actions",
      label: t("Actions"),
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
          title: t("Children"),
          canExpand: (row) => row.childrenList?.length > 0,
          renderExpandedRows: (row) =>
            row.childrenList.map((child: any, index: number) => (
              <div key={index} className="justify-between items-center grid grid-cols-6">
                <span className="font-semibold">{child.name}</span>
                <span className="font-semibold text-center">{child.phone}</span>
                <span className="font-semibold text-center">{child.email}</span>
                <span className="font-semibold text-center">{child.points}</span>
                <span className="font-semibold text-center">{child.streaks}</span>
                <Link
                  to="/children-info"
                  className="text-[#25B16F] font-semibold hover:underline text-end"
                >
                  {t("SeeMore") || "See more"}
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
        title={t("DeleteParent")}
        description={t("AreYouSureDeleteParent")}
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
