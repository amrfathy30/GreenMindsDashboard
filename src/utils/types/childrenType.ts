export interface ChildrenParams {
  page?: number;
  pageSize?: number;
}

export interface Children {
  id?: number;
  Name: string;
  Email: string;
  UserName: string;
  PhoneNumber: string;
  Password: string;
  ConfirmPassword: string;
  DateOfBirth: string;
  EmailVerified?: boolean;
  GenderId: number;
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
      PhoneNumber: string;
      Email: string;
      UserName: string;
      DateOfBirth: string;
      EmailVerified?: boolean;
      GenderId: number;
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
  PhoneNumber?: string | null;
  UserName?: string;
  AvatarImg?: string;
  DateOfBirth?: string;
  EmailVerified?: boolean;
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

export interface ChildVideo {
  Id: number;
  TitleEn: string;
  TitleAr: string;
  VideoUrl: string;
  ThumbnailUrl: string;
  NumberOfPoints: number;
  AgeSectorId: number;
  AgeSectorName: string;
}

export interface ChildGame {
  Id: number;
  DescriptionAr: string;
  DescriptionEn: string;
  GameNameAr: string;
  GameNameEn: string;
  ThumbnailUrl: string;
  NumberOfPoints: number;
}

export interface ApiResponse<T> {
  StatusCode: number;
  Message: string;
  Data: T;
}

export interface TapsProps {
  id: number;
}
