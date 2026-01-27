export interface LevelList {
  Id?: number;
  id?: number;
  NameAr: string;
  NameEn: string;
  MaxPoints: string;
  MinPoints: string;
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
  }) => void;
  initialData?: {
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
}

export interface LevelApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
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
  }) => Promise<void>;
  initialData?: {
    id: number;
    NameAr: string;
    NameEn: string;
    MaxPoints: string;
    MinPoints: string;
  };
  loading?: boolean;
}
