export interface AdminList {
  id?: number;
  Name: string;
  Email: string;
  Password: string;
  Type: number;
  TypeName?: string;
  Phone?: string;
}

export interface UserTypeList {
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
    Type: number;
    TypeName?: string;
    Phone?: string;
  }) => void;
  initialData?: {
    Name: string;
    Email: string;
    Password: string;
    Type: number;
    TypeName?: string;
    Phone?: string;
  };
  userTypeList?: {
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
  Data: {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    Type: number;
    TypeName?: string;
    Phone?: string;
  }[];
}
