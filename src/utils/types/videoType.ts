export interface VideoType {
  Id: number;
  TitleEn: string;
  TitleAr: string;
  VideoUrl: string;
  ThumbnailUrl: string;
  NumberOfPoints: number;
  AgeSectorId: number;
  AgeSectorName?: string;
}

export interface VideoPayload {
  Id?: number;
  TitleEn: string;
  TitleAr: string;
  VideoUrl?: string;
  Thumbnail?: File | null;
  VideoFile?: File | null;
  NumberOfPoints: number;
  AgeSectorId: number;
  ThumbnailUrl?: string; 
}

export interface VideoApiResponse {
  StatusCode: number;
  Message: string;
  Data: VideoType[];
}

export interface VideoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  type: "add" | "edit";
  initialData?: VideoType | null;
  loading?: boolean;
}