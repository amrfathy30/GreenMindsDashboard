/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AddButton from "../../../components/ui/button/AddButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";

import { AgeApiResponse } from "../../../utils/types/ageType";
import { useLanguage } from "../../../locales/LanguageContext";
import { allAdminRoles } from "../../../api/services/adminRolesService";
import { useNavigate } from "react-router";

export default function AdminRoles() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const navigate = useNavigate()
  const [adminRoles, setAdminRoles] = useState<any[]>([]);
  // const [adminRolePermisions, setAdminRolePermisions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    const fetchAdminRoles = async () => {
      try {
        setLoading(true);
        const data: AgeApiResponse = await allAdminRoles();

        setAdminRoles(data.Data);
      } catch (error) {
        toast.error(t("failed_load_age"));
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRoles();
  }, [t]);

  const fetchActiveAdminRoles = async () => {
    try {
      setLoading(true);
      // const data: any = await allRolePermissions(adminRoles[activeTab]);
      // setAdminRolePermisions(data.Data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (activeTab !=null&& adminRoles) {
      fetchActiveAdminRoles();
    }

  }, [activeTab, adminRoles]);

  return (
    <>
      <PageMeta
        title="Green minds Admin | Admin Roles"
        description={``}
      />
      <div className="relative rounded-2xl border-b border-[#D9D9D9] pb-5  dark:border-gray-800 h-[calc(100vh-48px)] dark:bg-neutral-800 bg-[#EDEDED]">
        <div className="h-[70px] mb-6 flex flex-wrap items-center justify-between gap-4 px-5 border-b border-[#D9D9D9] dark:border-gray-600 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("AdminRoles")}
          </h2>

          <AddButton
            startIcon={<Plus />}
            onClick={() => { navigate('/create-role') }}
          >
            {t("add_admin_role")}
          </AddButton>
        </div>
        <div className="px-5">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {adminRoles.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-4 text-sm font-medium transition-colors duration-200 focus:outline-none
              ${activeTab === index
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {!loading&&
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">

            </p>
          </div>
          }
        </div>
      </div>


    </>
  );
}
