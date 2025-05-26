import axios from 'axios';
import { configFile } from '../config';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${configFile.API_BASE_URL}/api/v1/auth/api/register/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al registrar usuario: ${error}`);
    throw error;
  }
};

// Login user and get tokens
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${configFile.API_BASE_URL}/api/v1/auth/token/`, {
      username,
      password
    });
    // Store the tokens in localStorage
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      // Set the default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    }
    return response.data;
  } catch (error) {
    console.error(`Error al iniciar sesión: ${error}`);
    throw error;
  }
};

// Refresh the access token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${configFile.API_BASE_URL}/api/v1/auth/token/refresh/`, {
      refresh: refreshToken
    });
    
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error al refrescar token: ${error}`);
    throw error;
  }
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${configFile.API_BASE_URL}/api/v1/auth/me/`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener perfil de usuario: ${error}`);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  // Remove tokens from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  
  // Remove Authorization header
  delete axios.defaults.headers.common['Authorization'];
};

// Setup axios interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't attempted to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await refreshToken();
        
        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout the user
        logoutUser();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};
