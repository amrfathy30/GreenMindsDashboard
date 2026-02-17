/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResetPasswordRequest {
  otp: string;
  NewPassword: string;
  ConfirmPassword: string;
}
export interface ChangePasswordRequest {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface ModalProps {
  setShowResetPassword?: any;
  setShowChangePassword?: any;
  email: string | undefined;
}

export interface SendEmailRequest {
  email: string;
}

export interface PersonalInfoRequest {
  Id?: number;
  id?: number;
  Email: string;
  Phone?: string;
  PhoneNumber?: string;
  Name: string;
  UserName?: string;
  AvatarImg?: File;
  AvatarUrl?: string;
  Password?: string;
  ConfirmPassword?: string;
  Type?: number;
}

export interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}
