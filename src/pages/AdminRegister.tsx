import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log('Iniciando processo de registro para:', credentials.email);

    if (credentials.password !== credentials.confirmPassword) {
      console.log('Erro: Senhas não coincidem');
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Verificar se já existe um admin com este email
      console.log('Verificando se já existe um admin...');
      const { data: existingAdmin, error: checkError } = await supabase
        .from('clientes_vip')
        .select('*')
        .eq('email', credentials.email)
        .single();

      console.log('Resultado da verificação de admin existente:', { existingAdmin, checkError });

      if (existingAdmin) {
        console.error('Admin já existe:', existingAdmin);
        throw new Error('Este email já está registrado como administrador');
      }

      // Criar usuário no Supabase Auth
      console.log('Criando usuário no Supabase Auth...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      });

      if (authError) {
        console.error('Erro ao criar usuário:', authError);
        throw authError;
      }
      console.log('Usuário criado com sucesso:', authData);

      // Criar registro na tabela clientes_vip
      console.log('Criando registro na tabela clientes_vip...');
      const { data: adminData, error: dbError } = await supabase
        .from('clientes_vip')
        .insert([
          {
            email: credentials.email,
            is_admin: true,
            status: 'ativo',
            plano: 'admin'
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error('Erro ao criar registro de admin:', dbError);
        throw dbError;
      }
      console.log('Registro de admin criado com sucesso:', adminData);

      toast.success('Administrador registrado com sucesso!');
      navigate('/admin/login');
    } catch (error: any) {
      console.error('Erro detalhado no registro:', error);
      toast.error(error.message || 'Erro ao registrar administrador. Tente novamente.');
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

        <form onSubmit={handleRegister} className="space-y-4">
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
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={credentials.confirmPassword}
              onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
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