"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}