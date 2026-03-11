/**
 * Centralized API configuration
 */
const getBaseURL = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl && envUrl !== 'undefined') return envUrl;

    // Fallback to dynamic hostname with the current protocol and port 8000
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:8000`;
};

export const API_BASE_URL = getBaseURL();
