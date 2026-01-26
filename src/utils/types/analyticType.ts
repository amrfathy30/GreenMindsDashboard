export interface ParentChildStatsResponse {
  StatusCode: number;
  Message: string;
  Data: {
    TotalParents: number;
    TotalChildren: number;
    ParentPercentage: number;
    ChildPercentage: number;
  };
}

export interface GenderStats {
  GenderId: number | null;
  Count: number;
  Percentage: number;
}

export interface AgeSector {
  AgeSectorId: number;
  DisplayName: string;
  Count: number;
}

export interface AnalyticList {
  Id?: number;
  id?: number;
  UserName: string;
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  ParentPhoneNumber: string;
}
