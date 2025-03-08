import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

// API functions
export const getAllCrawls = () => api.get('/api/crawls');

export const getCrawlById = (id) => api.get(`/api/crawls/${id}`);

export const getCrawlStatus = (id) => api.get(`/api/crawls/${id}/status`);

export const getCrawlResults = (id, format = 'json') => api.get(`/api/crawls/${id}/results?format=${format}`);

export const createCrawl = (crawlConfig) => api.post('/api/crawls', crawlConfig);

export const processCrawlWithLLM = (id, processingConfig) => api.post(`/api/crawls/${id}/process`, processingConfig);

export const getSettings = () => api.get('/api/settings');

export const updateSettings = (settings) => api.put('/api/settings', settings);

export default api;
