/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { toast } from "sonner";
import { EditIcon, RemoveIcon } from "../../../icons";
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
  createParent,
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
import { getTranslatedApiError } from "../../../utils/handleApiError";

export default function ParentsList({
  openAddModal,
  setOpenAddModal,
  search,
}: {
  openAddModal?: boolean;
  search: string;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(20);
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

  const canViewAction =
    hasPermission("Parents_UpdateParent") ||
    hasPermission("Parents_DeleteParent");

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

  const isValidPhone = (phone?: string) => {
    if (!phone) return false;
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length > 4;
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSave = async (data: ParentFormData) => {
    try {
      const isEdit = !!editData?.id;
      if (!data.UserName?.trim() || !data.Name?.trim()) {
        toast.error(t("all_fields_required"));
        return;
      }

      if (!isEdit) {
        if (!data.Email?.trim()) {
          toast.error(t("email_required"));
          return;
        }

        if (!validateEmail(data.Email)) {
          toast.error(t("PleaseEnterAValidEmail"));
          return;
        }
      }

      if (!isValidPhone(data.PhoneNumber)) {
        toast.error(t("please_enter_valid_phone"));
        return;
      }

      const MIN_PASSWORD_LENGTH = 8;
      const MAX_PASSWORD_LENGTH = 15;

      if (!editData?.id && data.Password) {
        if (
          data.Password.length < MIN_PASSWORD_LENGTH ||
          data.Password.length > MAX_PASSWORD_LENGTH
        ) {
          toast.error(t("PasswordBetween"));
          return;
        }

        if (data.Password !== data.ConfirmPassword) {
          toast.error(t("PasswordNotMatch"));
          return;
        }
      }

      setModalLoading(true);

      let res;
      if (editData?.id) {
        res = await updateParent(data, editData.id);
      } else {
        res = await createParent(data);
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
      const translations: Record<string, string> = {
        "Password Should contain one at least of (a capital letter, small letter, symbol, and number)":
          t("PasswordContain"),
        "Name contains invalid characters. Only letters and spaces are allowed":
          t("name_error_letters"),
        "Another user with the same username already exists": t("sameUsername"),
        "Username already exists": t("sameUsername"),
        "Email already exists": t("sameEmail"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setModalLoading(false);
    }
  };

  const columns: any[] = [
    {
      key: "Name",
      label: t("Name"),
      render: (row: any) => (
        <span className=" dark:text-white block max-w-30 truncate">
          {row.Name || "__"}
        </span>
      ),
    },
    {
      key: "UserName",
      label: t("UserName"),
      render: (row: any) => (
        <span className="dark:text-white block max-w-30 truncate">
          {row.UserName || "__"}
        </span>
      ),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <span className="dark:text-white block max-w-50 truncate">
          {row.Email || "__"}
        </span>
      ),
    },
    {
      key: "Status",
      label: <span className="whitespace-nowrap"></span>,
      render: (row: any) => (
        <span
          className={`text-sm font-medium whitespace-nowrap ${
            row.EmailVerified ? "text-secondary" : "text-[#E51C1C]"
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
        <span className=" dark:text-white block">
          {row.PhoneNumber || "__"}
        </span>
      ),
    },
  ];

  const filteredParents = parentList.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.Name?.toLowerCase().includes(q) ||
      item.Email?.toLowerCase().includes(q) ||
      item.UserName?.toLowerCase().includes(q) ||
      item.PhoneNumber?.toLowerCase().includes(q)
    );
  });

  if (canViewAction) {
    columns.push({
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
    });
  }

  if (!canView && !tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
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
            data={filteredParents}
            columns={columns}
            // expandable={{
            //   title: t("Children"),
            //   canExpand: (row) => row.childrenList?.length > 0,
            //   renderExpandedRows: (row) =>
            //     row.childrenList.map((child: any, index: number) => (
            //       <div
            //         key={index}
            //         className="justify-between items-center grid grid-cols-6"
            //       >
            //         <span className="font-semibold">{child.name}</span>
            //         <span className="font-semibold text-center">
            //           {child.phone}
            //         </span>
            //         <span className="font-semibold text-center">
            //           {child.email}
            //         </span>
            //         <span className="font-semibold text-center">
            //           {child.points}
            //         </span>
            //         <span className="font-semibold text-center">
            //           {child.streaks}
            //         </span>
            //         <Link
            //           to="/children-info"
            //           className="text-secondary font-semibold hover:underline text-end"
            //         >
            //           {t("SeeMore") || "See more"}
            //         </Link>
            //       </div>
            //     )),
            // }}
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
