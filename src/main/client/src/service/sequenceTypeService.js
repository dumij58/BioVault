// Base path matches your working Spring Boot REST controller mappings
import {getAuthHeader} from "./authHeader.js";

const API_BASE_URL = '/api/v1/sequence-types';

const parseErrorMessage = async (res, fallbackMessage) => {
  try {
    const text = await res.text();
    if (!text) return fallbackMessage;

    try {
      const body = JSON.parse(text);
      return body.message || body.error || fallbackMessage;
    } catch {
      return text || fallbackMessage;
    }
  } catch {
    return fallbackMessage;
  }
};

export const sequenceTypeService = {
  // Read All
  getAll: async () => {
    const res = await fetch(API_BASE_URL,{
      headers: getAuthHeader()
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to fetch sequence types'));
    }
    return res.json();
  },

  // Create
  create: async (data) => {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to create sequence type'));
    }
    return res.json();
  },

  // Update
  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to update sequence type'));
    }
    return res.json();
  },

  // Delete
  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE', headers: getAuthHeader() });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to delete sequence type'));
    }
  }
};
