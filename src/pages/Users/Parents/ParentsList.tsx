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
import {
  ParentApiResponse,
  ParentFormData,
  ParentList,
} from "../../../utils/types/parentType";
import {
  allParentData,
  createUserParent,
  deleteParent,
  updateParent,
} from "../../../api/services/parentService";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import { TableLoading } from "../../../components/loading/TableLoading";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";


export default function ParentsList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<ParentList | null>(null);
  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canView = hasPermission("Parents_GetParents");
  const canEdit = hasPermission("Parents_UpdateParent");
  const canDelete = hasPermission("Parents_DeleteParent");

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
      if (!canView) {
        setTableLoading(false);
        return;
      }
      try {
        setTableLoading(true);
        const data: ParentApiResponse = await allParentData({
          page: currentPage,
          pageSize: pageSize,
        });

        setParentList(
          data.Data.Items.map((item) => ({
            id: item.Id,
            Name: item.Name,
            UserName: item.UserName,
            Email: item.Email,
            EmailVerified: item.EmailVerified,
            Password: item.Password,
            ConfirmPassword: item.ConfirmPassword,
            PhoneNumber: item.PhoneNumber,
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
  }, [canView, currentPage, pageSize, t]);

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeleteLoading(true);
      const res = await deleteParent(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("ParentDeletedSuccessfully"));

      setParentList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(error?.response?.data?.Message || t("failed_delete"));
    } finally {
      setDeleteLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: ParentFormData) => {
    try {
      if (!data.UserName?.trim() || !data.Name?.trim() || data.Email === "") {
        toast.error(t("all_fields_required"));
        return;
      }

      setModalLoading(true);

      let res;
      if (editData?.id) {
        res = await updateParent(data, editData.id);
      } else {
        res = await createUserParent(data);
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
          Password: "",
          ConfirmPassword: "",
          EmailVerified: item.EmailVerified,
          PhoneNumber: item.PhoneNumber,
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
        <span className="text-[#757575] dark:text-white block max-w-[120px] truncate">
          {row.Name || "__"}
        </span>
      ),
    },
    {
      key: "UserName",
      label: t("UserName"),
      render: (row: any) => (
        <span className="text-[#757575] dark:text-white block max-w-[120px] truncate">
          {row.UserName || "__"}
        </span>
      ),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <span className="text-[#757575] dark:text-white block max-w-[200px] truncate">
          {row.Email || "__"}
        </span>
      ),
    },
    {
      key: "Status",
       label: <span className="whitespace-nowrap">{t("EmailStatus")}</span>, 
      render: (row: any) => (
        <span
          className={`text-sm font-medium whitespace-nowrap ${
            row.EmailVerified ? "text-[#25B16F]" : "text-[#E51C1C]"
          }`}
        >
          {row.EmailVerified ? t("Verified") : t("NotVerified")}
        </span>
      ),
    },
    {
      key: "Phone",
      label: t("ParentPhone"),
      render: (row: any) => (
        <span className="text-[#757575] dark:text-white block">
          {row.PhoneNumber || "__"}
        </span>
      ),
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row: any) => (
        <div className="flex items-center gap-3">
          {canEdit && (
            <button
              onClick={() => {
                setEditData({
                  id: row.id,
                  Name: row.Name ?? "",
                  Email: row.Email ?? "",
                  PhoneNumber: row.PhoneNumber ?? "",
                  UserName: row.UserName ?? "",
                  Password: "",
                  ConfirmPassword: "",
                  GenderId: row.GenderId ?? 1,
                  DateOfBirth: row.DateOfBirth ?? "1979-03-04",
                  Type: 2,
                });
                setOpenModal(true);
              }}
            >
              <EditIcon className="w-5 h-5 invert-0 dark:invert opacity-80 hover:opacity-100 transition-opacity" />
            </button>
          )}
          {canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id);
              }}
            >
              <RemoveIcon className="w-5 h-5 invert-0 dark:invert opacity-80 hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (!canView && !tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <div>
      {tableLoading ? (
        <TableLoading columnCount={6} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
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
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        open={openConfirm}
        loading={deleteLoading}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title={t("DeleteParent")}
        description={t("AreYouSureDeleteParent")}
      />

      <ParentModal
        key={editData?.id ?? "create"}
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
