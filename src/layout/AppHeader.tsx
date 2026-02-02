import { useSidebar } from "../context/SidebarContext";
import UserDropdown from "../components/header/UserDropdown";
import { useLanguage } from "../locales/LanguageContext";

const AppHeader: React.FC = () => {
  // const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isMobileOpen, isExpanded, toggleSidebar, toggleMobileSidebar } =
    useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("GMadminData");
    localStorage.removeItem("GMadminPermissions");
    localStorage.removeItem("GMadminToken");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 flex flex-col w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-[#1e1e1e] lg:border-b">
      <div className="flex flex-col items-center justify-between ">
        <div
          className={`flex-col items-center justify-between w-full gap-4 md:gap-0 px-5 py-4 md:py-0 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <UserDropdown />

          <div className="flex w-full  items-center justify-between gap-2 2xsm:gap-3 px-0 md:px-6 py-4">
            <a
              className="flex gap-2 items-center text-[#6B6B6B] hover:text-red-500 dark:text-white cursor-pointer"
              onClick={() => handleLogOut()}
            >
              <svg width="24" height="24" viewBox="0 0 29 29" fill="none">
                <path
                  d="M8.31847 18.8291L9.93832 17.1824L8.05636 15.3311L17.6227 15.2524L17.6035 12.9192L8.03717 12.9979L9.88843 11.1159L8.24172 9.49605L3.61358 14.2009L8.31847 18.8291ZM22.3468 22.2138L14.1804 22.281L14.1996 24.6142L22.366 24.5471C23.6493 24.5365 24.6906 23.4779 24.68 22.1946L24.5457 5.86186C24.5352 4.57857 23.4766 3.53724 22.1933 3.54779L14.0269 3.61495L14.0461 5.9482L22.2125 5.88105L22.3468 22.2138Z"
                  fill="currentColor"
                />
              </svg>

              {isExpanded || isMobileOpen ? (
                <span className="dark:text-white ">{t("Logout")}</span>
              ) : (
                ""
              )}
            </a>
            <button
              className="items-center p-1 justify-center w-6 h-6 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-8 lg:w-8 lg:border"
              onClick={handleToggle}
              aria-label="Toggle Sidebar"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
