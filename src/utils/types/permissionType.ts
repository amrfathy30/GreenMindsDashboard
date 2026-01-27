export interface PermissionApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    DisplayName: string;
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
