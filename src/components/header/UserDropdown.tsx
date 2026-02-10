import { useEffect, useState } from "react";
import EditProfileModal from "../../pages/Profile/EditProfileModal";
import { useSidebar } from "../../context/SidebarContext";
import { useAdmin } from "../../context/AdminContext";
import { fetchUserPermissions } from "../../utils/permissions/permissions";
import { EditIcon } from "../../icons";
export default function UserDropdown() {
  const { isMobileOpen, isExpanded } = useSidebar();
  const { admin } = useAdmin();

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);

  return (
    <div className="relative border-y dark:border-gray-800 w-full py-2 px-0 md:px-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div
            className={`me-3 overflow-hidden rounded-full ${isExpanded ? "h-10 w-10" : "h-5 w-5"} invert-0 dark:invert`}
          >
            <img src="/images/user.png" alt="User" />
          </div>
          {isExpanded || isMobileOpen ? (
            <div className="flex flex-col items-start text-black dark:text-white">
              <span className="block me-1 font-medium text-theme-sm">
                {admin?.Name}
              </span>
              <span className="block me-1 font-medium text-theme-sm">
                {admin?.Email}
              </span>
            </div>
          ) : (
            ""
          )}{" "}
        </div>

        <button
          onClick={() => setOpenModalEditProfile(true)}
          className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400 h-10"
        >
          <EditIcon className="w-6 h-6" />
        </button>
      </div>

      <EditProfileModal
        open={openModalEditProfile}
        onClose={() => setOpenModalEditProfile(false)}
      />
    </div>
  );
}
