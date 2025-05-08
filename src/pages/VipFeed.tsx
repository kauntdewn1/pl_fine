import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks';
import { supabase } from '@/config/supabase';
import { Post } from '@/types';

export const VipFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const checkVipStatus = useCallback(async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: vipStatus } = await supabase
        .from('vip_status')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!vipStatus?.is_active) {
        navigate('/planos');
        return;
      }
    } catch (error) {
      console.error('Erro ao verificar status VIP:', error);
      toast.error('Erro ao verificar status VIP');
    }
  }, [user, navigate]);

  const loadPosts = useCallback(async () => {
    try {
      const { data: vipPosts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_vip', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(vipPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkVipStatus();
    loadPosts();
  }, [checkVipStatus, loadPosts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Loader2 className="w-12 h-12 text-[#E91E63]" />
          </div>
          <p className="text-white/60">Carregando seu conteúdo exclusivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feed VIP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
