import { name, version, appPort } from "../../package.json";
import { fetchIsAuthenticated } from "../service/Auth.service";
import { ping } from "../service/System.service";
import { getSelf } from "../service/User.service";

interface GlobalEnvironment {
    packageName: string;
    packageVersion: string;
    isDevelopment: boolean;
    isProduction: boolean;
    environment: "development" | "production";
    connection: "unknown" | boolean;
    proxyPort: number;
}

export const GLOBAL: GlobalEnvironment = {
    packageName: name,
    packageVersion: version,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    environment: import.meta.env.MODE as "development" | "production",
    connection: "unknown",
    proxyPort: appPort
}

export function printEnvironmentInfo() {
    console.info(
        `%cThis page is running %c${GLOBAL.packageName} %cv${GLOBAL.packageVersion} %c[${GLOBAL.environment}]`,
        'color: #ffffff;',
        'color: #AB47BC; font-weight: 700;',
        'color: #AB47BC; font-weight: 300;',
        'color: #9E9E9E; font-style: italic;'
    );
}

export async function printUserInfo() {
    if (GLOBAL.isDevelopment) {
        if (!await fetchIsAuthenticated()) {
            console.warn("User is not authenticated.");
            return;
        }

        const user = await getSelf();
        console.info(
            `\x1b[00mUser ID:\x1b[0m \x1b[33m${user.userId}\x1b[0m\n` +
            `\x1b[00mUsername:\x1b[0m \x1b[32m"${user.username}"\x1b[0m\n` +
            `\x1b[00mRoles:\x1b[0m \x1b[35m[${user.roles.join(", ")}]\x1b[0m`
        );
    }
}

export async function hasAPIConnection(): Promise<boolean> {
    try {
        GLOBAL.connection = (await ping()).status != null;
    } catch {
        GLOBAL.connection = false;
    }

    return GLOBAL.connection == true;
}