export interface LevelList {
  Id?: number;
  id?: number;
  NameAr: string;
  NameEn: string;
  MaxPoints: string;
  MinPoints: string;
  LevelNumber: string;
}

export interface LevelParams {
  page?: number;
  pageSize?: number;
}

export interface ProfileLevelsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
    LevelNumber: string;
  }) => void;
  initialData?: {
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
    LevelNumber: string;
  };
}

export interface LevelApiResponse {
  StatusCode: number;
  Message: string;
  PageSize: number;
  Total: number;
  Data: {
    Id: number;
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
    LevelNumber: string;
  }[];
}

export interface LevelModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
    LevelNumber: string;
  }) => Promise<void>;
  initialData?: {
    id: number;
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
    LevelNumber: string;
  };
  loading?: boolean;
}
