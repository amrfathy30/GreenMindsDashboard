/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { EditIcon, RemoveIcon } from "../../../icons";
import { toast } from "sonner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Pagination from "../../../components/common/Pagination";
import ChildrenModal from "./ChildrenModal";
import { useLanguage } from "../../../locales/LanguageContext";
import {
  allChildrenData,
  createChildren,
  deleteChildren,
  updateChildren,
} from "../../../api/services/childrenService";
import {
  ChildrenApiResponse,
  Children,
} from "../../../utils/types/childrenType";
import { ShowToastSuccess } from "../../../components/common/ToastHelper";
import { TableLoading } from "../../../components/loading/TableLoading";
import { Link } from "react-router";
import { EyeIcon } from "lucide-react";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../utils/permissions/permissions";
import EmptyState from "../../../components/common/no-data-found";

export default function ChildrenList({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal?: boolean;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const { t } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Children | null>(null);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canView = hasPermission("Children_GetChildren");
  const canEdit = hasPermission("Children_UpdateChild");
  const canDelete = hasPermission("Children_DeleteChild");
  const canShow = hasPermission("Children_GetChild");

  useEffect(() => {
    if (openAddModal) {
      setEditData(null);
      setOpenModal(true);
      setOpenAddModal?.(false);
    }
  }, [openAddModal, setOpenAddModal]);

  const [childrenList, setChildrenList] = useState<Children[]>([]);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        if (!canView) {
          setTableLoading(false);
          return;
        }
        setTableLoading(true);
        const data: ChildrenApiResponse = await allChildrenData({
          page: currentPage,
          pageSize: pageSize,
        });

        setChildrenList(
          data.Data.Items.map((item) => ({
            id: item.Id,
            Name: item.Name,
            Email: item.Email,
            UserName: item.UserName,
            Password: item.Password,
            GenderId: item.GenderId,
            ConfirmPassword: item.ConfirmPassword,
            ParentPhoneNumber: item.ParentPhoneNumber,
            Phone: item.Phone,
            DateOfBirth: item.DateOfBirth,
            EmailVerified: item.EmailVerified,
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
  }, [currentPage, pageSize, t]);

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = (id: number) => {
    setSelectedDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeleteLoading(true);
      const res = await deleteChildren(selectedDeleteId);

      ShowToastSuccess(res?.Message || t("ChildDeletedSuccessfully"));

      setChildrenList((prev) => prev.filter((a) => a.id !== selectedDeleteId));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.Message || t("failed_delete_children"),
      );
    } finally {
      setDeleteLoading(false);
      setOpenConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const handleSave = async (data: Children) => {
    try {
      if (
        !data.Name?.trim() ||
        !data.UserName?.trim() ||
        !data.Email ||
        !data.DateOfBirth ||
        !data.ParentPhoneNumber
      ) {
        toast.error(t("all_fields_required"));
        return;
      }

      if (new Date(data.DateOfBirth) > new Date()) {
        toast.error(t("InvalidDateOfBirth"));
        return;
      }

      if (data.Password !== data.ConfirmPassword) {
        toast.error(t("PasswordNotMatch"));
        return;
      }

      setModalLoading(true);

      let res;
      if (editData) {
        res = await updateChildren(data, editData.id!);
      } else {
        res = await createChildren({ ...data });
      }

      const listRes: ChildrenApiResponse = await allChildrenData({
        page: currentPage,
        pageSize: 10,
      });

      setChildrenList(
        listRes.Data.Items.map((item) => ({
          id: item.Id,
          Name: item.Name || "",
          UserName: item.UserName || "",
          Email: item.Email,
          DateOfBirth: item.DateOfBirth,
          Password: item.Password,
          GenderId: item.GenderId,
          ConfirmPassword: item.ConfirmPassword,
          ParentPhoneNumber: item.Phone || "",
          Phone: item.Phone || "",
        })),
      );

      ShowToastSuccess(
        res?.Message || (editData ? t("success_update") : t("success_create")),
      );
      setOpenModal(false);
      setEditData(null);
    } catch (error: any) {
      const errData = error?.response?.data;

      if (Array.isArray(errData?.Data)) {
        toast.error(errData.Data.join("\n"));
      } else if (errData?.Data && typeof errData.Data === "object") {
        const messages: string[] = [];

        for (const key in errData.Data) {
          if (Array.isArray(errData.Data[key])) {
            messages.push(...errData.Data[key]);
          }
        }

        toast.error(messages.join("\n"));
      } else {
        toast.error(errData?.Message || t("operation_failed"));
      }
    } finally {
      setModalLoading(false);
    }
  };

  const columns = [
    {
      key: "Name",
      label: t("Name"),
    },
    {
      key: "UserName",
      label: t("UserName"),
      render: (row: any) => <span>{row.UserName || "__"}</span>,
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <span>{row.Email || "__"}</span>
          <span
            className={`text-sm ${
              row.EmailVerified ? "text-[#25B16F]" : "text-[#E51C1C]"
            }`}
          >
            {row.EmailVerified ? t("Verified") : t("NotVerified")}
          </span>
        </div>
      ),
    },

    {
      key: "Phone",
      label: t("ParentPhone"),
      render: (row: any) => <span>{row.Phone || "__"}</span>,
    },
    // {
    //   key: "DateOfBirth",
    //   label: t("DateOfBirth"),
    //   render: (row: any) => <span>{row.DateOfBirth || "__"}</span>,
    // },
    {
      key: "actions",
      label: t("Actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {canShow && (
            <Link
              to={`/children-info/${row.id}`}
              className="mt-2"
              state={{ child: row }}
              onClick={(e) => e.stopPropagation()}
            >
              <button>
                <EyeIcon className="w-6 h-6 text-black/60 dark:text-[#999999]" />
              </button>
            </Link>
          )}
          {canEdit && (
            <button
              onClick={() => {
                setEditData({
                  id: row.id,
                  Name: row.Name || "",
                  Email: row.Email || "",
                  UserName: row.UserName || "",
                  Password: row.Password || "",
                  ConfirmPassword: row.ConfirmPassword || "",
                  ParentPhoneNumber: row.ParentPhoneNumber || "",
                  GenderId: row.GenderId || "male",
                  DateOfBirth: row.DateOfBirth || "",
                });
                setOpenModal(true);
              }}
            >
              <EditIcon className="w-6 h-6 invert-0 dark:invert" />
            </button>
          )}
          {canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id);
              }}
            >
              <RemoveIcon className="w-6 h-6 invert-0 dark:invert" />
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
    <div className="">
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
          <BasicTableOne data={childrenList} columns={columns} />
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
        title={t("DeleteChild")}
        description={t("AreYouSureDeleteChild")}
      />

      <ChildrenModal
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
