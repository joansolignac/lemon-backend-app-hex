export type RefreshResult = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
  };
};
