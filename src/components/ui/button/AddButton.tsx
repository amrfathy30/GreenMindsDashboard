import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const AddButton: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "p-1 px-3 text-lg",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "group border border-[#25B16F] text-[#25B16F] font-medium capitalize shadow-theme-xs hover:bg-[#25B16F] hover:text-white",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[11px] transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && (
        <span className="flex items-center text-[#25B16F] group-hover:text-white transition">
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span className="flex items-center text-[#25B16F] group-hover:text-white transition">
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default AddButton;
