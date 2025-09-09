import Cookies from "js-cookie";
import { AuthRequest, AuthResponse, RegisterRequest } from "../types/Auth.types";
import { FetchWrapper } from "../core/FetchWrapper";

export const fetchIsAuthenticated = (): Promise<boolean> =>
  FetchWrapper.get<boolean>("/api/auth/isAuthenticated");

export const login = (request: AuthRequest): Promise<AuthResponse> =>
  FetchWrapper.post<AuthResponse>("/api/auth/login", request);

export const register = (request: RegisterRequest): Promise<void> =>
  FetchWrapper.post<void>("/api/auth/register", request);

export const logout = async (): Promise<void> => {
  const response = await FetchWrapper.post<void>("/api/auth/logout", {});
  Cookies.remove("accessToken");
  Cookies.remove("refresh_token");

  return response;
}
