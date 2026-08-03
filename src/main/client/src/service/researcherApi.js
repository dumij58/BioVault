import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_BASE_URL = Env.API_BASE_URL;

export const researcherApi = {
    // Get all researchers
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/researchers`, {
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch researchers');
        }
        return response.json();
    },
};
