import axios, { AxiosInstance } from 'axios';

/**
 * @configuration apiConfig
 * @summary Central API configuration with environment-based URL management
 * @type api-configuration
 * @category core-library
 */
export const apiConfig = {
  baseUrl: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000',
  version: (import.meta as any).env?.VITE_API_VERSION || 'v1',
  timeout: parseInt((import.meta as any).env?.VITE_API_TIMEOUT || '30000'),

  get internalUrl(): string {
    return `${this.baseUrl}/api/${this.version}/internal`;
  },
};

/**
 * @client authenticatedClient
 * @summary Axios client for AUTHENTICATED API endpoints (requires token)
 * @type http-client
 * @category core-library
 *
 * @usage
 * Used for endpoints under /api/v1/internal/
 * - Shopping items operations
 * - Protected resources
 */
export const authenticatedClient: AxiosInstance = axios.create({
  baseURL: apiConfig.internalUrl,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
authenticatedClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
authenticatedClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');

      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);
