import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AgeVerification } from './components/AgeVerification';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Terms from './pages/Terms';
import PaymentPage from './pages/PaymentPage';

// Lazy load pages
const VIP = React.lazy(() => import('./pages/VIP'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));
const Autenticar = React.lazy(() => import('./pages/Autenticar'));

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
              <Route path="planos" element={<Plans />} />
              <Route path="confirmacao" element={<PaymentConfirmation />} />
              <Route path="autenticar" element={<Autenticar />} />
              <Route path="vip" element={<Navigate to="/planos" replace />} />
              <Route path="termos" element={<Terms />} />
              <Route path="privacidade" element={<Privacy />} />
              <Route path="pagamento/:plan" element={<PaymentPage />} />
            </Route>
          </Routes>
        </React.Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;