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
  setShowResetPassword: any;
  setShowChangePassword: any;
  email?: string;
}

export interface SendEmailRequest {
  email: string;
}

export interface PersonalInfoRequest {
  Id?: number;
  id?: number;
  Email: string;
  Phone: string;
  Name: string;
  AvatarImg?: File;
  AvatarUrl?: string;
  Password?: string;
  ConfirmPassword?: string;
  
  // TypeName: string;
  // CityId: string;
  // CityName: string;
  // CountryId: string;
  // CountryName: string;
  // NationalityId: string;
  // NationalityName: string;
  // GenderId: string;
  // EmployeeCount: string;
  // GenderName: string;
  // VisaStatusId: string;
  // VisaStatusName: string;
  // ParentName: string;
  // Summary: string;
  // loginCountryData: string;
}

export interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}
