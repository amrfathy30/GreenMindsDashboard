/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";

interface AdminRolePermissionsProps {
  permissions: { Id: number; DisplayName: string }[];
  assignedPermissions: string[];
  loading: boolean;
  t: (key: string) => string;
  onSave: (selected: string[]) => void;
}

const AdminRolePermissions: React.FC<AdminRolePermissionsProps> = ({
  permissions,
  assignedPermissions,
  loading,
  t,
  onSave,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPermissions(assignedPermissions || []);
  }, [assignedPermissions]);

  const togglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
    );
  };

  const handleSave = () => {
    onSave(selectedPermissions);
  };

  if (loading) return <p className="text-gray-600">{t("loading")}...</p>;
  if (permissions.length === 0)
    return <p className="text-gray-600">{t("no_permissions_found")}</p>;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {permissions.map((perm) => (
          <Input
            key={perm.Id}
            type="checkbox"
            label={perm.DisplayName}
            checked={selectedPermissions.includes(perm.DisplayName)}
            onChange={() => togglePermission(perm.DisplayName)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={handleSave}>{t("save")}</Button>
      </div>
    </div>
  );
};
export default AdminRolePermissions;
