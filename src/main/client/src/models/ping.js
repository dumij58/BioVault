export function parsePingResponse(payload) {
    if (!payload || typeof payload !== "object" || typeof payload.message !== "string") {
        throw new Error("Invalid ping response");
    }

    return payload;
}
