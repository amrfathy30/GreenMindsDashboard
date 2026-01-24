export default function AgeLoading() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-10 w-full rounded-md animate-pulse ${
            i === 0 ? "bg-[#25B16F] h-14" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
