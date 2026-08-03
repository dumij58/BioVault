import { Env } from "../config/Env";

export function getAuthHeader() {
    const stored = sessionStorage.getItem("biovault_credentials");
    if (!stored) {
        return {};
    }
    return { Authorization: `Basic ${stored}` };
}

export function storeCredentials(email, password) {
    sessionStorage.setItem("biovault_credentials", btoa(`${email}:${password}`));
}

export function clearCredentials() {
    sessionStorage.removeItem("biovault_credentials");
}

export function getApiBaseUrl() {
    return Env.API_BASE_URL;
}
