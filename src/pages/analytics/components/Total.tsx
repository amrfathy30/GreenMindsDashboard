import ComponentCard from "../../../components/common/ComponentCard";

export default function Total() {
  return (
    <ComponentCard title="Total videos & games">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[#05A0C3] text-[80px] font-extrabold text-center leading-20">
            35
          </h2>
          <h2 className="text-[#3D3F45] dark:text-white text-[30px] font-extrabold text-center">
            videos
          </h2>
        </div>
        <div className="border border-[#0000000D] w-full"></div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[#23B075] text-[80px] font-extrabold text-center leading-20">
            20
          </h2>
          <h2 className="text-[#3D3F45] dark:text-white text-[30px] font-extrabold text-center">
            Games
          </h2>
        </div>
      </div>
    </ComponentCard>
  );
}
