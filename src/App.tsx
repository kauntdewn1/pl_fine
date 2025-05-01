import React, { useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { checkTableStructure } from './lib/supabaseFunctions';
import { AgeVerificationGuard } from './components/AgeVerificationGuard';
import { LoadingFallback } from './components/LoadingFallback';

// Lazy loading dos componentes
const Home = React.lazy(() => import('./pages/Home'));
const Plans = React.lazy(() => import('./pages/Plans'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));
const Autenticar = React.lazy(() => import('./pages/Autenticar'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const AdminRegister = React.lazy(() => import('./pages/AdminRegister'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Layout = React.lazy(() => import('./components/Layout'));

function App() {
  useEffect(() => {
    async function checkDatabase() {
      const result = await checkTableStructure();
      console.log('Resultado da verificação do banco:', result);
    }
    checkDatabase();
  }, []);

  return (
    <HashRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#E91E63',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#E91E63',
              secondary: '#fff',
            },
          },
        }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Rotas Admin - Completamente separadas da verificação de idade */}
          <Route path="/admin/*">
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

          {/* Rotas públicas - Com verificação de idade */}
          <Route element={<AgeVerificationGuard />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="planos" element={<Plans />} />
              <Route path="confirmacao" element={<PaymentConfirmation />} />
              <Route path="autenticar" element={<Autenticar />} />
              <Route path="termos" element={<Terms />} />
              <Route path="privacidade" element={<Privacy />} />
              <Route path="pagamento/:plan" element={<PaymentPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;