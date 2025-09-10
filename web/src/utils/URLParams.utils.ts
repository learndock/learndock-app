export class URLParamError extends Error {
    constructor(paramName: string, value: string) {
        super(`Invalid URL parameter "${paramName}": expected a number, got "${value}"`);
        this.name = 'URLParamError';
    }
}

export function validateNumberParam(paramName: string, value: string | undefined): number {
    const num = Number(value);
    if (!value || isNaN(num)) {
        throw new URLParamError(paramName, value ?? '');
    }
    return num;
}