// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    projects: `${API_BASE_URL}/projects`,
    skills: `${API_BASE_URL}/skills`,
    education: `${API_BASE_URL}/education`,
    experiences: `${API_BASE_URL}/experiences`,
    about: `${API_BASE_URL}/about`,
    contact: `${API_BASE_URL}/contact`,
    upload: `${API_BASE_URL}/upload`,
};

export default API_BASE_URL;
