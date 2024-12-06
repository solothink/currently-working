import { User } from "./user";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    refreshToken: string;
    accessToken: string;
    expiresIn: number;
    user: User;
  };
}
