import { JSX, useState } from "react";
import { Plus } from "lucide-react";
import AddAdminModal from "./Admins/AddAdminModal";
import AddParentModal from "./Parents/AddParentModal";
import AdminsList from "./Admins/AdminsList";
import ParentsList from "./Parents/ParentsList";
import AddChildModal from "./Children/AddChildModal";
import ChildrenList from "./Children/ChildrenList";

export default function Users() {
  const [openModalAdmin, setOpenModalAdmin] = useState(false);
  const [openModalParent, setOpenModalParent] = useState(false);
  const [openModalChild, setOpenModalChild] = useState(false);

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  const tabContent: Record<"tab1" | "tab2" | "tab3", JSX.Element> = {
    tab1: <AdminsList />,
    tab2: <ParentsList />,
    tab3: <ChildrenList />,
  };

  const tabNames: Record<"tab1" | "tab2" | "tab3", string> = {
    tab1: "Admin",
    tab2: "Parent",
    tab3: "Children",
  };

  const handleAdd = () => {
    if (activeTab === "tab1") {
      setOpenModalAdmin(true);
    } else if (activeTab === "tab2") {
      setOpenModalParent(true);
    } else if (activeTab === "tab3") {
      setOpenModalChild(true);
    }
  };

  return (
    <div className="md:p-4">
      <h2 className="font-medium text-2xl mb-4 text-[#000000] dark:text-white">Users</h2>

      <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab1"
                ? "bg-[#25B16F] text-white "
                : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800  border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            Admins
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab2"
                ? "bg-[#25B16F] text-white"
                : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800  border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            Parent
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab3"
                ? "bg-[#25B16F] text-white"
                : "bg-[#FAFAFA] text-black dark:bg-[#2f3131] dark:text-white dark:border-gray-800  border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
            }`}
            onClick={() => setActiveTab("tab3")}
          >
            Children
          </button>
        </div>

        {tabNames[activeTab] && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 border border-[#25B16F] text-[#25B16F] px-4 py-2 rounded-lg font-medium hover:bg-[#25B16F] hover:text-white transition duration-200"
          >
            <Plus />
            Add {tabNames[activeTab]}
          </button>
        )}
      </div>

      <div>{tabContent[activeTab]}</div>

      <AddAdminModal
        open={openModalAdmin}
        onClose={() => setOpenModalAdmin(false)}
      />
      <AddParentModal
        open={openModalParent}
        onClose={() => setOpenModalParent(false)}
      />
      <AddChildModal
        open={openModalChild}
        onClose={() => setOpenModalChild(false)}
      />
    </div>
  );
}
