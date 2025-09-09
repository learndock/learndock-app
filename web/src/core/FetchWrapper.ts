import Cookies from "js-cookie";
import { RefreshTokenResponse } from "../types/Auth.types";

const REFRESH_TRIES_KEY = "auth-refresh-tries";

export class FetchError extends Error {
    response: Response;
    status: number;
    statusText: string;
    body: string | null;

    constructor(message: string, response: Response, body: string | null) {
        super(message);
        this.name = "FetchError";
        this.response = response;
        this.status = response.status;
        this.statusText = response.statusText;
        this.body = body;
    }
}

export class FetchWrapper {
    private static get accessToken(): string | undefined {
        return Cookies.get("accessToken");
    }

    static async get<T>(url: string, options?: RequestInit): Promise<T> {
        return this.request<T>("GET", url, undefined, options);
    }

    static async post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>("POST", url, body, options);
    }

    static async put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>("PUT", url, body, options);
    }

    static async patch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>("PATCH", url, body, options);
    }

    static async delete<T>(url: string, options?: RequestInit): Promise<T> {
        return this.request<T>("DELETE", url, undefined, options);
    }

    private static async request<T>(
        method: string,
        url: string,
        body?: unknown,
        options?: RequestInit,
        retry = true
    ): Promise<T> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
            ...options?.headers,
        };

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include", // Important for cookie-based auth
            ...options,
        });

        if (response.status === 401 && retry) {
            const refreshed = await this.refreshAccessToken();
            if (refreshed) {
                return this.request<T>(method, url, body, options, false);
            }
        }

        if (!response.ok) {
            const errorText = await this.safeParseError(response);
            throw new FetchError(`${response.status} ${response.statusText}`, response, errorText);
        }

        return this.parseResponse<T>(response);
    }

    public static async refreshAuthentication(): Promise<boolean> {
        return this.refreshAccessToken();
    }

    private static async refreshAccessToken(): Promise<boolean> {
        if(this.getRefreshTries() >= 3) {
            return false;
        }

        try {
            const response = await fetch("/api/auth/refresh", {
                method: "GET",
                credentials: "include",
            });

            const data: RefreshTokenResponse = await response.json();

            if (data.success && data.accessToken) {
                Cookies.set("accessToken", data.accessToken, { sameSite: "Strict" });
                return true;
            } else {
                sessionStorage.setItem(REFRESH_TRIES_KEY, (this.getRefreshTries() + 1).toString());
                return false;
            }

        } catch (err) {
            console.error("Token refresh failed due to network issue or malformed response:", err);
        }
        return false;
    }

    private static async parseResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
            return response.json();
        } else {
            return await response.text() as unknown as T;
        }
    }

    private static async safeParseError(response: Response): Promise<string | null> {
        try {
            return await response.text();
        } catch {
            return null;
        }
    }

    private static getRefreshTries(): number {
        return parseInt(sessionStorage.getItem(REFRESH_TRIES_KEY)!) || 0;
    }

    public static async setup() {
        sessionStorage.removeItem(REFRESH_TRIES_KEY);
    }
}
