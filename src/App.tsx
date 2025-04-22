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
const Privacy = React.lazy(() => import('./pages/Privacy'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));
const Autenticar = React.lazy(() => import('./pages/Autenticar'));
const Admin = React.lazy(() => import('./pages/Admin'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminRegister = React.lazy(() => import('./pages/AdminRegister'));

function App() {
  const { ageVerified } = useAuthStore();

  return (
    <HashRouter>
      <Routes>
        {/* Rotas de Admin - Sem verificação de idade */}
        <Route path="/admin">
          <Route path="register" element={<AdminRegister />} />
          <Route path="login" element={<AdminLogin />} />
          <Route 
            index 
            element={
              localStorage.getItem('userEmail') ? (
                <Admin />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            } 
          />
        </Route>

        {/* Rotas normais - Com verificação de idade */}
        <Route path="/" element={!ageVerified ? <AgeVerification /> : <Layout />}>
          <Route index element={<Home />} />
          <Route path="planos" element={<Plans />} />
          <Route path="confirmacao" element={<PaymentConfirmation />} />
          <Route path="autenticar" element={<Autenticar />} />
          <Route path="termos" element={<Terms />} />
          <Route path="privacidade" element={<Privacy />} />
          <Route path="pagamento/:plan" element={<PaymentPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;