export interface PermissionApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    DisplayName: string;
    Key:string
  }[];
}

export interface UpdatePermissionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { id?: number; DisplayName: string }) => Promise<void>;
  initialData?: {
    id?: number;
    DisplayName: string;
  };
  loading?: boolean;
}

export interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { RoleName: string }) => Promise<void>;
  initialData?: {
    RoleName: string;
  };
  loading?: boolean;
  editing?: boolean;
}

export interface AdminRolePermissionsProps {
  permissions: { Id: number; DisplayName: string }[];
  assignedPermissions: number[];
  loading: boolean;
  t: (key: string) => string;
  onSave: (selected: number[]) => void;
}
