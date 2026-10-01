/** Shared by the browser and the server. The browser adds a 12-byte IV and AES-GCM adds a 16-byte tag. */
export const DIRECT_MAX_BYTES = 100 * 1024 * 1024;
export const SERVER_MAX_BYTES = 4 * 1024 * 1024;
export const DIRECT_OVERHEAD = 12 + 16;
