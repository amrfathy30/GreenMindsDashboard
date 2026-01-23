import React, { useState } from "react";
import { MoreVertical} from "lucide-react"; 

interface GameCardProps {
  image: string;
  title: string;
  description: string;
  onEdit: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ image, title, description,onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">

      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm hover:bg-white dark:bg-black/50 dark:text-gray-300"
        >
          <MoreVertical size={18} />
        </button>

        {showMenu && (
          <div className="absolute right-2 bottom-12 z-10 w-32 rounded-lg border border-gray-100 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <button 
            onClick={(e) => {
          e.stopPropagation(); 
          onEdit();
        }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700" >
              Edit
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
               Delete
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;