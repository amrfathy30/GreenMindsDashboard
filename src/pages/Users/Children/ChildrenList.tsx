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
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Children | null>(null);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        setTableLoading(true);
        const data: ChildrenApiResponse = await allChildrenData({
          page: currentPage,
          pageSize: 10,
        });

        setChildrenList(
          data.Data.Items.map((item) => ({
            id: item.Id,
            Name: item.Name,
            Email: item.Email,
            Password: item.Password,
            GenderId: item.GenderId,
            ConfirmPassword: item.ConfirmPassword,
            ParentPhoneNumber: item.ParentPhoneNumber,
            Phone: item.Phone,
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
          Email: item.Email,
          DateOfBirth: item.DateOfBirth,
          Password: item.Password,
          GenderId: item.GenderId,
          ConfirmPassword: item.ConfirmPassword,
          ParentPhoneNumber: item.ParentPhoneNumber || item.Phone || "",
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
    },
    {
      key: "Email",
      label: t("email"),
    },
    {
      key: "Phone",
      label: t("ParentPhone"),
      render: (row: any) => <span>{row.Phone || "__"}</span>,
    },
    {
      key: "DateOfBirth",
      label: t("DateOfBirth"),
      render: (row: any) => <span>{row.DateOfBirth || "__"}</span>,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/children-info/${row.id}`}
            className="mt-2"
            state={{ child: row }}
            onClick={(e) => e.stopPropagation()}
          >
            <button>
              <EyeIcon className="w-7 h-7 text-black/60" />
            </button>
          </Link>
          <button
            onClick={() => {
              setEditData({
                id: row.id,
                Name: row.Name || "",
                Email: row.Email || "",
                Password: row.Password || "",
                ConfirmPassword: row.ConfirmPassword || "",
                ParentPhoneNumber: row.ParentPhoneNumber || "",
                GenderId: row.GenderId || "male",
                DateOfBirth: row.DateOfBirth || "",
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
    <div className="">
      {tableLoading ? (
        <TableLoading columnCount={5} />
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-200px)]">
          <BasicTableOne data={childrenList} columns={columns} />
          <div className="mt-auto my-6 w-full flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
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
