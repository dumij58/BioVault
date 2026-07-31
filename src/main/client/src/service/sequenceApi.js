import { Env } from "../config/Env";
import { parsePingResponse } from "../models/ping";

export async function pingApi() {
    const response = await fetch(`${Env.API_BASE_URL}/ping`);
    if (!response.ok) {
        throw new Error(`Ping request failed with status ${response.status}`);
    }
    const payload = await response.json();
    return parsePingResponse(payload);
}

const sequenceBaseUrl = `${Env.API_BASE_URL}/sequence`;

async function parseJsonResponse(response, fallbackMessage) {
    if (!response.ok) {
        throw new Error(`${fallbackMessage} (status ${response.status})`);
    }

    return response.json();
}

export async function listSequencesApi() {
    const response = await fetch(`${sequenceBaseUrl}/getall`);
    return parseJsonResponse(response, "Failed to fetch sequences");
}

export async function saveSequenceApi(sequence, seqLength = null) {
    const response = await fetch(`${sequenceBaseUrl}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence, seqLength }),
    });

    return parseJsonResponse(response, "Failed to save sequence");
}

export async function updateSequenceApi(id, sequence, seqLength = null) {
    const response = await fetch(`${sequenceBaseUrl}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence, seqLength }),
    });

    return parseJsonResponse(response, "Failed to update sequence");
}

export async function calcSequenceLengthApi(sequence, seqLength = null) {
    const response = await fetch(`${sequenceBaseUrl}/calclength`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence, seqLength }),
    });

    return parseJsonResponse(response, "Failed to calculate sequence length");
}

export async function getSequenceByIdApi(id) {
    const response = await fetch(`${sequenceBaseUrl}/${id}`);
    return parseJsonResponse(response, "Failed to load sequence details");
}

export async function deleteSequenceApi(id) {
    const response = await fetch(`${sequenceBaseUrl}/delete/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete sequence (status ${response.status})`);
    }
}
