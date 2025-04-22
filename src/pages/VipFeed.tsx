import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Heart, MessageCircle, Share2, Bookmark, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Post {
  id: string;
  image_url: string;
  description: string;
  created_at: string;
  likes: number;
  comments: number;
}

export default function VipFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('vip_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar o feed. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

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
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Seu Feed VIP</h1>
          <p className="text-white/60">Conteúdo exclusivo atualizado regularmente</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E91E63]/20">
              <div className="relative">
                <img
                  src={post.image_url}
                  alt={post.description}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                    <Bookmark className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <button className="flex items-center space-x-2 text-white/80 hover:text-[#E91E63] transition-colors">
                    <Heart className="w-6 h-6" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white/80 hover:text-[#E91E63] transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white/80 hover:text-[#E91E63] transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-white/80">{post.description}</p>
                <p className="text-white/40 text-sm mt-2">
                  {new Date(post.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 