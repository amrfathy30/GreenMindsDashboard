export interface ParentParams {
  page?: number;
  pageSize?: number;
}

export interface ParentList {
  Id?: number;
  id?: number;
  // Name_en: string;
  // Name_ar: string;
  UserName: string;
  Name: string;
  // status: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  ParentPhoneNumber: string;
  Phone?: string;
  GenderId: string;
  DateOfBirth: string;
}

export interface ParentsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    // Name_en: string;
    // Name_ar: string;
    UserName: string;
    Name: string;
    // status: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    ParentPhoneNumber: string;
    Phone?: string;
    GenderId: string;
    DateOfBirth: string;
  }) => void;
  initialData?: {
    // Name_en: string;
    // Name_ar: string;
    UserName: string;
    Name: string;
    // status: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    ParentPhoneNumber: string;
    Phone?: string;
    GenderId: string;
    DateOfBirth: string;
  };
}

export interface ParentApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Items: {
      Id: number;
      // Name_en: string;
      // Name_ar: string;
      UserName: string;
      Name: string;
      Email: string;
      Password: string;
      ConfirmPassword: string;
      ParentPhoneNumber: string;
      Phone?: string;
      GenderId: string;
      DateOfBirth: string;
    }[];
    Total: number;
    Page: number;
    PageSize: number;
  };
}
