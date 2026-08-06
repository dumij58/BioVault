import { getAuthHeader } from './authHeader';

const API_BASE_URL = '/api/v1/samples';

const parseErrorText = async (response) => {
    const text = await response.text();
    if (!text) return 'Sample API request failed';

    try {
        const body = JSON.parse(text);
        return body.message || body.error || JSON.stringify(body);
    } catch {
        return text;
    }
};

const request = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await parseErrorText(response);
        throw new Error(errorText);
    }
    if (response.status === 204) return null;
    return response.json();
};

// Get all samples
export const getAllSamples = async () => {
    return request(API_BASE_URL, {
        headers: getAuthHeader(),
    });
};

// Get a single sample by ID
export const getSampleById = async (id) => {
    return request(`${API_BASE_URL}/${id}`, {
        headers: getAuthHeader(),
    });
};

// Create a new sample
export const createSample = async (sampleData) => {
    return request(API_BASE_URL, {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleData),
    });
};

// Update an existing sample
export const updateSample = async (id, sampleData) => {
    return request(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleData),
    });
};

// Delete a sample
export const deleteSample = async (id) => {
    return request(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    });
};
