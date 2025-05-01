import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { MESSAGES } from '../constants';
import { getLocalStorage, setLocalStorage } from '../utils';

// Hook para gerenciar autenticação
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = getLocalStorage<string>('userEmail');
    if (userEmail) {
      checkUserStatus(userEmail);
    } else {
      setLoading(false);
    }
  }, []);

  const checkUserStatus = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('clientes_vip')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      console.error('Erro ao verificar status do usuário:', error);
      toast.error(MESSAGES.ERRORS.AUTHENTICATION);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes_vip')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      setUser(data);
      setLocalStorage('userEmail', email);
      toast.success(MESSAGES.SUCCESS.AUTHENTICATION);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error(MESSAGES.ERRORS.AUTHENTICATION);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLocalStorage('userEmail', null);
    navigate('/');
  };

  return { user, loading, login, logout };
}

// Hook para gerenciar posts
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vip_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setError('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const likePost = async (postId: string, userEmail: string) => {
    try {
      const { data, error } = await supabase.rpc('toggle_post_like', {
        p_post_id: postId,
        p_user_email: userEmail,
      });

      if (error) throw error;

      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: data ? post.likes + 1 : post.likes - 1,
            user_liked: data,
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Erro ao dar like:', error);
      toast.error('Erro ao processar sua curtida');
    }
  };

  return { posts, loading, error, fetchPosts, likePost };
}

// Hook para gerenciar planos
export function usePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('price');

      if (error) throw error;

      setPlans(data);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      setError('Erro ao carregar planos');
    } finally {
      setLoading(false);
    }
  };

  return { plans, loading, error };
}

// Hook para gerenciar pagamentos
export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (planId: string, userEmail: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (error) throw error;

      // Redirecionar para o Gumroad
      window.location.href = data.gumroadLink;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setError(MESSAGES.ERRORS.PAYMENT);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, processPayment };
}

// Hook para gerenciar idade
export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const ageVerified = getLocalStorage<boolean>('ageVerified');
    setIsVerified(ageVerified);
  }, []);

  const verifyAge = () => {
    setLocalStorage('ageVerified', true);
    setIsVerified(true);
  };

  return { isVerified, verifyAge };
} 