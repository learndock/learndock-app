import {FetchWrapper} from "../core/FetchWrapper.ts";
import {AppData, HardwareStats, SystemPing} from "../types/System.types.ts";

export const ping = (): Promise<SystemPing> =>
    FetchWrapper.get<SystemPing>("/api/system/ping");

export const fetchAppData = (): Promise<AppData> =>
    FetchWrapper.get<AppData>("/api/system/getAppData");

export const getHardwareStats = async (): Promise<HardwareStats> => 
    FetchWrapper.get<HardwareStats>('/api/system/resources/getHardwareStats');

export const getDatabaseFileSizeKB = (): Promise<number> =>
    FetchWrapper.get<number>("/api/system/resources/getDatabaseFileSize");