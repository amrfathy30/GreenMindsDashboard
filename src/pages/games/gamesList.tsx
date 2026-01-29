import { useEffect, useState } from "react";
import { getPagedGames } from "../../api/services/gameService";
import PageMeta from "../../components/common/PageMeta";
import GameCard from "./gameCard";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import DeleteGameModal from "./deleteGameModal";
import GameModal from "./gameModal";
import { PlusIcon } from "../../icons";
import GameCardSkeleton from "../../components/loading/gameLoading";
import EmptyState from "../../components/common/no-data-found";
import { useLanguage } from "../../locales/LanguageContext";

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
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 8;

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await getPagedGames(currentPage, PAGE_SIZE);
      const gamesData = Array.isArray(response.Data?.Items) ? response.Data.Items : [];
      setGames(gamesData);
      if (response.Data?.Total) {
        setTotalPages(Math.ceil(response.Data.Total / PAGE_SIZE));
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [currentPage]);

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
      <PageMeta title="Green minds Admin | Games" description="Manage your games list easily." />

      <div className="rounded-2xl border-b border-[#D9D9D9] dark:border-gray-800 h-[calc(100vh-60px)] dark:bg-neutral-800 bg-[#EDEDED] flex flex-col overflow-hidden">
        
        <div className="h-[70px] flex shrink-0 items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("games_admin")}
          </h2>
          <Button size="sm" variant="primaryGrid" onClick={() => setIsModalOpen(true)}>
            <div className="text-white"><PlusIcon /></div>
            {t("add_game")}
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto px-5 py-6">
          {games?.length === 0 && !loading ? (
            <EmptyState title={t("no_games_found")} description={t("no_games_desc")} />
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <GameCardSkeleton key={index} />
                ))
              : games?.map((game) => (
                  <GameCard
                    key={game.Id || game.id}
                    title={isRTL ? game.GameNameAr : game.GameNameEn}
                    description={isRTL ? game.DescriptionEn : game.DescriptionAr}
                    image={
                      game.ThumbnailUrl?.startsWith("http")
                        ? game.ThumbnailUrl
                        : `${BASE_URL}/${game.ThumbnailUrl}`
                    }
                    onEdit={() => handleEditClick(game)}
                    onDelete={() => handleDeleteClick(game)}
                  />
                ))}
          </div>
        </div>
        <div className="shrink-0 py-4 px-5 border-t border-[#D9D9D9] dark:border-gray-700 bg-[#EDEDED] dark:bg-neutral-800 flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

  
      <GameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="add" onSuccess={fetchGames} />
      <GameModal key={selectedGame?.id || "add"} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} gameData={selectedGame} type="edit" onSuccess={fetchGames} />
      <DeleteGameModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} gameId={selectedGame?.Id || selectedGame?.id} onSuccess={fetchGames} />
    </>
  );
}