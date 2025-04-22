import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, Loader2, Users, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { checkUserAdmin } from '../lib/supabaseFunctions';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  image_url: string;
  description: string;
  created_at: string;
  likes: number;
  comments: number;
}

interface User {
  id: string;
  email: string;
  status: string;
  plano: string;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState({
    image_url: '',
    description: ''
  });
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      toast.error('Você precisa estar logado para acessar esta área');
      navigate('/planos');
      return;
    }

    checkAdminStatus(userEmail);
    loadPosts();
    loadUsers();
  }, [navigate]);

  async function checkAdminStatus(userEmail: string) {
    try {
      const isAdmin = await checkUserAdmin(userEmail);
      if (!isAdmin) {
        toast.error('Acesso restrito a administradores');
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao verificar status de admin:', error);
      toast.error('Erro ao verificar seu status. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('vip_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts. Tente novamente.');
    }
  }

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('clientes_vip')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários. Tente novamente.');
    }
  }

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('vip_posts')
        .insert([newPost]);

      if (error) throw error;

      toast.success('Post adicionado com sucesso!');
      setNewPost({ image_url: '', description: '' });
      loadPosts();
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
      toast.error('Erro ao adicionar post. Tente novamente.');
    }
  }

  async function handleEditPost(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from('vip_posts')
        .update({
          image_url: editingPost.image_url,
          description: editingPost.description
        })
        .eq('id', editingPost.id);

      if (error) throw error;

      toast.success('Post atualizado com sucesso!');
      setEditingPost(null);
      loadPosts();
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      toast.error('Erro ao atualizar post. Tente novamente.');
    }
  }

  async function handleDeletePost(postId: string) {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabase
        .from('vip_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast.success('Post excluído com sucesso!');
      loadPosts();
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post. Tente novamente.');
    }
  }

  async function handleUpdateUserStatus(userId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('clientes_vip')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Status do usuário atualizado com sucesso!');
      loadUsers();
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Loader2 className="w-12 h-12 text-[#E91E63]" />
          </div>
          <p className="text-white/60">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
          <p className="text-white/60">Gerencie seus posts e usuários</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'posts'
                ? 'bg-[#E91E63] text-white'
                : 'bg-black/40 text-white/60 hover:text-white'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'users'
                ? 'bg-[#E91E63] text-white'
                : 'bg-black/40 text-white/60 hover:text-white'
            }`}
          >
            Usuários
          </button>
        </div>

        {activeTab === 'posts' ? (
          <>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-[#E91E63]/20 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {editingPost ? 'Editar Post' : 'Adicionar Novo Post'}
              </h2>
              <form onSubmit={editingPost ? handleEditPost : handleAddPost} className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">URL da Imagem</label>
                  <input
                    type="text"
                    value={editingPost ? editingPost.image_url : newPost.image_url}
                    onChange={(e) => editingPost 
                      ? setEditingPost({ ...editingPost, image_url: e.target.value })
                      : setNewPost({ ...newPost, image_url: e.target.value })
                    }
                    className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Descrição</label>
                  <textarea
                    value={editingPost ? editingPost.description : newPost.description}
                    onChange={(e) => editingPost
                      ? setEditingPost({ ...editingPost, description: e.target.value })
                      : setNewPost({ ...newPost, description: e.target.value })
                    }
                    className="w-full bg-black/50 border border-[#E91E63]/20 rounded-lg px-4 py-2 text-white"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingPost ? (
                      <>
                        <Save className="w-5 h-5 inline-block mr-2" />
                        Salvar Alterações
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 inline-block mr-2" />
                        Adicionar Post
                      </>
                    )}
                  </button>
                  {editingPost && (
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 inline-block mr-2" />
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Posts Existentes</h2>
              {posts.map((post) => (
                <div key={post.id} className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#E91E63]/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <img
                        src={post.image_url}
                        alt={post.description}
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                      />
                      <p className="text-white/80">{post.description}</p>
                      <p className="text-white/40 text-sm mt-2">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Usuários VIP</h2>
            {users.map((user) => (
              <div key={user.id} className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-[#E91E63]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{user.email}</p>
                    <p className="text-white/60 text-sm">Plano: {user.plano}</p>
                    <p className="text-white/60 text-sm">
                      Data de cadastro: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleUpdateUserStatus(user.id, e.target.value)}
                      className="bg-black/50 border border-[#E91E63]/20 rounded-lg px-3 py-1 text-white"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="pago">Pago</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 