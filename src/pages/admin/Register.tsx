import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Iniciando processo de registro para:', credentials.email);

    if (credentials.password !== credentials.confirmPassword) {
      console.log('Erro: Senhas não coincidem');
      setError('As senhas não coincidem');
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Simulando registro
      console.log('Registro bem-sucedido');
      toast.success('Conta criada com sucesso!');
      navigate('/admin/login');
    } catch (error) {
      console.error('Erro no registro:', error);
      setError('Erro ao criar conta');
      toast.error('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-8 border border-[#E91E63]/20">
        <div className="text-center mb-8">
          <UserPlus className="w-12 h-12 text-[#E91E63] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
          <p className="text-white/60 mt-2">Preencha os dados abaixo</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Senha</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={credentials.confirmPassword}
              onChange={(e) => setCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          {error && (
            <div className="text-[#E91E63] text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 inline-block mr-2 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-[#E91E63] hover:underline"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </div>
    </div>
  );
} 