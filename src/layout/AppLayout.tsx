import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import AppHeaderMobile from "./AppHeaderMobile";

const LayoutContent: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      {/* <!-- Dark Mode Toggler --> */}
      <ThemeToggleButton />
      {/* <!-- Dark Mode Toggler --> */}
      {/* <NotificationDropdown /> */}
      <div>
        <div className="flex md:hidden">
          <AppHeaderMobile />
        </div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out 
    ${isExpanded ? "lg:ps-[320px]" : "lg:ps-[90px]"} 
    ${isMobileOpen ? "ps-0" : ""} overflow-x-auto`}
      >
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 min-h-screen">
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
