import {FetchWrapper} from "../core/FetchWrapper.ts";
import {AppData, SystemPing} from "../types/System.types.ts";

export const ping = (): Promise<SystemPing> =>
    FetchWrapper.get<SystemPing>("/api/system/ping");

export const fetchAppData = (): Promise<AppData> =>
    FetchWrapper.get<AppData>("/api/system/getAppData");