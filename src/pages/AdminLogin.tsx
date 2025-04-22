import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) throw error;

      // Verificar se o usuário é admin
      const { data: adminData, error: adminError } = await supabase
        .from('clientes_vip')
        .select('is_admin')
        .eq('email', credentials.email)
        .single();

      if (adminError || !adminData?.is_admin) {
        throw new Error('Acesso restrito a administradores');
      }

      // Salvar email para uso posterior
      localStorage.setItem('userEmail', credentials.email);
      
      toast.success('Login realizado com sucesso!');
      navigate('/admin');
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-[#E91E63]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Login Administrativo</h1>
          <p className="text-white/60">Acesso restrito a administradores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Senha</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
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
      </div>
    </div>
  );
} 