import { ChevronRight, Globe, Mail, Users } from "lucide-react";
import { useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import SmtpSettingsModal from "./SmtpSettingsModal";
import { Link } from "react-router";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English US");
  const ref = useRef(null);
  const [openModal, setOpenModal] = useState(false);

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
              <div className="flex items-center gap-1 text-[#6B6B6B]">
                <Globe className="w-5 h-5" />
                <span>Language</span>
              </div>

              <div className="relative" ref={ref}>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 text-[#6B6B6B] cursor-pointer"
                >
                  <span>{lang}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>

                {open && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg px-4 py-1 text-sm">
                    <button
                      onClick={() => {
                        setLang("Arabic");
                        setOpen(false);
                      }}
                      className="hover:text-black"
                    >
                      Arabic
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
          {/* SMTP Settings */}
          <div
            onClick={() => setOpenModal(true)}
            className="flex justify-between items-center border-b pb-3 px-4 cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[#6B6B6B] text-base">
              <Mail className="w-5 h-5" />
              <span>SMTP Settings</span>
            </div>
          </div>
          {/* age-groups */}
          <Link
            to="/age-group"
            className="flex justify-between items-center px-4 cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[#6B6B6B] text-base">
              <Users className="w-5 h-5" />
              <span>Age groups</span>
            </div>
          </Link>
        </div>
      </div>
      <SmtpSettingsModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
