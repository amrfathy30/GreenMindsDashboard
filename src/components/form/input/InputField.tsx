import type React from "react";
import type { FC } from "react";

interface InputProps {
  type?:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "password"
    | "date"
    | "time"
    | "checkbox"
    | string;
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string | number;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  defaultValue?: string | number;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  label,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  required = false,
  checked = false,
  hint,
  defaultValue,
}) => {
  let inputClasses = `h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-[#1e1e1e] dark:text-white ${className}`;

  if (disabled) {
    inputClasses +=
      " text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed opacity-40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    inputClasses +=
      " border-error-500 focus:border-error-300 focus:ring-error-500/20";
  } else if (success) {
    inputClasses +=
      " border-success-500 focus:border-success-300 focus:ring-success-500/20";
  } else {
    inputClasses +=
      " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white";
  }

  if (type === "checkbox") {
    return (
      <label
        htmlFor={id}
        className={`flex items-center gap-2 text-sm font-medium overflow-hidden text-black dark:text-gray-300 cursor-pointer ${className}`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 ${className}`}
        />
        <span className="block text-xs">
          {label}
          {required && <span className="text-error-500">*</span>}
        </span>
      </label>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-black dark:text-gray-300"
        >
          {label}
          {required && <span className="text-error-500">*</span>}{" "}
        </label>
      )}

      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
