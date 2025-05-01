import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AgeVerification } from './AgeVerification';

export function AgeVerificationGuard() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified');
    setIsVerified(ageVerified === 'true');
  }, []);

  if (isVerified === null) {
    return null; // ou um loading spinner
  }

  if (!isVerified) {
    return <AgeVerification onVerify={() => setIsVerified(true)} />;
  }

  return <Outlet />;
} 