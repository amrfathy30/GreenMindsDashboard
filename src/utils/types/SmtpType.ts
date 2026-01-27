export interface SmtpList {
  Host: string;
  Port: number;
  UseSsl: boolean;
  Username: string;
  Password: string;
  SenderEmail: string;
  SenderName: string;
  Enabled: boolean;
}

export interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export interface SmtpSettingsModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: SmtpList;
}
