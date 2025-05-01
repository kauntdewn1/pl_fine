import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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
      // Simulando verificação de usuário
      const mockUser: User = {
        id: '1',
        email,
        plano: 'vip',
        status: 'ativo'
      };
      setUser(mockUser);
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
      // Simulando login
      const mockUser: User = {
        id: '1',
        email,
        plano: 'vip',
        status: 'ativo'
      };
      setUser(mockUser);
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
      // Simulando busca de posts
      const mockPosts = [
        {
          id: '1',
          image_url: 'https://example.com/image1.jpg',
          description: 'Post de exemplo 1',
          created_at: new Date().toISOString(),
          likes: 0,
          user_liked: false
        }
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setError('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const likePost = async (postId: string, userEmail: string) => {
    try {
      // Simulando like em um post
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes + 1,
            user_liked: true,
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
      // Simulando busca de planos
      const mockPlans = [
        {
          id: '1',
          name: 'Plano Básico',
          price: 29.90,
          features: ['Acesso básico', 'Suporte por email'],
          openpixLink: 'https://example.com/basic',
          qrCode: 'mock-qr-code',
          qrCodeImage: 'https://example.com/qr-basic.png'
        },
        {
          id: '2',
          name: 'Plano VIP',
          price: 59.90,
          features: ['Acesso VIP', 'Suporte prioritário'],
          openpixLink: 'https://example.com/vip',
          qrCode: 'mock-qr-code',
          qrCodeImage: 'https://example.com/qr-vip.png'
        }
      ];
      setPlans(mockPlans);
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
      // Simulando processamento de pagamento
      const mockPlan = {
        id: planId,
        gumroadLink: 'https://example.com/payment'
      };
      window.location.href = mockPlan.gumroadLink;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setError(MESSAGES.ERRORS.PAYMENT);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, processPayment };
} 