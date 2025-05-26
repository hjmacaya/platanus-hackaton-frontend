'use client'

import React from 'react';
import SignIn from '../../components/auth/SignIn';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// We can use hooks directly since we have the global Providers
import { useAuth } from '../../contexts/AuthContext';

// Handle auth state check client-side
function useAuthCheck() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
}

// We need a client component to use hooks
function LoginPage() {
  useAuthCheck();
  
  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <SignIn />
        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Export as default
export default LoginPage;
