import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../locales/LanguageContext";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  star?: boolean;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  star = false,
  className = "",
}) => {
  const { isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom",
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      if (!isOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // If space below is less than 250px and there's more space above
        if (spaceBelow < 250 && spaceAbove > spaceBelow) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
      setIsOpen((prev) => !prev);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown(); // Use toggleDropdown to trigger position logic
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown(); // Use toggleDropdown to trigger position logic
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white">
          {label} {star && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative z-20 inline-block w-full">
        <div
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={`relative flex min-h-11 w-full items-center rounded-lg border border-gray-300 bg-transparent py-1.5 ps-4 pe-10 shadow-theme-xs outline-hidden transition focus:border-black dark:border-gray-700 dark:bg-transparent dark:focus:border-gray-600 ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
              : "cursor-pointer"
          }`}
        >
          <span
            className={`block truncate text-sm ${
              selectedOption
                ? "text-gray-900 dark:text-white"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span
            className={`absolute inset-y-0 flex items-center pointer-events-none ${
              isRTL ? "left-0 pl-3" : "right-0 pr-3"
            }`}
          >
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        {isOpen && (
          <div
            className={`absolute z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg max-h-60 focus:outline-hidden 
            ${isRTL ? "right-0" : "left-0"}
            ${dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}
          >
            <ul className="py-1 focus:outline-hidden" role="listbox">
              {options.map((option, index) => {
                const isSelected = value === option.value;
                const isFocused = index === focusedIndex;

                return (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={isSelected}
                    className={`relative cursor-pointer select-none py-2.5 px-4 text-sm transition-colors
                      ${
                        isSelected
                          ? "bg-primary/10 text-secondary dark:bg-primary/20"
                          : "text-gray-700 dark:text-white"
                      }
                      ${
                        isFocused
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-primary/5 dark:hover:bg-primary/10"
                      }
                    `}
                  >
                    <span
                      className={`block truncate ${
                        isSelected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
