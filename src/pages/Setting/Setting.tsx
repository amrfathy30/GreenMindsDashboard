import { ChevronRight, Globe } from "lucide-react";
import { useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import SmtpSettingsModal from "./SmtpSettingsModal";
import { Link } from "react-router";
import { AgeGroup, BoxIcon, ListView, MessageSettings } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useLanguage } from "../../api/locales/LanguageContext";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, isRTL, t } = useLanguage();
  const ref = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const closeDropdown = () => setOpen(false)
  return (
    <div className="bg-[#FAFAFA] min-h-screen rounded-tl-3xl rounded-tr-3xl">
      <PageMeta
        title="Setting | Green minds Admin Dashboard"
        description="Setting | Green minds Admin Dashboard"
      />
      {/* <PageBreadcrumb pageTitle="Setting" /> */}

      <div className="">
        <h2 className="font-medium text-2xl p-4 border text-[#000000] border-[#EDEDED] rounded-tl-3xl rounded-tr-3xl">
          setting
        </h2>
        <div className="flex flex-col gap-3 m-6 py-4 border border-[#EDEDED] rounded-tl-3xl rounded-tr-3xl rounded-bl-md rounded-br-md">
          {/* language  */}
          <div className="border-b pb-3 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#6B6B6B]">
                <Globe className="w-5 h-5" />
                <span>Language</span>
              </div>

              <div className="relative" ref={ref}>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 text-[#6B6B6B] cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                   
                    <span>{language == 'en' ?
                      <svg width="15px" height="15px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path></svg>

                      :
                      <svg width="15px" height="15px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#141414" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"></path><path fill="#EEE" d="M0 13h36v10H0z"></path><path fill="#CE1225" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z"></path><path fill="#BF9300" d="M14.75 21.562s.016.25.234.375c0 0-.062.188.172.297c.234.109 1.078.281 2.547.281s2.297-.156 2.516-.266c.219-.109.234-.359.234-.359s.234-.125.219-.281c-.016-.156-.328-.328-.328-.328s-.078-.203-.297-.281c-.219-.078-.922.344-2.266.281c-1.344-.062-2.109-.266-2.359-.25c-.25.016-.359.266-.359.266s-.282.125-.313.265z"></path><path fill="#EEE" d="M14.922 21.547c-.013.093.188.297.188.297s0 .234.203.297s1.031.219 2.375.203c1.344-.016 2.297-.094 2.406-.188c.109-.094.203-.297.203-.297s.219-.156.203-.281s-.328-.203-.328-.203s-.088-.188-.192-.266s-.776.312-2.214.312c-1.407 0-2.219-.344-2.359-.328c-.141.016-.234.281-.234.281s-.235.064-.251.173z"></path><path fill="#BF9300" d="M20.859 15.484s-.031-.734-.703-.641c-.672.094-.719.422-1.438.5l-.148.014a3.192 3.192 0 0 1-.196-1.014c0-.469.141-.672-.344-.906c-.484-.234-.578-.016-.578-.016s-.375-.188-.547-.047c-.172.141-.078.5 0 .391c.078-.109.391.203.391.203c.106.519-.195 1.081-.401 1.394c-.071-.007-.128-.01-.208-.019c-.719-.078-.766-.406-1.438-.5c-.672-.094-.703.641-.703.641l-.266 5.672l.547-.422l.003-.067l1.138-1.011l.19-.19l-.471 1.377s-.719-.047-.516.531c0 0 .109-.328.297-.266s.734.203.734.203l.188.297l.234-.219l.734-.031s.234.062.219.266a.446.446 0 0 0 .037-.283l.221-.015a.445.445 0 0 0 .034.299c-.016-.203.219-.266.219-.266l.734.031l.235.219l.188-.297s.546-.141.733-.203s.297.266.297.266c.203-.578-.516-.531-.516-.531l-.449-1.313l.126.126l1.138 1.011l.003.067l.547.422l-.265-5.673zm-3.107 3.438c-1.127-.696-1.22-2.453-1.22-2.453s.697-.036 1.203-.391c.456.405 1.234.359 1.234.359s-.053 1.764-1.217 2.485zm2.576-3.656l-.953.906l-.16.064c-.164.006-.962.008-1.465-.439c-.625.438-1.484.469-1.484.469l-.133-.053l-1.055-.947l-.277.114c.012-.113.074-.367.418-.317c.564.081.797.391 1.391.453l.168.017l-.059.076c.092 0 .228-.027.328-.049l.113.011l-.051.178c.08-.024.196-.093.291-.154l.26.025l.059.082l.198-.099l.133-.013c.115.067.279.127.279.127l.031-.156c.141.094.375.094.375.094c-.027-.022-.054-.078-.082-.126l.144-.015c.594-.062.826-.372 1.391-.453c.344-.049.406.204.418.317l-.278-.112z"></path><path fill="#EEE" d="M17.375 18.891l-.563 2.14l-.937-.187l.969-2.75zm.699 0l.562 2.14l.938-.187l-.969-2.75z"></path><path fill="#BF9300" d="M16.766 16.641s.078.906.484 1.609v-1.812s-.266.156-.484.203zm1.953.031s-.078.906-.484 1.609v-1.812c-.001 0 .265.156.484.203z"></path><path fill="#EEE" d="M16.953 13.578s.109-.109.422.109c.203.142.383.25.383.25s.128-.135.316-.104c.188.031.083.292.114.838c.031.547.25.781.25.781l-.266-.156l.016.172l-.297-.141l-.141.203l-.141-.219l-.228.139l-.069-.186l-.266.141s.391-.484.422-1.016c.009-.159-.031-.516-.031-.516s-.249-.311-.484-.295z"></path><path fill="#BF9300" d="M15.547 21.656c-.179.107-.109.172 0 .219s.765.126 2.094.156c1.359.031 2.203-.125 2.312-.188c.109-.062.125-.172-.062-.203c-.188-.031-1.125.125-2.266.125c-1.406.001-2-.156-2.078-.109z"></path></svg>

                    }</span>
                     <span>{language == 'en' ? "English" : "العربيه"}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>

                <Dropdown
                  isOpen={open}
                  onClose={closeDropdown}
                  className="absolute right-0 top-4 flex  h-[74px] w-[200px] flex-col rounded-2xl bg-white shadow-theme-lg  dark:bg-gray-dark"
                >

                  <ul className="flex flex-col ">
                    <li>
                      <DropdownItem
                        onItemClick={() => {
                          closeDropdown();
                          setLanguage('ar');
                        }}
                        className="flex border-b border-gray-200 dark:border-gray-800  items-center gap-3 px-3 py-2 font-medium text-gray-700  group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <span>
                          <svg width="15px" height="15px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#141414" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"></path><path fill="#EEE" d="M0 13h36v10H0z"></path><path fill="#CE1225" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z"></path><path fill="#BF9300" d="M14.75 21.562s.016.25.234.375c0 0-.062.188.172.297c.234.109 1.078.281 2.547.281s2.297-.156 2.516-.266c.219-.109.234-.359.234-.359s.234-.125.219-.281c-.016-.156-.328-.328-.328-.328s-.078-.203-.297-.281c-.219-.078-.922.344-2.266.281c-1.344-.062-2.109-.266-2.359-.25c-.25.016-.359.266-.359.266s-.282.125-.313.265z"></path><path fill="#EEE" d="M14.922 21.547c-.013.093.188.297.188.297s0 .234.203.297s1.031.219 2.375.203c1.344-.016 2.297-.094 2.406-.188c.109-.094.203-.297.203-.297s.219-.156.203-.281s-.328-.203-.328-.203s-.088-.188-.192-.266s-.776.312-2.214.312c-1.407 0-2.219-.344-2.359-.328c-.141.016-.234.281-.234.281s-.235.064-.251.173z"></path><path fill="#BF9300" d="M20.859 15.484s-.031-.734-.703-.641c-.672.094-.719.422-1.438.5l-.148.014a3.192 3.192 0 0 1-.196-1.014c0-.469.141-.672-.344-.906c-.484-.234-.578-.016-.578-.016s-.375-.188-.547-.047c-.172.141-.078.5 0 .391c.078-.109.391.203.391.203c.106.519-.195 1.081-.401 1.394c-.071-.007-.128-.01-.208-.019c-.719-.078-.766-.406-1.438-.5c-.672-.094-.703.641-.703.641l-.266 5.672l.547-.422l.003-.067l1.138-1.011l.19-.19l-.471 1.377s-.719-.047-.516.531c0 0 .109-.328.297-.266s.734.203.734.203l.188.297l.234-.219l.734-.031s.234.062.219.266a.446.446 0 0 0 .037-.283l.221-.015a.445.445 0 0 0 .034.299c-.016-.203.219-.266.219-.266l.734.031l.235.219l.188-.297s.546-.141.733-.203s.297.266.297.266c.203-.578-.516-.531-.516-.531l-.449-1.313l.126.126l1.138 1.011l.003.067l.547.422l-.265-5.673zm-3.107 3.438c-1.127-.696-1.22-2.453-1.22-2.453s.697-.036 1.203-.391c.456.405 1.234.359 1.234.359s-.053 1.764-1.217 2.485zm2.576-3.656l-.953.906l-.16.064c-.164.006-.962.008-1.465-.439c-.625.438-1.484.469-1.484.469l-.133-.053l-1.055-.947l-.277.114c.012-.113.074-.367.418-.317c.564.081.797.391 1.391.453l.168.017l-.059.076c.092 0 .228-.027.328-.049l.113.011l-.051.178c.08-.024.196-.093.291-.154l.26.025l.059.082l.198-.099l.133-.013c.115.067.279.127.279.127l.031-.156c.141.094.375.094.375.094c-.027-.022-.054-.078-.082-.126l.144-.015c.594-.062.826-.372 1.391-.453c.344-.049.406.204.418.317l-.278-.112z"></path><path fill="#EEE" d="M17.375 18.891l-.563 2.14l-.937-.187l.969-2.75zm.699 0l.562 2.14l.938-.187l-.969-2.75z"></path><path fill="#BF9300" d="M16.766 16.641s.078.906.484 1.609v-1.812s-.266.156-.484.203zm1.953.031s-.078.906-.484 1.609v-1.812c-.001 0 .265.156.484.203z"></path><path fill="#EEE" d="M16.953 13.578s.109-.109.422.109c.203.142.383.25.383.25s.128-.135.316-.104c.188.031.083.292.114.838c.031.547.25.781.25.781l-.266-.156l.016.172l-.297-.141l-.141.203l-.141-.219l-.228.139l-.069-.186l-.266.141s.391-.484.422-1.016c.009-.159-.031-.516-.031-.516s-.249-.311-.484-.295z"></path><path fill="#BF9300" d="M15.547 21.656c-.179.107-.109.172 0 .219s.765.126 2.094.156c1.359.031 2.203-.125 2.312-.188c.109-.062.125-.172-.062-.203c-.188-.031-1.125.125-2.266.125c-1.406.001-2-.156-2.078-.109z"></path></svg>
                        </span>
                        <span>العربيه</span>
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        onItemClick={() => {
                          closeDropdown();
                          setLanguage('en');
                        }}
                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <span>
                          <svg width="15px" height="15px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path></svg>
                        </span>
                        English
                      </DropdownItem>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>{" "}
          {/* SMTP Settings */}
          <div
            onClick={() => setOpenModal(true)}
            className="flex justify-between items-center border-b pb-3 px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] text-base">
              <MessageSettings className="w-5 h-5" />
              <span>SMTP Settings</span>
            </div>
          </div>
          {/* age-groups */}
          <Link
            to="/age-group"
            className="flex justify-between items-center px-4 border-b pb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] text-base">
              <AgeGroup className="w-5 h-5" />
              <span>Age groups</span>
            </div>
          </Link>
          {/* login-streaks */}
          <Link
            to="/login-streaks"
            className="flex justify-between items-center px-4 border-b pb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] text-base">
              <ListView className="w-5 h-5" />
              <span>Login Streaks</span>
            </div>
          </Link>
          {/* profile-levels */}
          <Link
            to="/profile-levels"
            className="flex justify-between items-center px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#6B6B6B] text-base">
              <BoxIcon className="w-5 h-5" />
              <span>Profile Levels</span>
            </div>
          </Link>
        </div>
      </div>
      <SmtpSettingsModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
