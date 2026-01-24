import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";

import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import { useLanguage } from "../api/locales/LanguageContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
       {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggleButton />
            {/* <!-- Dark Mode Toggler --> */}
            {/* <NotificationDropdown /> */}
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? "lg:ms-[320px]" : "lg:ms-[90px]"
        } ${isMobileOpen ? "ms-0" : ""}
        `}
      >

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
