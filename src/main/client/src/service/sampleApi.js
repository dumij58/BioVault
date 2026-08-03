import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_BASE_URL = Env.API_BASE_URL;

export const sampleApi = {
    // Get all samples
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/samples`, {
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch samples');
        }
        return response.json();
    },

    // Create new sample
    create: async (sample) => {
        const response = await fetch(`${API_BASE_URL}/samples`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sample),
        });
        if (!response.ok) {
            throw new Error('Failed to create sample');
        }
        return response.json();
    },

    // Update sample
    update: async (id, sample) => {
        const response = await fetch(`${API_BASE_URL}/samples/${id}`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sample),
        });
        if (!response.ok) {
            throw new Error('Failed to update sample');
        }
        return response.json();
    },

    // Delete sample
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/samples/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to delete sample');
        }
    },
};
