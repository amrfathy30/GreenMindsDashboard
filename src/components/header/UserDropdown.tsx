import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import EditProfileModal from "../../pages/Setting/EditProfileModal";
export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);

  return (
    <div className="relative border-y w-full py-2 px-6">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400 w-full"
      >

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="mr-3 overflow-hidden rounded-full h-11 w-11">
              <img src="/images/user/owner.jpg" alt="User" />
            </div>
            <div className="flex flex-col items-start">
              <span className="block mr-1 font-medium text-theme-sm">User</span>
              <span className="block mr-1 font-medium text-theme-sm">user@greenMind.com</span>
            </div>
          </div>

          <svg width="19" height="4" viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.8125 1.875C2.8125 2.12364 2.71373 2.3621 2.53791 2.53791C2.3621 2.71373 2.12364 2.8125 1.875 2.8125C1.62636 2.8125 1.3879 2.71373 1.21209 2.53791C1.03627 2.3621 0.9375 2.12364 0.9375 1.875C0.9375 1.62636 1.03627 1.3879 1.21209 1.21209C1.3879 1.03627 1.62636 0.9375 1.875 0.9375C2.12364 0.9375 2.3621 1.03627 2.53791 1.21209C2.71373 1.3879 2.8125 1.62636 2.8125 1.875ZM10.3125 1.875C10.3125 2.12364 10.2137 2.3621 10.0379 2.53791C9.8621 2.71373 9.62364 2.8125 9.375 2.8125C9.12636 2.8125 8.8879 2.71373 8.71209 2.53791C8.53627 2.3621 8.4375 2.12364 8.4375 1.875C8.4375 1.62636 8.53627 1.3879 8.71209 1.21209C8.8879 1.03627 9.12636 0.9375 9.375 0.9375C9.62364 0.9375 9.8621 1.03627 10.0379 1.21209C10.2137 1.3879 10.3125 1.62636 10.3125 1.875ZM17.8125 1.875C17.8125 2.12364 17.7137 2.3621 17.5379 2.53791C17.3621 2.71373 17.1236 2.8125 16.875 2.8125C16.6264 2.8125 16.3879 2.71373 16.2121 2.53791C16.0363 2.3621 15.9375 2.12364 15.9375 1.875C15.9375 1.62636 16.0363 1.3879 16.2121 1.21209C16.3879 1.03627 16.6264 0.9375 16.875 0.9375C17.1236 0.9375 17.3621 1.03627 17.5379 1.21209C17.7137 1.3879 17.8125 1.62636 17.8125 1.875Z" stroke="#1FAE7F" stroke-opacity="0.5" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </div>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-[-50%] bottom-0 flex w-[160px] flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >

        <ul className="flex flex-col border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                setOpenModalEditProfile(true);
              }}
              tag="a"
              // to="/edit-profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg
                className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                  fill=""
                />
              </svg>
              Edit profile
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
      <EditProfileModal
        open={openModalEditProfile}
        onClose={() => setOpenModalEditProfile(false)}
      />
    </div>
  );
}
