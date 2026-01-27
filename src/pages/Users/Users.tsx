import { useState } from "react";
import { Plus } from "lucide-react";
import AdminsList from "./Admins/AdminsList";
import ParentsList from "./Parents/ParentsList";
import ChildrenList from "./Children/ChildrenList";
import { useLanguage } from "../../locales/LanguageContext";

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

  return (
    <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
      <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("pageTitle")}
        </h2>
      </div>
      <div className="h-[80%] px-5">
        <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8 ">
          <div className="flex items-center gap-4">
            <button
              className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
                activeTab === "tab1"
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
              }`}
              onClick={() => setActiveTab("tab1")}
            >
              {t("adminsTab")}
            </button>
            <button
              className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
                activeTab === "tab2"
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
              }`}
              onClick={() => setActiveTab("tab2")}
            >
              {t("parentsTab")}
            </button>
            <button
              className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
                activeTab === "tab3"
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
              }`}
              onClick={() => setActiveTab("tab3")}
            >
              {t("childrenTab")}
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 border border-[#25B16F] text-[#25B16F] px-4 py-2 rounded-lg font-medium hover:bg-[#25B16F] hover:text-white transition duration-200"
          >
            <Plus />
            {addButtonText[activeTab]}
          </button>
        </div>

        <div>{tabContent[activeTab]}</div>
      </div>
    </div>
  );
}
