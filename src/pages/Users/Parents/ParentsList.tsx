/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
import { Link } from "react-router";
import Pagination from "../../../components/common/Pagination";
import ParentModal from "./ParentModal";
import { useLanguage } from "../../../locales/LanguageContext";
import { ParentApiResponse, ParentList } from "../../../utils/types/parentType";
import {
  allParentData,
  createParent,
  deleteParent,
  updateParent,
} from "../../../api/services/parentService";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import { TableLoading } from "../../../components/loading/TableLoading";

export default function ParentsList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<ParentList | null>(null);

  useEffect(() => {
    if (openAddModal) {
      setEditData(null);
      setOpenModal(true);
      setOpenAddModal?.(false);
    }
  }, [openAddModal, setOpenAddModal]);

  const { t } = useLanguage();

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const [parentList, setParentList] = useState<any[]>([]);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        setTableLoading(true);
        const data: ParentApiResponse = await allParentData({
          page: currentPage,
          pageSize: 10,
        });

        setParentList(
          data.Data.Items.map((item) => ({
            id: item.Id,
            Name: item.Name,
            UserName: item.UserName,
            Email: item.Email,
            Password: item.Password,
            ConfirmPassword: item.ConfirmPassword,
            ParentPhoneNumber: item.ParentPhoneNumber,
            GenderId: item.GenderId,
            DateOfBirth: item.DateOfBirth,
          })),
        );
        setTotalPages(Math.ceil(data.Data.Total / data.Data.PageSize));
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("operation_failed"));
      } finally {
        setTableLoading(false);
      }
    };

    fetchParent();
  }, [currentPage, t]);

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeleteLoading(true);
      const res = await deleteParent(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("ParentDeletedSuccessfully"));

      setParentList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete_parent"));
    } finally {
      setDeleteLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: ParentList) => {
    try {
      if (
        !data.UserName?.trim() ||
        !data.Name?.trim() ||
        data.Email === "" ||
        data.Password === "" ||
        data.ConfirmPassword === "" ||
        data.ParentPhoneNumber === ""
      ) {
        toast.error(t("all_fields_required"));
        return;
      }

      setModalLoading(true);

      let res;
      if (editData) {
        res = await updateParent(data, editData.Id!);
      } else {
        res = await createParent({ ...data });
      }

      const listRes: ParentApiResponse = await allParentData({
        page: currentPage,
        pageSize: 10,
      });

      setParentList(
        listRes.Data.Items.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          UserName: item.UserName || "",
          Email: item.Email,
          Password: item.Password,
          ConfirmPassword: item.ConfirmPassword,
          ParentPhoneNumber: item.ParentPhoneNumber,
          Phone: item.Phone || item.ParentPhoneNumber,
          GenderId: item.Phone || item.GenderId,
          DateOfBirth: item.Phone || item.DateOfBirth,
        })),
      );

      ShowToastSuccess(
        res?.Message || (editData ? t("success_update") : t("success_create")),
      );
      setOpenModal(false);
      setEditData(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("operation_failed"));
    } finally {
      setModalLoading(false);
    }
  };

  const columns = [
    {
      key: "Name",
      label: t("Name"),
      render: (row: any) => (
        <span className="text-[#757575] ">{row.Name || "__"}</span>
      ),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <span>{row.Email}</span>
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
      key: "Phone",
      label: t("ParentPhone"),
      render: (row: any) => (
        <span className="text-[#757575] flex justify-center items-center">
          {row.Phone || "__"}
        </span>
      ),
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              setEditData({
                Id: row.id,
                Name: row.Name,
                UserName: row.UserName,
                Email: row.Email,
                Password: row.Password,
                ConfirmPassword: row.ConfirmPassword,
                ParentPhoneNumber: row.ParentPhoneNumber,
                GenderId: row.GenderId,
                DateOfBirth: row.DateOfBirth,
              });
              setOpenModal(true);
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
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <BasicTableOne
          data={parentList}
          columns={columns}
          expandable={{
            title: t("Children"),
            canExpand: (row) => row.childrenList?.length > 0,
            renderExpandedRows: (row) =>
              row.childrenList.map((child: any, index: number) => (
                <div
                  key={index}
                  className="justify-between items-center grid grid-cols-6"
                >
                  <span className="font-semibold">{child.name}</span>
                  <span className="font-semibold text-center">
                    {child.phone}
                  </span>
                  <span className="font-semibold text-center">
                    {child.email}
                  </span>
                  <span className="font-semibold text-center">
                    {child.points}
                  </span>
                  <span className="font-semibold text-center">
                    {child.streaks}
                  </span>
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
      )}
      <div className="my-6 w-full flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <ConfirmModal
        open={openConfirm}
        loading={deleteLoading}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title={t("DeleteParent")}
        description={t("AreYouSureDeleteParent")}
      />

      <ParentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
        onSave={handleSave}
        loading={modalLoading}
      />
    </div>
  );
}
