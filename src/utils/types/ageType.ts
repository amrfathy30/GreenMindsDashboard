export interface AgeGroup {
  id?: number;
  Id?: number;
  FromAge: string;
  ToAge: string;
  DisplayName: string;
}

export interface AgeApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    FromAge: string;
    ToAge: string;
    DisplayName: string;
    VideosCount: number;
  }[];
}

export interface AgeGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    FromAge: string;
    ToAge: string;
    DisplayName: string;
  }) => Promise<void>;
  initialData?: {
    id?: number;
    FromAge: string;
    ToAge: string;
    DisplayName: string;
  };
  loading?: boolean;
}
