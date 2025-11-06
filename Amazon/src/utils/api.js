import axios from 'axios';

// Get configuration from environment variables
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

// Log environment configuration (remove in production)
console.log('API Configuration:', {
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  env: import.meta.env.MODE,
});

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle errors
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`🌐 API ${config.method?.toUpperCase()} request to: ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('🚨 Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data || error.message;
    
    // Enhanced error logging
    if (import.meta.env.DEV) {
      console.error('🚨 API Error:', {
        status: error.response?.status,
        message: errorMessage,
        url: error.config?.url,
      });
    }
    
    // Handle specific error cases
    if (error.response?.status >= 500) {
      console.error('🔴 Server error - please try again later');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Backend connection refused - is the server running?');
    } else if (error.code === 'NETWORK_ERROR') {
      console.error('🌐 Network error - check your connection');
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const treeAPI = {
  // Get all trees
  getAllTrees: async () => {
    try {
      const response = await api.get('/trees/');
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.warn('Unexpected API response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('API Error in getAllTrees:', error.response?.data || error.message);
      throw new Error(`Failed to fetch trees: ${error.response?.data?.detail || error.message}`);
    }
  },


  // Plant a new tree
  plantTree: async (userName, treeName, treeType = 'KAPOK') => {
    try {
      const response = await api.post('/trees/', {
        user_name: userName,
        tree_name: treeName,
        tree_type: treeType,
      });
      return response.data;
    } catch (error) {
      const errorDetail = error.response?.data;
      let errorMessage = 'Failed to plant tree';
      
      if (errorDetail) {
        if (typeof errorDetail === 'object') {
          const firstError = Object.values(errorDetail)[0]?.[0];
          errorMessage = firstError || JSON.stringify(errorDetail);
        } else {
          errorMessage = errorDetail;
        }
      } else {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Search trees and users
  search: async (query) => {
    try {
      const response = await api.get('/trees/search/', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Search failed: ${error.response?.data?.detail || error.message}`);
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/trees/stats/');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch stats: ${error.response?.data?.detail || error.message}`);
    }
  },
};

// Utility functions
export const checkBackendHealth = async () => {
  try {
    await api.get('/trees/');
    return true;
  } catch (error) {
    console.warn('🔴 Backend is not available:', error.message);
    return false;
  }
};

// Get the current API configuration (useful for debugging)
export const getAPIConfig = () => ({ ...API_CONFIG });

export default api;