'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser, isAuthenticated } from '../api/auth';

// Create context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          // If token is invalid, log user out
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login handler
  const handleLogin = async (username, password) => {
    setError(null);
    try {
      await loginUser(username, password);
      const userData = await getCurrentUser();
      setUser(userData);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
      return { success: false, error: err.response?.data?.detail || 'Error al iniciar sesión' };
    }
  };

  // Register handler
  const handleRegister = async (userData) => {
    setError(null);
    try {
      await registerUser(userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.email || 
                          err.response?.data?.username || 
                          err.response?.data?.password || 
                          err.response?.data?.detail ||
                          'Error en el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout handler
  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
