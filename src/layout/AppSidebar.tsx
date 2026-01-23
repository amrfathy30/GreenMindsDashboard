import React, { useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router"; // Use Link for navigation
import { useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import { AnalyticsIcon, GameIcon, SettingsIcon, UserCircleIcon, VideoIcon } from "../icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <VideoIcon />,
    name: "Videos",
    path: "/videos",
  },
  {
    icon: <GameIcon />,
    name: "Games",
    path: "/games",
  },
  {
    icon: <AnalyticsIcon />,
    name: "Analytics",
    path: "/analytics",
  },
  {
    icon: <SettingsIcon/>,
    name: "Settings",
    path: "/setting",
  },
  {
    icon: <UserCircleIcon />,
    name: "Users",
    path: "/users",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut for search focus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-1 pl-5">
      {items.map((nav) => (
        <li key={nav.name} className="h-[50px]">
          {/* Changed from button to Link for reliable routing */}
          <Link
            to={nav.path}
            className={`menu-item group h-full ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
          >
            <span
              className={`menu-item-icon-size ${isActive(nav.path)
                  ? "text-white dark:text-black"
                  : "text-black dark:text-white"
                }`}
            >
              {nav.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text ">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col justify-between lg:mt-0 top-0  left-0 bg-white dark:bg-[#1e1e1e] dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 shadow-xl
        ${isExpanded || isMobileOpen ? "w-[320px]" :  "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <div
          className={`pt-8 flex flex-col ${!isExpanded && !isHovered ? "lg:justify-center" : "items-center justify-center"
            }`}
        >
          <Link to="/">
            {isExpanded || isHovered || isMobileOpen ? (
              <img
                src="/images/logo/Greenmindslogo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            ) : (
              <img
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            )}
          </Link>

          {/* Pass the ref correctly as a prop */}
          <SearchSection inputRef={inputRef} />
        </div>

        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>{renderMenuItems(navItems)}</div>
            </div>
          </nav>
        </div>
      </div>

      <AppHeader />
    </aside>
  );
};

// Fixed SearchSection: Destructured { inputRef } from props
const SearchSection = ({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className="hidden lg:block mt-8 mb-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-[#1e1e1e] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
      </form>
    </div>
  );
};

export default AppSidebar;