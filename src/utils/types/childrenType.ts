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
  GenderId: string;
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
      GenderId: string;
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
export interface Child {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  ParentPhoneNumber?: string | null;
  UserName?: string;
  AvatarImg?: string;
  DateOfBirth?: string;
  GenderId: number;
  ParentId?: number;
  ParentName?: string | null;
  RoleId?: number;
  Type?: number;
  TypeName?: string | null;
  Summary?: string | null;
  IsDelete?: boolean;
}

export interface ChildApiResponse {
  StatusCode: number;
  Message: string;
  Data: Child;
}
