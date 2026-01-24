export interface AgePayload {
  Id?: number;
  FromAge: number;
  ToAge: number;
  DisplayName: string;
}

export interface AgeQueryParams {
  page?: number;
  pageSize?: number;
}

export interface AgeGroup {
  id: number;
  from: string;
  to: string;
  DisplayName: string;
}

export interface AgeApiResponse {
  StatusCode: number;
  Message: string;
  Data: {
    Id: number;
    FromAge: number;
    ToAge: number;
    DisplayName: string;
    VideosCount: number;
  }[];
}

export interface AgeGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: number;
    from: string;
    to: string;
    DisplayName: string;
  }) => Promise<void>;
  initialData?: {
    id: number;
    from: string;
    to: string;
    DisplayName: string;
  };
  loading?: boolean;
}
