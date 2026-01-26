import { JSX, useState } from "react";
import Video from "./Video";
import Games from "./Games";

export default function Taps() {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

  const tabContent: Record<"tab1" | "tab2", JSX.Element> = {
    tab1: <Video />,
    tab2: <Games />,
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab1"
                ? "bg-linear-to-r from-primary to-secondarytext-white"
                : "bg-[#FAFAFA] text-black border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            Videos
          </button>
          <button
            className={`px-3 md:px-6 py-2 font-medium text-[20px] rounded-xl ${
              activeTab === "tab2"
                ? "bg-linear-to-r from-primary to-secondary text-white"
                : "bg-[#FAFAFA] text-black border border-[#EDEDED] hover:text-white hover:bg-[#25B16F]"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            Games
          </button>
        </div>
      </div>

      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
