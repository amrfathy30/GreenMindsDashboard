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

export default function Users() {
  const { t } = useLanguage();

  const [openAddAdminModal, setOpenAddAdminModal] = useState(false);
  const [openAddParentModal, setOpenAddParentModal] = useState(false);
  const [openAddChildModal, setOpenAddChildModal] = useState(false);

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  const tabContent = {
    tab1: (
      <AdminsList
        openAddModal={openAddAdminModal}
        setOpenAddModal={setOpenAddAdminModal}
      />
    ),
    tab2: (
      <ParentsList
        openAddModal={openAddParentModal}
        setOpenAddModal={setOpenAddParentModal}
      />
    ),
    tab3: (
      <ChildrenList
        openAddModal={openAddChildModal}
        setOpenAddModal={setOpenAddChildModal}
      />
    ),
  };

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const canAdd = {
    tab1: hasPermission("Account_CreateUserWithType"),
    tab2:
      hasPermission("Parents_CreateUserWithType") ||
      hasPermission("Parents_CreateParent"),

    tab3: hasPermission("Children_CreateChild"),
  };

  const addButtonText = {
    tab1: t("addAdmin"),
    tab2: t("addParent"),
    tab3: t("addChild"),
  };

  const handleAdd = () => {
    if (activeTab === "tab1") setOpenAddAdminModal(true);
    else if (activeTab === "tab2") setOpenAddParentModal(true);
    else if (activeTab === "tab3") setOpenAddChildModal(true);
  };

  const canViewTab = {
    tab1: hasPermission("Account_GetAdmins"),
    tab2: hasPermission("Parents_GetParents"),
    tab3: hasPermission("Children_GetChildren"),
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
              {canViewTab.tab1 && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    activeTab === "tab1"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setActiveTab("tab1")}
                >
                  {t("adminsTab")}
                </button>
              )}
              {canViewTab.tab2 && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    activeTab === "tab2"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setActiveTab("tab2")}
                >
                  {t("parentsTab")}
                </button>
              )}
              {canViewTab.tab3 && (
                <button
                  className={`px-3 md:px-6 py-2 font-medium text-base rounded-xl ${
                    activeTab === "tab3"
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-secondary"
                  }`}
                  onClick={() => setActiveTab("tab3")}
                >
                  {t("childrenTab")}
                </button>
              )}
            </div>

            {canAdd[activeTab] && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 border border-secondary text-secondary px-4 py-2 rounded-lg font-medium text-base hover:bg-secondary hover:text-white transition duration-200"
              >
                <Plus className="w-5 h-5" />
                {addButtonText[activeTab]}
              </button>
            )}
          </div>

          <div>{tabContent[activeTab]}</div>
        </div>
      </div>
    </div>
  );
}
