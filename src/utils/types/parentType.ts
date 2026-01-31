export interface ParentParams {
  page?: number;
  pageSize?: number;
}

export interface ParentList {
  Id?: number;
  id?: number;
  UserName: string;
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  ParentPhoneNumber: string;
  Phone?: string;
  GenderId: string;
  DateOfBirth: string;
  EmailVerified?: boolean;
}

export interface ParentsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    UserName: string;
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    ParentPhoneNumber: string;
    Phone?: string;
    GenderId: string;
    DateOfBirth: string;
    EmailVerified?: boolean;
  }) => void;
  initialData?: {
    UserName: string;
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    ParentPhoneNumber: string;
    Phone?: string;
    GenderId: string;
    DateOfBirth: string;
    EmailVerified?: boolean;
  };
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
      ParentPhoneNumber: string;
      Phone?: string;
      GenderId: string;
      DateOfBirth: string;
      EmailVerified?: boolean;
    }[];
    Total: number;
    Page: number;
    PageSize: number;
  };
}
