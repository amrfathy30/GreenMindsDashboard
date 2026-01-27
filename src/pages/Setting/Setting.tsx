/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import SmtpSettingsModal from "./SmtpSettingsModal";
import { Link } from "react-router";
import { AgeGroup, BoxIcon, MessageSettings } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useLanguage } from "../../api/locales/LanguageContext";
import { SmtpList } from "../../utils/types/SmtpType";
import { allSmtpData } from "../../api/services/SmtpService";
import { toast } from "sonner";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, isRTL, t } = useLanguage();
  const ref = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const closeDropdown = () => setOpen(false);

  const [smtpData, setSmtpData] = useState<SmtpList | null>(null);

  useEffect(() => {
    const fetchSmtp = async () => {
      try {
        const res = await allSmtpData();
        if (res?.Data?.length > 0) {
          setSmtpData(res.Data[0]);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.Message || "Failed to load SMTP settings",
        );
      }
    };

    fetchSmtp();
  }, []);

  return (
    <>
      <PageMeta title="Green minds Admin | Settings" description={``} />

      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("pageTitle")}
          </h2>
        </div>
        <div className="flex flex-col gap-3 m-6 py-4 border border-gray-300 dark:border-gray-600 rounded-tl-3xl rounded-tr-3xl rounded-bl-md rounded-br-md">
          {/* Language */}
          <div className="border-b border-gray-300 dark:border-gray-600  pb-3 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white">
                <Globe className="w-5 h-5" />
                <span>{t("language")}</span>
              </div>

              <div className="relative" ref={ref}>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 text-[#6B6B6B] dark:text-white cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span>
                      {language === "en" ? (
                        <svg
                          width="15px"
                          height="15px"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--twemoji"
                          preserveAspectRatio="xMidYMid meet"
                        ></svg>
                      ) : (
                        <svg
                          width="15px"
                          height="15px"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--twemoji"
                          preserveAspectRatio="xMidYMid meet"
                        ></svg>
                      )}
                    </span>
                    <span>
                      {language === "en" ? t("english") : t("arabic")}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                  />
                </div>

                <Dropdown
                  isOpen={open}
                  onClose={closeDropdown}
                  className={`${language === "en" ? "right-0 " : "left-0 "} absolute top-4 flex h-[74px] w-[200px] flex-col rounded-2xl bg-white shadow-theme-lg dark:bg-gray-dark`}
                >
                  <ul className="flex flex-col">
                    <li>
                      <DropdownItem
                        onItemClick={() => {
                          closeDropdown();
                          setLanguage("ar");
                        }}
                        className="flex border-b border-gray-200 dark:border-gray-800 items-center gap-3 px-3 py-2 font-medium text-gray-700 group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <span>
                          <svg
                            width="15px"
                            height="15px"
                            viewBox="0 0 36 36"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--twemoji"
                            preserveAspectRatio="xMidYMid meet"
                          ></svg>
                        </span>
                        <span>{t("arabic")}</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        onItemClick={() => {
                          closeDropdown();
                          setLanguage("en");
                        }}
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <span>
                          <svg
                            width="15px"
                            height="15px"
                            viewBox="0 0 36 36"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--twemoji"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            {/* علم المملكة المتحدة */}
                          </svg>
                        </span>
                        {t("english")}
                      </DropdownItem>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* SMTP Settings */}
          <div
            onClick={() => setOpenModal(true)}
            className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600  pb-3 px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <MessageSettings className="w-5 h-5 dark:brightness-300" />
              <span>{t("smtpSettings")}</span>
            </div>
          </div>

          {/* Age Groups */}
          <Link
            to="/age-group"
            className="flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-600  pb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <AgeGroup className="w-5 h-5 dark:brightness-300" />
              <span>{t("ageGroups")}</span>
            </div>
          </Link>

          {/* Login Streaks */}
          {/* <Link
            to="/login-streaks"
            className="flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-600  pb-3 cursor-pointer dark:text-white"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <ListView className="w-5 h-5  dark:brightness-300" />
              <span>{t("loginStreaks")}</span>
            </div>
          </Link> */}

          {/* Profile Levels */}
          <Link
            to="/profile-levels"
            className="flex justify-between items-center px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <BoxIcon className="w-5 h-5 " />
              <span>{t("profileLevels")}</span>
            </div>
          </Link>
        </div>
      </div>

      <SmtpSettingsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={
          smtpData || {
            Host: "",
            Port: 587,
            UseSsl: true,
            Username: "",
            Password: "",
            SenderEmail: "",
            SenderName: "",
            Enabled: true,
          }
        }
      />
    </>
  );
}
