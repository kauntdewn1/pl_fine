import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Iniciando processo de login para:', credentials.email);

    try {
      const success = await adminLogin(credentials.email, credentials.password);

      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate('/admin');
      } else {
        setError('Email ou senha inválidos');
        toast.error('Email ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao fazer login');
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-8 border border-[#E91E63]/20">
        <div className="text-center mb-8">
          <UserPlus className="w-12 h-12 text-[#E91E63] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Login Administrativo</h1>
          <p className="text-white/60 mt-2">Acesse sua conta de administrador</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Senha</label>
            <input
              type="password"
              value={credentials.password}
              onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          {error && <div className="text-[#E91E63] text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 inline-block mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin/register')}
            className="text-[#E91E63] hover:underline"
          >
            Criar conta de administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
