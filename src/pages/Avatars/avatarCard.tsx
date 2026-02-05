import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLanguage } from "../../locales/LanguageContext";

interface AvatarCardProps {
  image: string;
  name: string;
  ageGroup: string;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  image,
  name,
  ageGroup,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useLanguage();

  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  });

  return (
    <div className="relative flex rounded-2xl gap-4 border border-gray-200 bg-white p-4 shadow-lg transition-all hover:shadow-xl shadow-[#0FA5AA57] dark:border-gray-800 dark:bg-[#1e1e1e]">
      <div className="relative shrink-0 h-[90px] w-[90px]  overflow-hidden rounded-xl flex items-center justify-center border bg-gray-50 dark:bg-gray-700/30 dark:border-gray-700">
        <img
          src={image}
          className="h-full w-full rounded-xl object-cover "
          alt={name}
        />
      </div>

      <div className="space-y-2 flex flex-col justify-center items-start w-[calc(100%-123px)] flex-1">
        <div
          className="flex w-full items-center justify-between gap-2 relative"
          ref={menuRef}
        >
          <h3 className="text-md font-bold text-gray-900 dark:text-white truncate">
            {name || "Unnamed Avatar"}
          </h3>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            >
              <MoreVertical size={14} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 w-32 rounded-lg border border-gray-100 bg-white p-1 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                {canEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {t("edit")}
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    {t("delete")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {t("age_group_label")} :
            </span>
            <span className="font-semibold text-[#009DD1]">{ageGroup}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
