import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import GameCard from "./gameCard";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import DeleteGameModal from "./deleteGameModal";
import GameModal from "./gameModal";
import { PlusIcon } from "../../icons";

const MOCK_GAMES = [
  { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
  { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
  { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
  { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
  { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
  { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
];

export default function GamesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const totalPages = 10;
  const handleEditClick = (game: any) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (game: any) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <PageMeta
        title="Games Dashboard | TailAdmin"
        description="Manage your games list easily."
      />

      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5 bg-[#EDEDED]  dark:border-gray-800 dark:bg-[#9ea6ff14]  h-[calc(100vh-48px)]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Games - Admin
          </h2>
          <Button
            size="sm"
            variant="primaryGrid"
            onClick={() => setIsModalOpen(true)}
           
          >
            <div className="text-white">
              <PlusIcon />
            </div>
            Add Games
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[80%] px-5">
          {MOCK_GAMES.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              image={game.image}
              onEdit={() => handleEditClick(game)}
              onDelete={() => handleDeleteClick(game)}
            />
          ))}
        </div>

        <div className="absolute bottom-0 my-4 w-full flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="add"
      />
      <GameModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gameData={selectedGame}
        type="edit"
      />
      <DeleteGameModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}