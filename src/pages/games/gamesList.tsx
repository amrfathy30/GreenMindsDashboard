import { useEffect, useState } from "react";
import { useLanguage } from "../../api/locales/LanguageContext";
import { getAllGames } from "../../api/services/gameService";
import PageMeta from "../../components/common/PageMeta";
import GameCard from "./gameCard";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import DeleteGameModal from "./deleteGameModal";
import GameModal from "./gameModal";
import { PlusIcon } from "../../icons";
import GameCardSkeleton from "../../components/loading/gameLoading";
import EmptyState from "../../components/common/no-data-found";


// const MOCK_GAMES = [
//   { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
//   { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
//   { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
//   { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
//   { id: 1, title: "Tech Innovations 2023", description: "A showcase of the latest advancements in technology", image: "/images/gameImages/Image1.png" },
//   { id: 2, title: "Kids Learn Demo", description: "Educational games for children", image: "/images/gameImages/Image2.png" },
// ];
const BASE_URL = "https://kidsapi.pulvent.com";
export default function GamesList() {
  const { t, isRTL } = useLanguage();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const totalPages = 10;

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await getAllGames();
      setGames(response.Data || []);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
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
        title="Green minds Admin | Games"
        description="Manage your games list easily."
      />

      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 dark:bg-[#adf4b514]  h-[calc(100vh-48px)] dark:bg-neutral-800">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("games_admin")}
          </h2>
          <Button
            size="sm"
            variant="primaryGrid"
            onClick={() => setIsModalOpen(true)}

          >
            <div className="text-white">
              <PlusIcon />
            </div>
            {t("add_game")}
          </Button>
        </div>
        {games?.length == 0 && !loading ? <EmptyState title={t("no_games_found")} description={t("no_games_desc")}/> : ""}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[80%] px-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          ) : (
            games.map((game) => (
              <GameCard
                key={game.id}
                title={isRTL?game.GameNameAr:game.GameNameEn}
                description={isRTL?game.DescriptionEn: game.DescriptionAr}
                image={game.ThumbnailUrl?.startsWith('http') ? game.ThumbnailUrl : `${BASE_URL}/${game.ThumbnailUrl}` || game.image}
                onEdit={() => handleEditClick(game)}
                onDelete={() => handleDeleteClick(game)}
              />
            ))
          )}
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
        onSuccess={fetchGames}

      />
      <GameModal
        key={selectedGame?.id || 'add'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        gameData={selectedGame}
        type="edit"
        onSuccess={fetchGames}
      />
      <DeleteGameModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        gameId={selectedGame?.id}
        onSuccess={fetchGames}
      />
    </>
  );
}