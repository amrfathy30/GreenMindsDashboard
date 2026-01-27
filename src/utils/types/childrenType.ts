export interface ChildrenParams {
  page?: number;
  pageSize?: number;
}

export interface Children {
  id?: number;
  Name: string;
  Email: string;
  ParentPhoneNumber: string;
  Phone?: string;
  Password: string;
  ConfirmPassword: string;
  DateOfBirth: string;
  gender: string;
}

export interface ChildrenApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    PageSize: number;
    Total: number;
    Items: {
      Id: number;
      Name: string;
      Password: string;
      ConfirmPassword: string;
      ParentPhoneNumber: string;
      Phone?: string;
      Email: string;
      DateOfBirth: string;
      gender: string;
    }[];
  };
}

export interface ChildrenModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Children) => Promise<void>;
  initialData?: Children;
  loading?: boolean;
}
