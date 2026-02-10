/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  fetchUserPermissions,
  hasPermission,
} from "../../utils/permissions/permissions";

const BASE_URL = "https://kidsapi.pulvent.com";

export default function GamesList() {
  const { t, isRTL } = useLanguage();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUserPermissions();
  }, []);
  const canView = hasPermission("Games_GetPaged");
  const canAdd = hasPermission("Games_Create");
  const canEdit = hasPermission("Games_Update");
  const canDelete = hasPermission("Games_Delete");

  const fetchGames = async () => {
    if (!canView) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await getPagedGames(currentPage, pageSize);
      const gamesData = Array.isArray(response.Data?.Items)
        ? response.Data.Items
        : [];
      setGames(gamesData);
      if (response.Data?.Total) {
        setTotalPages(Math.ceil(response.Data.Total / pageSize));
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
  }, [currentPage, canView, pageSize]);

  const handleEditClick = (game: any) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (game: any) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };
  if (!canView) {
    return (
      <div className="grow flex items-center justify-center">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Green minds Admin | Games"
        description="Manage your games list easily."
      />

      <div className="rounded-2xl border-b border-[#D9D9D9] dark:border-gray-800 min-h-[calc(100vh-60px)] dark:bg-neutral-800 bg-[#EDEDED] flex flex-col overflow-hidden">
        <div className="h-17.5 flex shrink-0 items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("games_admin")}
          </h2>
          {canAdd && (
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
          )}
        </div>

        <div className="grow overflow-y-auto px-5 py-6">
          {games?.length === 0 && !loading ? (
            <EmptyState
              title={t("no_games_found")}
              description={t("no_games_desc")}
            />
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: pageSize }).map((_, index) => (
                  <GameCardSkeleton key={index} />
                ))
              : games?.map((game) => (
                  <GameCard
                    key={game.Id || game.id}
                    title={isRTL ? game.GameNameAr : game.GameNameEn}
                    description={
                      isRTL ? game.DescriptionEn : game.DescriptionAr
                    }
                    image={
                      game.ThumbnailUrl?.startsWith("http")
                        ? game.ThumbnailUrl
                        : `${BASE_URL}/${game.ThumbnailUrl}`
                    }
                    canEdit={canEdit}
                    canDelete={canDelete}
                    onEdit={() => handleEditClick(game)}
                    onDelete={() => handleDeleteClick(game)}
                  />
                ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>

      {canAdd && (
        <GameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="add"
          onSuccess={fetchGames}
        />
      )}
      {canEdit && (
        <GameModal
          key={selectedGame?.id || "edit"}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          gameData={selectedGame}
          type="edit"
          onSuccess={fetchGames}
        />
      )}
      {canDelete && (
        <DeleteGameModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          gameId={selectedGame?.Id || selectedGame?.id}
          onSuccess={fetchGames}
        />
      )}
    </>
  );
}
