import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getVipPosts, toggleLike, checkUserVip } from '../lib/supabaseFunctions';

interface Post {
  id: string;
  image_url: string;
  description: string;
  created_at: string;
  likes: number;
  comments: number;
  user_liked: boolean;
}

export default function VipFeed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      toast.error('Você precisa estar logado para acessar este conteúdo');
      navigate('/planos');
      return;
    }

    checkVipStatus(userEmail);
    loadPosts(userEmail);
  }, [navigate]);

  async function checkVipStatus(userEmail: string) {
    try {
      const isVipUser = await checkUserVip(userEmail);
      setIsVip(isVipUser);
      
      if (!isVipUser) {
        toast.error('Você precisa ser um usuário VIP para acessar este conteúdo');
        navigate('/planos');
      }
    } catch (error) {
      console.error('Erro ao verificar status VIP:', error);
      toast.error('Erro ao verificar seu status. Tente novamente.');
    }
  }

  async function loadPosts(userEmail: string) {
    try {
      const data = await getVipPosts(userEmail);
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar o feed. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId: string) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    try {
      const liked = await toggleLike(postId, userEmail);
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: liked ? post.likes + 1 : post.likes - 1,
            user_liked: liked
          };
        }
        return post;
      }));

      toast.success(liked ? 'Curtido!' : 'Curtida removida');
    } catch (error) {
      console.error('Erro ao dar like:', error);
      toast.error('Erro ao processar sua curtida. Tente novamente.');
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

  if (!isVip) {
    return null;
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
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.user_liked ? 'text-[#E91E63]' : 'text-white/80 hover:text-[#E91E63]'
                    }`}
                  >
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