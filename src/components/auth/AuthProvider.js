'use client'

import React from 'react';
import { AuthProvider as OriginalAuthProvider } from '../../contexts/AuthContext';

// This is a client component wrapper for AuthProvider to avoid SSR issues
const AuthProviderClient = ({ children }) => {
  return <OriginalAuthProvider>{children}</OriginalAuthProvider>;
};

export default AuthProviderClient;
