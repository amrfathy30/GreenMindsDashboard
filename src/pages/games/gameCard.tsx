import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLanguage } from "../../locales/LanguageContext";

interface GameCardProps {
  image: string;
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  showActions?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  image,
  title,
  description,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}) => {
  // تم إضافة isRTL هنا لحل مشكلة الخطأ
  const { t, isRTL } = useLanguage(); 
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  });
  const hasActions = canEdit || canDelete;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-all hover:shadow-lg shadow-[#0FA5AA57] dark:border-gray-800 dark:bg-[#1e1e1e] h-62.5">
      <div className="relative mb-4 h-[68%] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 ">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1 gap-3" ref={menuRef}>
  <h3 className="flex-1 min-w-0 text-base h-[32%] font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          {hasActions && (
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#EFEFEF] text-gray-600 backdrop-blur-sm hover:bg-white dark:bg-[#383939] dark:text-gray-300"
            >
              <MoreVertical size={12} />
            </button>
          )}

          {showMenu && (
            <div 
              className={`absolute bottom-12 z-10 w-32 rounded-lg border border-gray-100 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 ${
                isRTL ? "left-2" : "right-2"
              }`}
            >
              {canEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
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
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  {t("delete")}
                </button>
              )}
              {!canEdit && !canDelete && (
                <div className="px-3 py-2 text-xs text-gray-400">
                  {t("no_permissions")}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;