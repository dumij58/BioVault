// Base path matches your working Spring Boot REST controller mappings
const API_BASE_URL = '/api/sequence-types';

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
    const res = await fetch(API_BASE_URL);
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to fetch sequence types'));
    }
    return res.json();
  },

  // Create
  create: async (data) => {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to update sequence type'));
    }
    return res.json();
  },

  // Delete
  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, 'Failed to delete sequence type'));
    }
  }
};
