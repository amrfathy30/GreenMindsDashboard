export interface AdminList {
  id?: number;
  Name: string;
  Email: string;
  Password: string;
  roleName?: string;
  Phone?: string;
  UserName?: string;
  ConfirmPassword?: string;
}

export interface adminRoles {
  Id: number;
  Name: string;
}

export interface AdminsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    Name: string;
    Email: string;
    Password: string;
    roleName?: string;
    Phone?: string;
    UserName?: string;
    ConfirmPassword?: string;
  }) => void;
  initialData?: {
    Name: string;
    Email: string;
    Password: string;
    roleName?: string;
    Phone?: string;
    Type?: number;
    UserName?: string;
    ConfirmPassword?: string;
  };
  adminRoles?: {
    Id: number;
    Name: string;
  }[];
}

export interface UserTypeApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    Name: string;
  }[];
}

export interface AdminApiResponse {
  StatusCode: number;
  Message: string;
  PageSize: number;
  Total: number;
  Data: {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    // roleName?: string;
    Phone?: string;
    UserName?: string;
    ConfirmPassword?: string;
  }[];
}
