import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_BASE_URL = Env.API_BASE_URL;

export const researcherApi = {
  // Get all researchers
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/researchers`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch researchers.');
    }
    return response.json();
  },

  // Get researcher by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/researchers/${id}`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch researcher with ID ${id}.`);
    }
    return response.json();
  },

  // Create new researcher
  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/researchers`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.message || 'Failed to create researcher.');
    }
    return response.json();
  },

  // Update existing researcher
  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/researchers/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.message || `Failed to update researcher with ID ${id}.`);
    }
    return response.json();
  },

  // Delete researcher
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/researchers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete researcher with ID ${id}.`);
    }
    return true;
  },
};
