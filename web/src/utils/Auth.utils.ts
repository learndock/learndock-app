import Cookies from "js-cookie";

import { login } from "../service/Auth.service";
import { AuthRequest } from "../types/Auth.types";

export async function performLogin(form: AuthRequest): Promise<boolean> {
    const loginData = await login(form);
    if (!loginData || !loginData.token) return Promise.resolve(false);

    Cookies.set("accessToken", loginData.token);
    dispatchEvent(new Event("refetchAuth"));
    return Promise.resolve(true);
}
