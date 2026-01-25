export interface LevelQueryParams {
  page?: number;
  pageSize?: number;
}

export interface LevelList {
  Id?: number;
  id?: number;
  levelNameAr: string;
  levelNameEn: string;
  MaxPoints: string;
  MinPoints: string;
}

export interface ProfileLevelsModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: {
    levelNameAr: string;
    levelNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }) => void;
  initialData?: {
    levelNameAr: string;
    levelNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
}

export interface LevelApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    levelNameAr: string;
    levelNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }[];
}

export interface LevelModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    levelNameAr: string;
    levelNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  }) => Promise<void>;
  initialData?: {
    id: number;
    levelNameAr: string;
    levelNameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
  loading?: boolean;
}
