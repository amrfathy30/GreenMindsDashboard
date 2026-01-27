/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";

interface AdminRolePermissionsProps {
  permissions: { Id: number; DisplayName: string }[];
  assignedPermissions: number[];
  loading: boolean;
  t: (key: string) => string;
  onSave: (selected: number[]) => void;
}

const AdminRolePermissions: React.FC<AdminRolePermissionsProps> = ({
  permissions,
  assignedPermissions,
  loading,
  t,
  onSave,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  useEffect(() => {
    setSelectedPermissions(assignedPermissions || []);
  }, [assignedPermissions]);

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    onSave(selectedPermissions);
  };

  if (permissions.length === 0)
    return <p className="text-gray-600">{t("no_permissions_found")}</p>;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {permissions.map((perm) => (
          <Input
            key={perm.Id}
            type="checkbox"
            label={perm.DisplayName}
            checked={selectedPermissions.includes(perm.Id)}
            onChange={() => togglePermission(perm.Id)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Button
          onClick={handleSave}
          type="submit"
          className="mt-2"
          disabled={loading}
        >
          {loading ? t("updating") : t("updateButton")}
        </Button>
      </div>
    </div>
  );
};
export default AdminRolePermissions;
