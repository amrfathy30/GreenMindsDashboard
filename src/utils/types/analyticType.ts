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
export interface LevelStats {
  LevelId: number;
  LevelNumber: number;
  LevelName: string;
  UsersCount: number;
  Percentage: number;
}

export interface TopRankedUser {
  UserId: number;
  UserName: string;
  TotalPoints: number;
  LevelId: number;
  LevelName: string;
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
