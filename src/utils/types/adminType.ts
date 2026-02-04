export interface AdminList {
  id?: number;
  Name: string;
  Email: string;
  Password: string;
  roleName?: string;
  PhoneNumber?: string;
  UserName?: string;
  ConfirmPassword?: string;
  RolesNames?: string[];
  DateOfBirth?: string;
  GenderId?: number;
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
    PhoneNumber?: string;
    UserName?: string;
    ConfirmPassword?: string;
    DateOfBirth?: string;
    GenderId?: number;
  }) => void;
  initialData?: {
    Name: string;
    Email: string;
    Password: string;
    roleName?: string;
    PhoneNumber?: string;
    Type?: number;
    UserName?: string;
    ConfirmPassword?: string;
    DateOfBirth?: string;
    GenderId?: number;
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
    RolesNames?: string[];
    PhoneNumber?: string;
    UserName?: string;
    ConfirmPassword?: string;
    GenderId?: number;
    DateOfBirth?: string;
  }[];
}
