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
