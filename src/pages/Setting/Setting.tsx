/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Globe, UserCheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import SmtpSettingsModal from "./SmtpSettingsModal";
import { Link } from "react-router";
import { AgeGroup, BoxIcon, MessageSettings } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useLanguage } from "../../locales/LanguageContext";
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

  useEffect(() => {
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
                          width="20"
                          height="20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g clip-path="url(#US_svg__a)">
                            <path
                              d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                              fill="#F0F0F0"
                            />
                            <path
                              d="M11.477 12H24a12.01 12.01 0 0 0-.413-3.13H11.478V12Zm0-6.262h10.761a12.064 12.064 0 0 0-2.769-3.13h-7.992v3.13ZM12 24c2.824 0 5.42-.976 7.47-2.609H4.53A11.948 11.948 0 0 0 12 24ZM1.761 18.26h20.477a11.93 11.93 0 0 0 1.348-3.13H.413c.3 1.116.758 2.167 1.348 3.13Z"
                              fill="#D80027"
                            />
                            <path
                              d="M5.559 1.874h1.093l-1.017.739.389 1.196-1.018-.74-1.017.74.336-1.033c-.896.746-1.68 1.62-2.328 2.594h.35l-.647.47c-.1.168-.197.34-.29.513l.31.951-.578-.419C1 7.19.868 7.5.75 7.817l.34 1.048h1.258l-1.017.74.388 1.195-1.017-.739-.61.443C.033 10.994 0 11.494 0 12h12V0C9.63 0 7.42.688 5.559 1.874Zm.465 8.926-1.018-.739-1.017.739.389-1.196-1.017-.739h1.257l.388-1.195.389 1.195h1.257l-1.017.74.389 1.195Zm-.389-4.691.389 1.195-1.018-.739-1.017.74.389-1.196-1.017-.74h1.257l.388-1.195.389 1.196h1.257l-1.017.739Zm4.693 4.691-1.017-.739-1.017.739.388-1.196-1.017-.739h1.257l.389-1.195.388 1.195h1.258l-1.018.74.389 1.195Zm-.389-4.691.389 1.195-1.017-.739-1.017.74.388-1.196-1.017-.74h1.257l.389-1.195.388 1.196h1.258l-1.018.739Zm0-3.496.389 1.196-1.017-.74-1.017.74.388-1.196-1.017-.739h1.257L9.311.678l.388 1.196h1.258l-1.018.739Z"
                              fill="#0052B4"
                            />
                          </g>
                          <defs>
                            <clipPath id="US_svg__a">
                              <path fill="#fff" d="M0 0h24v24H0z" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g clip-path="url(#EG_svg__a)">
                            <path
                              d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                              fill="#F0F0F0"
                            />
                            <path
                              d="M12 0C6.84 0 2.442 3.256.746 7.826h22.507C21.558 3.256 17.16 0 12 0Z"
                              fill="#D80027"
                            />
                            <path
                              d="M12 24c5.16 0 9.558-3.256 11.253-7.826H.746C2.442 20.744 6.84 24 12 24Z"
                              fill="#000"
                            />
                            <path
                              d="M16.174 10.696h-3.13a1.044 1.044 0 0 0-2.087 0h-3.13c0 .576.501 1.043 1.077 1.043H8.87c0 .576.467 1.044 1.043 1.044 0 .576.467 1.043 1.044 1.043h2.087c.576 0 1.043-.467 1.043-1.043.576 0 1.044-.468 1.044-1.044h-.035c.576 0 1.078-.467 1.078-1.043Z"
                              fill="#FF9811"
                            />
                          </g>
                          <defs>
                            <clipPath id="EG_svg__a">
                              <path fill="#fff" d="M0 0h24v24H0z" />
                            </clipPath>
                          </defs>
                        </svg>
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
                            width="20"
                            height="20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <g clip-path="url(#EG_svg__a)">
                              <path
                                d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                                fill="#F0F0F0"
                              />
                              <path
                                d="M12 0C6.84 0 2.442 3.256.746 7.826h22.507C21.558 3.256 17.16 0 12 0Z"
                                fill="#D80027"
                              />
                              <path
                                d="M12 24c5.16 0 9.558-3.256 11.253-7.826H.746C2.442 20.744 6.84 24 12 24Z"
                                fill="#000"
                              />
                              <path
                                d="M16.174 10.696h-3.13a1.044 1.044 0 0 0-2.087 0h-3.13c0 .576.501 1.043 1.077 1.043H8.87c0 .576.467 1.044 1.043 1.044 0 .576.467 1.043 1.044 1.043h2.087c.576 0 1.043-.467 1.043-1.043.576 0 1.044-.468 1.044-1.044h-.035c.576 0 1.078-.467 1.078-1.043Z"
                                fill="#FF9811"
                              />
                            </g>
                            <defs>
                              <clipPath id="EG_svg__a">
                                <path fill="#fff" d="M0 0h24v24H0z" />
                              </clipPath>
                            </defs>
                          </svg>
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
                            width="20"
                            height="20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <g clip-path="url(#US_svg__a)">
                              <path
                                d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                                fill="#F0F0F0"
                              />
                              <path
                                d="M11.477 12H24a12.01 12.01 0 0 0-.413-3.13H11.478V12Zm0-6.262h10.761a12.064 12.064 0 0 0-2.769-3.13h-7.992v3.13ZM12 24c2.824 0 5.42-.976 7.47-2.609H4.53A11.948 11.948 0 0 0 12 24ZM1.761 18.26h20.477a11.93 11.93 0 0 0 1.348-3.13H.413c.3 1.116.758 2.167 1.348 3.13Z"
                                fill="#D80027"
                              />
                              <path
                                d="M5.559 1.874h1.093l-1.017.739.389 1.196-1.018-.74-1.017.74.336-1.033c-.896.746-1.68 1.62-2.328 2.594h.35l-.647.47c-.1.168-.197.34-.29.513l.31.951-.578-.419C1 7.19.868 7.5.75 7.817l.34 1.048h1.258l-1.017.74.388 1.195-1.017-.739-.61.443C.033 10.994 0 11.494 0 12h12V0C9.63 0 7.42.688 5.559 1.874Zm.465 8.926-1.018-.739-1.017.739.389-1.196-1.017-.739h1.257l.388-1.195.389 1.195h1.257l-1.017.74.389 1.195Zm-.389-4.691.389 1.195-1.018-.739-1.017.74.389-1.196-1.017-.74h1.257l.388-1.195.389 1.196h1.257l-1.017.739Zm4.693 4.691-1.017-.739-1.017.739.388-1.196-1.017-.739h1.257l.389-1.195.388 1.195h1.258l-1.018.74.389 1.195Zm-.389-4.691.389 1.195-1.017-.739-1.017.74.388-1.196-1.017-.74h1.257l.389-1.195.388 1.196h1.258l-1.018.739Zm0-3.496.389 1.196-1.017-.74-1.017.74.388-1.196-1.017-.739h1.257L9.311.678l.388 1.196h1.258l-1.018.739Z"
                                fill="#0052B4"
                              />
                            </g>
                            <defs>
                              <clipPath id="US_svg__a">
                                <path fill="#fff" d="M0 0h24v24H0z" />
                              </clipPath>
                            </defs>
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
          <Link
            to="/admin-roles"
            className="flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-600  pb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <UserCheckIcon />
              <span>{t("AdminRoles")}</span>
            </div>
          </Link>
          <Link
            to="/permissions-list"
            className="flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-600  pb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] dark:text-white text-base">
              <UserCheckIcon />
              <span> {t("Permission")}</span>
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
        onSuccess={fetchSmtp} 
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
