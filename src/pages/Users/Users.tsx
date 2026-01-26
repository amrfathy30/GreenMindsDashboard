import { JSX, useState } from "react";
import { Plus } from "lucide-react";
import AddAdminModal from "./Admins/AdminModal";
import AddParentModal from "./Parents/ParentModal";
import AdminsList from "./Admins/AdminsList";
import ParentsList from "./Parents/ParentsList";
import AddChildModal from "./Children/ChildrenModal";
import ChildrenList from "./Children/ChildrenList";
import { useLanguage } from "../../api/locales/LanguageContext";

export default function Users() {
  const { t } = useLanguage();

  const [openModalAdmin, setOpenModalAdmin] = useState(false);
  const [openModalParent, setOpenModalParent] = useState(false);
  const [openModalChild, setOpenModalChild] = useState(false);
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  const tabContent: Record<"tab1" | "tab2" | "tab3", JSX.Element> = {
    tab1: <AdminsList />,
    tab2: <ParentsList />,
    tab3: <ChildrenList />,
  };

  const addButtonText = {
    tab1: t("addAdmin"),
    tab2: t("addParent"),
    tab3: t("addChild"),
  };

  const handleAdd = () => {
    if (activeTab === "tab1") setOpenModalAdmin(true);
    else if (activeTab === "tab2") setOpenModalParent(true);
    else if (activeTab === "tab3") setOpenModalChild(true);
  };

  return (
    <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-[#adf4b514]  h-[calc(100vh-48px)] dark:bg-neutral-800">
      <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("pageTitle")}
        </h2>
      </div>
      <div className="h-[80%] px-5">
      <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8 ">
        <div className="flex items-center gap-4">
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${activeTab === "tab1"
                ? "bg-linear-to-r from-primary to-secondary text-white"
                : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
              }`}
            onClick={() => setActiveTab("tab1")}
          >
            {t("adminsTab")}
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${activeTab === "tab2"
                ? "bg-linear-to-r from-primary to-secondary text-white"
                : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800 border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
              }`}
            onClick={() => setActiveTab("tab2")}
          >
            {t("parentsTab")}
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${activeTab === "tab3"
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

      <AddAdminModal
        open={openModalAdmin}
        onClose={() => setOpenModalAdmin(false)}
        onSave={(data) => {
          console.log("Saved admin:", data);
        }}
      />

      <AddParentModal
        open={openModalParent}
        onClose={() => setOpenModalParent(false)}
        onSave={(data) => {
          console.log("Saved parent:", data);
        }}
      />
      <AddChildModal
        open={openModalChild}
        onClose={() => setOpenModalChild(false)}
        onSave={(data) => {
          console.log("Saved child:", data);
        }}
      />
    </div>
  );
}
