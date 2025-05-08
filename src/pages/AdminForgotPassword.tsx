import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { SupabaseError } from '@/types';
import { logger } from '@/utils/logger';

export default function AdminForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'new-password'>('email');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSendResetEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    logger.info('Iniciando processo de recuperação de senha', { email });

    try {
      logger.info('Enviando email de recuperação');
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) {
        logger.error('Erro ao enviar email de recuperação', { error: resetError });
        throw resetError;
      }

      logger.info('Email de recuperação enviado com sucesso');
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.');
      setStep('code');
    } catch (error) {
      const supabaseError = error as SupabaseError;
      logger.error('Erro detalhado na recuperação de senha', { error: supabaseError });
      const errorMessage =
        supabaseError.message || 'Erro ao enviar email de recuperação. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'recovery',
      });

      if (error) throw error;

      setStep('new-password');
    } catch (error) {
      const supabaseError = error as SupabaseError;
      console.error('Erro ao verificar código:', error);
      toast.error(supabaseError.message || 'Código inválido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success('Senha atualizada com sucesso!');
      navigate('/admin/login');
    } catch (error) {
      const supabaseError = error as SupabaseError;
      console.error('Erro ao atualizar senha:', error);
      toast.error(supabaseError.message || 'Erro ao atualizar senha. Tente novamente.');
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
          <h1 className="text-3xl font-bold text-white mb-2">Recuperar Senha</h1>
          <p className="text-white/60">
            {step === 'email' && 'Digite seu email para receber o código de recuperação'}
            {step === 'code' && 'Digite o código recebido no seu email'}
            {step === 'new-password' && 'Digite sua nova senha'}
          </p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleSendResetEmail} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                  Enviando...
                </>
              ) : (
                'Enviar Código'
              )}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Código de Recuperação</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
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
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </button>
          </form>
        )}

        {step === 'new-password' && (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Nova Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
                  Atualizando...
                </>
              ) : (
                'Atualizar Senha'
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-white/60 hover:text-white flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft size={16} />
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
