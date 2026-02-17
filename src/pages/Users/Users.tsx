import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AdminsList from "./Admins/AdminsList";
import ParentsList from "./Parents/ParentsList";
import ChildrenList from "./Children/ChildrenList";
import { useLanguage } from "../../locales/LanguageContext";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../utils/permissions/permissions";
import PageMeta from "../../components/common/PageMeta";
import { useSearchParams } from "react-router";

export default function Users() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const [openAddAdminModal, setOpenAddAdminModal] = useState(false);
  const [openAddParentModal, setOpenAddParentModal] = useState(false);
  const [openAddChildModal, setOpenAddChildModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab =
    (searchParams.get("tab") as "admin" | "parent" | "child") || "admin";

  const tabContent = {
    admin: (
      <AdminsList
        openAddModal={openAddAdminModal}
        setOpenAddModal={setOpenAddAdminModal}
        search={search}
      />
    ),
    parent: (
      <ParentsList
        openAddModal={openAddParentModal}
        setOpenAddModal={setOpenAddParentModal}
        search={search}
      />
    ),
    child: (
      <ChildrenList
        openAddModal={openAddChildModal}
        setOpenAddModal={setOpenAddChildModal}
        search={search}
      />
    ),
  };
  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canAdd = {
    admin: hasPermission("Account_CreateUserWithType"),
    parent:
      hasPermission("Parents_CreateUserWithType") ||
      hasPermission("Parents_CreateParent"),

    child: hasPermission("Children_CreateChild"),
  };

  const addButtonText = {
    admin: t("addAdmin"),
    parent: t("addParent"),
    child: t("addChild"),
  };

  const handleAdd = () => {
    if (currentTab === "admin") setOpenAddAdminModal(true);
    else if (currentTab === "parent") setOpenAddParentModal(true);
    else if (currentTab === "child") setOpenAddChildModal(true);
  };

  const canViewTab = {
    admin: hasPermission("Account_GetAdmins"),
    parent: hasPermission("Parents_GetParents"),
    child: hasPermission("Children_GetChildren"),
  };

  return (
    <div>
      <PageMeta title="Green minds Admin | Users" description={``} />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800  dark:bg-neutral-800 bg-[#EDEDED] min-h-[calc(100vh-48px)]">
        <div className="h-17.5 mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("pageTitle")}
          </h2>
        </div>
        <div className="h-[80%] px-5">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8 ">
            <div className="flex items-center gap-4">
              {canViewTab.admin && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    currentTab === "admin"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setSearchParams({ tab: "admin" })}
                >
                  {t("adminsTab")}
                </button>
              )}
              {canViewTab.parent && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    currentTab === "parent"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setSearchParams({ tab: "parent" })}
                >
                  {t("parentsTab")}
                </button>
              )}
              {canViewTab.child && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    currentTab === "child"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setSearchParams({ tab: "child" })}
                >
                  {t("childrenTab")}
                </button>
              )}
            </div>

            <div className="flex items-center flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-[#2f3131] text-black dark:text-white outline-none"
              />

              {canAdd[currentTab] && (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 border border-secondary text-secondary px-4 py-2 rounded-lg font-medium text-base hover:bg-secondary hover:text-white transition duration-200"
                >
                  <Plus className="w-5 h-5" />
                  {addButtonText[currentTab]}
                </button>
              )}
            </div>
          </div>

          <div>{tabContent[currentTab as "admin" | "parent" | "child"]}</div>
        </div>
      </div>
    </div>
  );
}
