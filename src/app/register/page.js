'use client'

import React from 'react';
import SignUp from '../../components/auth/SignUp';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
function RegisterPage() {
  useAuthCheck();
  
  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <SignUp />
        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Export as default
export default RegisterPage;
