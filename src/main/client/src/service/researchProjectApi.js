import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_BASE_URL = Env.API_BASE_URL;

export const researchProjectApi = {
    // Get all projects
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/research_projects/getall`, {
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return response.json();
    },

    // Get project by ID
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/research_projects/${id}`, {
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        return response.json();
    },

    // Create new project
    create: async (project) => {
        const response = await fetch(`${API_BASE_URL}/research_projects/save`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error('Failed to create project');
        }
        return response.json();
    },

    // Update project
    update: async (id, project) => {
        const response = await fetch(`${API_BASE_URL}/research_projects/update/${id}`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error('Failed to update project');
        }
        return response.json();
    },

    // Delete project
    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/research_projects/delete/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    },
};