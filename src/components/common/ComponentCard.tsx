interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800  ${className}`}
    >
      {/* Card Header */}
      <div className="px-4 pt-5">
        <h3 className="text-lg font-extrabold text-black dark:text-white/90">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 dark:border-gray-800 sm:p-6 h-full">
        <div className="space-y-6 h-full">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
