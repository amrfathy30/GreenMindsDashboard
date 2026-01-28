/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageMeta from "../../../../components/common/PageMeta";
import Taps from "./Taps/Taps";
import { useLanguage } from "../../../../locales/LanguageContext";
import { toast } from "sonner";
import { useParams } from "react-router";
import { getChildrenById } from "../../../../api/services/childrenService";
import { Child, ChildApiResponse } from "../../../../utils/types/childrenType";

export default function ChildrenInfo() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<ChildApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChild = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getChildrenById(Number(id));
        setChild(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.Message || t("operation_failed"));
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [id, t]);
  const childData: Child | undefined = child?.Data;
  const childDetails = childData
    ? [
        { label: "Name", value: childData.Name || "__" },
        {
          label: "Phone",
          value: childData.ParentPhoneNumber || childData.Phone || "__",
        },
        { label: "Email", value: childData.Email || "__" },
        {
          label: "Gender",
          value:
            childData.GenderId === 1
              ? t("Male")
              : childData.GenderId === 2
                ? t("Female")
                : "__",
        },
        {
          label: "Date Of Birth",
          value: childData.DateOfBirth
            ? new Date(childData.DateOfBirth).toLocaleDateString()
            : "__",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">{t("loading")}</h2>
      </div>
    );
  }

  if (!child || !child.Data) {
    return (
      <div className="text-center min-h-screen h-full flex justify-center items-center">
        <h2 className="text-xl font-semibold">{t("NoData")}</h2>
      </div>
    );
  }

  return (
    <div className="md:px-8 md:py-4">
      <PageMeta
        title="Green minds Admin | Children Information"
        description={``}
      />
      <div className="flex items-center gap-2">
        {childData?.AvatarImg ? (
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={childData.AvatarImg}
            alt="child-image"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        )}

        <h2 className="font-medium text-2xl text-[#000000]">
          {childData?.Name || t("NoName")}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {childDetails.map((detail, index) => (
          <div
            key={index}
            className="border shadow drop-shadow-xl rounded-xl p-3"
          >
            <h2 className="font-semibold">{detail.label}</h2>
            <h3>{detail.value}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Taps />
      </div>
    </div>
  );
}
