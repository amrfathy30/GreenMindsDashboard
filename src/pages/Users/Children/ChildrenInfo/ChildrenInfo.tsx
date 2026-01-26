import PageMeta from "../../../../components/common/PageMeta";
import Taps from "./Taps/Taps";

export default function ChildrenInfo() {
  const childDetails = [
    { label: "Name", value: "Ahmed" },
    { label: "Phone", value: "0123456789" },
    { label: "Email", value: "ahmed@gmail.com" },
    { label: "Points", value: "3pts" },
    { label: "Days", value: "3 streaks" },
  ];

  return (
    <div className="md:px-8 md:py-4">
      <PageMeta
        title="Green minds Admin | Children Information"
        description={``}
      />
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src="/images/child.png"
          alt="child-image"
        />
        <h2 className="font-medium text-2xl text-[#000000]">Ahmed</h2>
      </div>

      <div>
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
      </div>

      <div className="mt-8">
        <Taps />
      </div>
    </div>
  );
}
