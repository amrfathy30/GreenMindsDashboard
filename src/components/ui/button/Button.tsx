import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md" | "lg"; // Button size
  variant?: "primary" | "outline" | "primaryGrid"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = 'button',
  loading
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "p-2 text-xl",
    lg: "p-4 text-base",
  };

  // Variant Classes
  const variantClasses = {
    primaryGrid:
      "bg-linear-to-r from-[#009DD1] to-[#25B16F] text-white font-semibold  shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    primary:
      "bg-[#666666] text-white font-bold capitalize shadow-theme-xs hover:bg-black",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-[15px] transition ${className} ${sizeClasses[size]
        } ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ?
        <SpinnerLoader/>
        :
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}</>
      }

    </button>
  );
};

export default Button;
export const SpinnerLoader = ({...props }) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'animate-spin text-[#F5F5F5]'}
      {...props}
    >
      <path
        opacity={0.3}
        d="M20.5 35c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 5c8.284 0 15 6.716 15 15 0 4.29-1.8 8.159-4.688 10.893"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
