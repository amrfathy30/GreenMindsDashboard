import { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  dangerType?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
  showCloseButton = true,
  isFullscreen = false,
  dangerType = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lang = localStorage.getItem("GM-language");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-lg bg-white dark:bg-[#1e1e1e] max-h-[85vh] flex flex-col";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto custom-scrollbar modal z-99999">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-[#00000099] backdrop-blur-[1px]"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className} mt-5 md:mt-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={` ${lang === "en" ? " left-0! rounded-tr-[124px]" : "  right-0! rounded-tl-[124px]"} flex items-center absolute top-0  w-[80%] bg-linear-to-r  -mt-8 md:-mt-10 p-4
         ${dangerType ? "from-[#D10000] to-[#402E25]" : "from-[#009DD1] to-[#25B16F]"}`}
        >
          {dangerType && (
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
              className="me-3"
            >
              <path
                d="M25 37.5C25.7083 37.5 26.3021 37.2604 26.7813 36.7813C27.2604 36.3021 27.5 35.7083 27.5 35C27.5 34.2917 27.2604 33.6979 26.7813 33.2188C26.3021 32.7396 25.7083 32.5 25 32.5C24.2917 32.5 23.6979 32.7396 23.2188 33.2188C22.7396 33.6979 22.5 34.2917 22.5 35C22.5 35.7083 22.7396 36.3021 23.2188 36.7813C23.6979 37.2604 24.2917 37.5 25 37.5ZM22.5 27.5H27.5V12.5H22.5V27.5ZM25 50C21.5417 50 18.2917 49.3437 15.25 48.0312C12.2083 46.7187 9.5625 44.9375 7.3125 42.6875C5.0625 40.4375 3.28125 37.7917 1.96875 34.75C0.65625 31.7083 0 28.4583 0 25C0 21.5417 0.65625 18.2917 1.96875 15.25C3.28125 12.2083 5.0625 9.5625 7.3125 7.3125C9.5625 5.0625 12.2083 3.28125 15.25 1.96875C18.2917 0.65625 21.5417 0 25 0C28.4583 0 31.7083 0.65625 34.75 1.96875C37.7917 3.28125 40.4375 5.0625 42.6875 7.3125C44.9375 9.5625 46.7187 12.2083 48.0312 15.25C49.3437 18.2917 50 21.5417 50 25C50 28.4583 49.3437 31.7083 48.0312 34.75C46.7187 37.7917 44.9375 40.4375 42.6875 42.6875C40.4375 44.9375 37.7917 46.7187 34.75 48.0312C31.7083 49.3437 28.4583 50 25 50Z"
                fill="white"
              />
            </svg>
          )}
          {title && (
            <h2 className={`text-2xl capitalize font-semibold text-white`}>
              {title}
            </h2>
          )}
        </div>

        {showCloseButton && (
          <div
            className={`flex h-8 w-8 items-center justify-center absolute top-2 z-999  ${lang === "en" ? "right-3 sm:right-6" : "left-3 sm:left-6"}`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`w-full h-full text-black transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-white 
      
      sm:top-6 sm:h-11 sm:w-11
      `}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 mt-8">{children}</div>
      </div>
    </div>
  );
};
