export interface ChildrenParams {
  page?: number;
  pageSize?: number;
}

export interface ChildrenList {
  Id?: number;
  id?: number;
  ChildrenNameAr: string;
  ChildrenNameEn: string;
  MaxPoints: string;
  MinPoints: string;
}

export interface ProfileChildrensModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    ChildrenNameAr: string;
    ChildrenNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }) => void;
  initialData?: {
    ChildrenNameAr: string;
    ChildrenNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
}

export interface ChildrenApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    ChildrenNameAr: string;
    ChildrenNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }[];
}

export interface ChildrenModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    ChildrenNameAr: string;
    ChildrenNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }) => Promise<void>;
  initialData?: {
    id: number;
    ChildrenNameAr: string;
    ChildrenNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
  loading?: boolean;
}
