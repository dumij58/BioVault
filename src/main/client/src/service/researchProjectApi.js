import { Env } from "../config/Env";

const API_BASE_URL = Env.API_BASE_URL;

const authHeader = {
    "Authorization": "Basic " + btoa("admin:admin123"),
};

export const researchProjectApi = {
    // Get all projects
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/research_projects/getall`, {
            headers: authHeader
        });
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return response.json();
    },

    // Get project by ID
    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/research_projects/${id}`, {
            headers: authHeader
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
                authHeader,
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
                authHeader,
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
            headers: authHeader
        });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    },
};