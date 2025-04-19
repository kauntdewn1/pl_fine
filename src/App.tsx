import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AgeVerification } from './components/AgeVerification';
import { useAuthStore } from './store/authStore';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Plans = React.lazy(() => import('./pages/Plans'));
const VIP = React.lazy(() => import('./pages/VIP'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));

function App() {
  const { ageVerified } = useAuthStore();

  return (
    <BrowserRouter>
      {!ageVerified ? (
        <AgeVerification />
      ) : (
        <React.Suspense fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sobre" element={<About />} />
              <Route path="planos" element={<Plans />} />
              <Route path="confirmacao" element={<PaymentConfirmation />} />
              <Route path="vip" element={<Navigate to="/planos" replace />} />
              <Route path="termos" element={<Terms />} />
              <Route path="privacidade" element={<Privacy />} />
            </Route>
          </Routes>
        </React.Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;