/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageMeta from "../../../../components/common/PageMeta";
import Taps from "./Taps/Taps";
import { useLanguage } from "../../../../locales/LanguageContext";
import { toast } from "sonner";
import { useParams } from "react-router";
import {
  getChildrenById,
  getPointsById,
} from "../../../../api/services/childrenService";
import {
  Child,
  ChildApiResponse,
  ChildPointsResponse,
} from "../../../../utils/types/childrenType";
import {
  fetchUserPermissions,
  hasPermission,
} from "../../../../utils/permissions/permissions";
import EmptyState from "../../../../components/common/no-data-found";
import ChildrenInfoSkeleton from "../../../../components/loading/ChildrenInfoSkeleton";

export default function ChildrenInfo() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const childId = id ? Number(id) : undefined;

  const [child, setChild] = useState<ChildApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [childPoints, setChildPoints] = useState<ChildPointsResponse | null>(
    null,
  );
  const [loadingPoints, setLoadingPoints] = useState(true);
  useEffect(() => {
    fetchUserPermissions();
  }, []);
  const canView = hasPermission("Children_GetChild");
  const canViewPoints = hasPermission("Children_GetChildPointsById");

  // getChildrenById
  useEffect(() => {
    const fetchChild = async () => {
      if (!id) return;
      if (!canView) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getChildrenById(Number(id));
        setChild(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("OperationFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [canView, id, t]);

  // getPointsById
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      if (!canViewPoints) {
        setLoadingPoints(false);
        return;
      }

      try {
        setLoadingPoints(true);
        const data = await getPointsById(Number(id));
        setChildPoints(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("OperationFailed"));
      } finally {
        setLoadingPoints(false);
      }
    };

    fetchData();
  }, [canViewPoints, id, t]);

  const childData: Child | undefined = child?.Data;
  const pointsData = childPoints?.Data?.Child;

  const childDetails = childData
    ? [
        { label: t("Name"), value: childData.Name || "__" },
        {
          label: t("Phone"),
          value: childData.PhoneNumber || childData.PhoneNumber || "__",
        },
        { label: t("Email"), value: childData.Email || "__" },
        {
          label: t("Gender"),
          value:
            childData.GenderId === 1
              ? t("Male")
              : childData.GenderId === 2
                ? t("Female")
                : "__",
        },
        {
          label: t("DateOfBirth"),
          value: childData.DateOfBirth
            ? new Date(childData.DateOfBirth).toLocaleDateString()
            : "__",
        },
      ]
    : [];

  if (!childId) {
    return (
      <div className="text-center min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">{t("NoData")}</h2>
      </div>
    );
  }

  const pageTitle = `${t("GreenMindsAdmin")} | ${t("ChildrenInformation")}`;
  const progress = Number(pointsData?.Progress || 0);

  if (!canView && !canViewPoints && !loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <EmptyState
          title={t("access_denied")}
          description={t("not_authorized_to_view_this_page")}
        />
      </div>
    );
  }

  if (loading || loadingPoints) {
    return <ChildrenInfoSkeleton />;
  }

  return (
    <div className="md:px-8 md:py-4">
      <PageMeta title={pageTitle} description="" />
      <div className="flex items-center gap-2">
        {childData?.AvatarImg ? (
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={childData.AvatarImg}
            alt={t("ChildImage")}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        )}

        <h2 className="font-medium text-2xl text-[#000000] dark:text-white truncate">
          {childData?.Name || t("NoName")}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {childDetails.map((detail, index) => (
          <div
            key={index}
            className="border dark:border-gray-700 shadow drop-shadow-xl rounded-xl p-3"
          >
            <h2 className="font-semibold dark:text-white">{detail.label}</h2>
            <h3
              className={`dark:text-white truncate ${
                detail.label === t("Email") ? "ltr text-left" : ""
              }`}
              dir={detail.label === t("Email") ? "ltr" : undefined}
            >
              {detail.value}
            </h3>{" "}
          </div>
        ))}
      </div>

      {pointsData && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border shadow p-5 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {t("TotalPoints")}
            </h3>
            <p className="text-3xl font-bold text-secondary">
              {pointsData.Points}
            </p>
          </div>

          {/* Current Level */}
          <div className="rounded-xl border shadow p-5 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {t("CurrentLevel")}
            </h3>
            <p className="text-xl font-semibold text-secondary truncate">
              {pointsData.CurrentLevel.Name}
            </p>
            <p className="text-sm text-gray-500">
              #{pointsData.CurrentLevel.LevelNumber}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t("PointsRange")}: {pointsData.CurrentLevel.MinPoints} -{" "}
              {pointsData.CurrentLevel.MaxPoints}
            </p>
          </div>

          {/* Next Level */}
          <div className="rounded-xl border shadow p-5 dark:border-gray-700">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {t("NextLevel")}
            </h3>
            <p className="text-xl font-semibold text-secondary truncate">
              {pointsData.NextLevel.Name}
            </p>
            <p className="text-sm text-gray-500">
              #{pointsData.NextLevel.LevelNumber}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t("PointsRange")}: {pointsData.NextLevel.MinPoints} -{" "}
              {pointsData.NextLevel.MaxPoints}
            </p>
          </div>
        </div>
      )}

      {pointsData && (
        <div className="mt-6 rounded-xl border shadow p-5 dark:border-gray-700">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium  dark:text-gray-100">
              {t("Progress")}
            </span>
            <span className="text-sm font-medium dark:text-gray-100">
              {progress.toFixed(2)}%
            </span>{" "}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {pointsData && (
        <div className="mt-6 rounded-xl border shadow p-5 dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-gray-100">
            {t("DailyReward")}
          </h3>

          {pointsData.IsAwardedToday ? (
            <p className="text-green-600 ">✔ {t("RewardCollectedToday")}</p>
          ) : (
            <p className="text-orange-500">
              {t("NextReward")}: +{pointsData.NextDayAwardPoints} {t("points")}
            </p>
          )}

          <p className="text-sm text-gray-500 mt-1">
            {t("ConsecutiveDays")}: {pointsData.CurrentConsecutiveDays}
          </p>
        </div>
      )}

      <div className="mt-8">
        <Taps id={childId} />
      </div>
    </div>
  );
}
