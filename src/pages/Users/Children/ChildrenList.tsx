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
import { getTranslatedApiError } from "../../../utils/handleApiError";
// import { createUser } from "../../../api/services/adminService";

export default function ChildrenList({
  openAddModal,
  setOpenAddModal,
  search,
}: {
  openAddModal?: boolean;
  search: string;
  setOpenAddModal?: (open: boolean) => void;
}) {
  const { t } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(20);
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

  const canViewAction =
    hasPermission("Children_UpdateChild") ||
    hasPermission("Children_GetChild") ||
    hasPermission("Children_DeleteChild");

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
            PhoneNumber: item.PhoneNumber,
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
  }, [canView, currentPage, pageSize, t]);

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

  const handleSave = async (data: Children) => {
    try {
      const isEdit = !!editData?.id;
      if (
        !data.Name?.trim() ||
        !data.UserName?.trim() ||
        !data.DateOfBirth ||
        !data.PhoneNumber
      ) {
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

      if (new Date(data.DateOfBirth) > new Date()) {
        toast.error(t("InvalidDateOfBirth"));
        return;
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
          PhoneNumber: item.PhoneNumber || "",
          EmailVerified: item.EmailVerified,
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
        "Can Accept Letter Only": t("name_error_letters"),
      };

      const finalMsg = getTranslatedApiError(error, t, translations);
      toast.error(finalMsg);
    } finally {
      setModalLoading(false);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "__";

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getGenderLabel = (genderId: string | number, t: any) => {
    if (String(genderId) === "1") return t("Male");
    if (String(genderId) === "2") return t("Female");
    return "__";
  };

  const columns: any[] = [
    {
      key: "Name",
      label: t("Name"),
      render: (row: any) => (
        <span className="block max-w-25 truncate dark:text-white">
          {row.Name || "__"}
        </span>
      ),
    },
    {
      key: "UserName",
      label: t("UserName"),
      render: (row: any) => (
        <span className="block max-w-25 truncate dark:text-white">
          {row.UserName || "__"}
        </span>
      ),
    },
    {
      key: "Email",
      label: t("email"),
      render: (row: any) => (
        <div className="flex items-center gap-2 dark:text-white">
          <span>{row.Email || "__"}</span>
        </div>
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
      key: "PhoneNumber",
      label: t("ParentPhone"),
      render: (row: any) => (
        <span className=" dark:text-white">{row.PhoneNumber || "__"}</span>
      ),
    },
    {
      key: "Gender",
      label: t("Gender"),
      render: (row: any) => (
        <span className=" dark:text-white">
          {getGenderLabel(row.GenderId, t)}
        </span>
      ),
    },
    {
      key: "Age",
      label: t("Age"),
      render: (row: any) => (
        <span className=" text-sm flex gap-1 items-center dark:text-white text-center">
          {calculateAge(row.DateOfBirth)} <span>{t("years")}</span>
        </span>
      ),
    },
  ];

  const filteredParents = childrenList.filter((item) => {
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
        <div className="flex justify-center items-center gap-2">
          {canShow && (
            <Link
              to={`/children-info/${row.id}`}
              className="mt-2"
              state={{ child: row }}
              onClick={(e) => e.stopPropagation()}
            >
              <button>
                <EyeIcon className="w-5 h-5 text-black/60 dark:text-[#999999]" />
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
                  PhoneNumber: row.PhoneNumber || "",
                  GenderId: row.GenderId || "male",
                  DateOfBirth: row.DateOfBirth || "",
                });
                setOpenModal(true);
              }}
            >
              <EditIcon className="w-5 h-5  invert-0 dark:invert" />
            </button>
          )}
          {canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id);
              }}
            >
              <RemoveIcon className="w-5 h-5  invert-0 dark:invert" />
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
    <div className="">
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
          <BasicTableOne data={filteredParents} columns={columns} />
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
