import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AgeVerification } from './components/AgeVerification';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Plans from './pages/Planos';
import Terms from './pages/Terms';
import PaymentPage from './pages/PaymentPage';

// Lazy load pages
const VIP = React.lazy(() => import('./pages/VIP'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));
const Autenticar = React.lazy(() => import('./pages/Autenticar'));
const Admin = React.lazy(() => import('./pages/Admin'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

function App() {
  const { ageVerified } = useAuthStore();

  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            localStorage.getItem('userEmail') ? (
              <Admin />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        <Route path="/" element={!ageVerified ? <AgeVerification /> : <Layout />}>
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
    </HashRouter>
  );
}

export default App;