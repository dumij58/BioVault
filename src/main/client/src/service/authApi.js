import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_BASE_URL = Env.API_BASE_URL ?? '/api/v1';
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

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

    try {
        const response = await fetch(`${AUTH_BASE_URL}/me`, {
            headers: { Authorization: `Basic ${credentials}` },
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        return response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error("Unable to connect to auth server. Check that the backend is running and the API URL is correct.");
        }
        throw error;
    }
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
