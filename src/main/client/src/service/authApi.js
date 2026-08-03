import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const AUTH_BASE_URL = `${Env.API_BASE_URL}/auth`;

export async function registerApi(payload) {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
    }

    return data;
}

export async function loginApi(email, password) {
    const credentials = btoa(`${email}:${password}`);

    const response = await fetch(`${AUTH_BASE_URL}/me`, {
        headers: { Authorization: `Basic ${credentials}` },
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return response.json();
}

export async function meApi() {
    const response = await fetch(`${AUTH_BASE_URL}/me`, {
        headers: getAuthHeader(),
    });

    if (!response.ok) {
        throw new Error("Not authenticated");
    }

    return response.json();
}
