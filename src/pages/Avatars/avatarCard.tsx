import React, { useState } from "react";
import { MoreVertical } from "lucide-react"; 
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLanguage } from "../../locales/LanguageContext";

interface AvatarCardProps {
  image: string;
  name: string;
  level: string;
  ageGroup: string;
  onEdit: () => void;
  onDelete: () => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ image, name, level, ageGroup, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useLanguage();

  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  });

  return (
    <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-all hover:shadow-xl shadow-[#0FA5AA57] dark:border-gray-800 dark:bg-[#1e1e1e]">
  
      <div className="relative mb-4 h-[140px] w-full overflow-hidden rounded-xl flex items-center justify-center border bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
        <img src={image} className="h-[90px] w-[90px] rounded-full object-cover border-2 border-white shadow-md" alt={name} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 relative" ref={menuRef}>
          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
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
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(); setShowMenu(false); }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {t("edit")}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(); setShowMenu(false); }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                 {t("delete")}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">{t("level_label")} :</span>
            <span className="font-semibold text-primary">{level}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">{t("age_group_label")} :</span>
            <span className="font-semibold text-[#009DD1]">{ageGroup}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;