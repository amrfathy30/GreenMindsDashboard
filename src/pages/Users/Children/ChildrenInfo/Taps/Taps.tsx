import { JSX, useState } from "react";
import Video from "./Video";
import Games from "./Games";
import { useLanguage } from "../../../../../locales/LanguageContext";
import { TapsProps } from "../../../../../utils/types/childrenType";

export default function Taps({ id }: TapsProps) {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

  const tabContent: Record<"tab1" | "tab2", JSX.Element> = {
    tab1: <Video id={id} />,
    tab2: <Games id={id} />,
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab1"
                ? "bg-linear-to-r from-primary to-secondary text-white"
                : "bg-[#FAFAFA] text-black border border-[#EDEDED] hover:text-white hover:bg-secondary"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            {t("videos")}
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab2"
                ? "bg-linear-to-r from-primary to-secondary text-white"
                : "bg-[#FAFAFA] text-black border border-[#EDEDED] hover:text-white hover:bg-secondary"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            {t("games")}
          </button>
        </div>
      </div>

      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
