export interface ParentParams {
  page?: number;
  pageSize?: number;
}

export interface ParentList {
  id: number;
  UserName: string;
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  PhoneNumber?: string;
  GenderId: number;
  DateOfBirth: string;
  EmailVerified?: boolean;
  Type?: number;
}

export interface ParentFormData {
  UserName: string;
  Name: string;
  Email: string;
  Password?: string;
  ConfirmPassword?: string;
  PhoneNumber?: string;
  GenderId: number;
  DateOfBirth: string;
  EmailVerified?: boolean;
  Type?: number;
}

export interface ParentsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: ParentFormData) => void;
  initialData?: ParentFormData;
}

export interface ParentApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Items: {
      Id: number;
      UserName: string;
      Name: string;
      Email: string;
      Password: string;
      ConfirmPassword: string;
      PhoneNumber?: string;
      Phone?: string;
      GenderId: number;
      DateOfBirth: string;
      EmailVerified?: boolean;
    }[];
    Total: number;
    Page: number;
    PageSize: number;
  };
}
