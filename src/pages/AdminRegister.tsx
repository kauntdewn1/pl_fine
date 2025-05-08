import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { SupabaseError } from '@/types';
import { logger } from '@/utils/logger';

interface AdminData {
  email: string;
  is_admin: boolean;
  status: string;
  plano: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    logger.info('Iniciando processo de registro', { email: credentials.email });

    if (credentials.password !== credentials.confirmPassword) {
      logger.warn('Erro: Senhas não coincidem');
      setError('As senhas não coincidem');
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Verificar se já existe um admin com este email
      logger.info('Verificando se já existe um admin');
      const { data: existingAdmin, error: checkError } = await supabase
        .from('clientes_vip')
        .select('*')
        .eq('email', credentials.email)
        .single();

      logger.info('Resultado da verificação de admin existente', {
        data: existingAdmin,
        error: checkError,
      });

      if (existingAdmin) {
        logger.error('Admin já existe', { data: existingAdmin });
        throw new Error('Este email já está registrado como administrador');
      }

      // Criar usuário no Supabase Auth
      logger.info('Criando usuário no Supabase Auth');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) {
        logger.error('Erro ao criar usuário', { error: authError });
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Erro ao criar usuário: dados do usuário não disponíveis');
      }

      logger.info('Usuário criado com sucesso', { data: authData });

      // Criar registro na tabela clientes_vip
      logger.info('Criando registro na tabela clientes_vip');
      const { data: adminData, error: dbError } = await supabase
        .from('clientes_vip')
        .insert([
          {
            email: credentials.email,
            is_admin: true,
            status: 'ativo',
            plano: 'admin',
            user_id: authData.user.id,
          },
        ])
        .select()
        .single();

      if (dbError) {
        logger.error('Erro ao criar registro de admin', { error: dbError });
        throw dbError;
      }

      const typedAdminData = adminData as AdminData;
      logger.info('Registro de admin criado com sucesso', { data: typedAdminData });

      toast.success(
        'Administrador registrado com sucesso! Por favor, confirme seu email antes de fazer login.',
      );
      navigate('/admin/login');
    } catch (error) {
      const supabaseError = error as SupabaseError;
      logger.error('Erro detalhado no registro', { error: supabaseError });
      const errorMessage =
        supabaseError.message || 'Erro ao registrar administrador. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-[#E91E63]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Registro de Administrador</h1>
          <p className="text-white/60">Crie sua conta de administrador</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={e => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Senha</label>
            <input
              type="password"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={credentials.confirmPassword}
              onChange={e => setCredentials({ ...credentials, confirmPassword: e.target.value })}
              className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
              required
              minLength={6}
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
                Registrando...
              </>
            ) : (
              'Registrar'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-white/60 hover:text-white transition-colors"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </div>
    </div>
  );
}
