export type ILoginResponse = {
  token: string;
  refreshToken?: string;
  //   needsPasswordChange: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
