import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Image,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getLocalStorage } from '../../utils';
import { Post } from '../../types';

interface PaymentData {
  status: string;
  transactionId: string;
  createdAt: string;
  plan: {
    id: string;
    name: string;
    price: number;
  };
  email?: string;
}

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogout } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [posts, setPosts] = useState<Post[]>(getLocalStorage<Post[]>('posts') || []);
  const [payments] = useState<PaymentData[]>(getLocalStorage<PaymentData[]>('payments') || []);
  const [newPost, setNewPost] = useState({
    image_url: '',
    description: '',
  });

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', link: '/admin' },
    { icon: <Users size={20} />, label: 'Usuários', link: '/admin/users' },
    { icon: <CreditCard size={20} />, label: 'Pagamentos', link: '/admin/payments' },
    { icon: <Image size={20} />, label: 'Posts', link: '/admin/posts' },
    { icon: <MessageSquare size={20} />, label: 'Mensagens', link: '/admin/messages' },
    { icon: <Settings size={20} />, label: 'Configurações', link: '/admin/settings' },
  ];

  const handleAddPost = () => {
    if (!newPost.image_url || !newPost.description) {
      alert('Preencha todos os campos');
      return;
    }

    const post: Post = {
      id: crypto.randomUUID(),
      image_url: newPost.image_url,
      description: newPost.description,
      created_at: new Date().toISOString(),
      likes: 0,
    };

    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setNewPost({ image_url: '', description: '' });
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-[#1a1a1a] 
          transition-all 
          duration-300 
          fixed 
          h-screen 
          border-r 
          border-[#E91E63]/20
        `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-white font-bold ${!isSidebarOpen && 'hidden'}`}>
            Admin Panel
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white/80 hover:text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className="w-full p-4 flex items-center text-white/80 hover:text-white hover:bg-[#E91E63]/10 transition-colors"
            >
              {item.icon}
              <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
                {item.label}
              </span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full p-4 flex items-center text-white/80 hover:text-white hover:bg-[#E91E63]/10 transition-colors mt-8"
          >
            <LogOut size={20} />
            <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
              Sair
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#E91E63]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Estatísticas */}
            <div className="bg-black/50 p-6 rounded-lg border border-[#E91E63]/20">
              <h3 className="text-white/80 text-sm">Total de Usuários</h3>
              <p className="text-2xl font-bold text-white mt-2">1,234</p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-[#E91E63]/20">
              <h3 className="text-white/80 text-sm">Receita Total</h3>
              <p className="text-2xl font-bold text-white mt-2">R$ 12,345</p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-[#E91E63]/20">
              <h3 className="text-white/80 text-sm">Posts Ativos</h3>
              <p className="text-2xl font-bold text-white mt-2">567</p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-[#E91E63]/20">
              <h3 className="text-white/80 text-sm">Novos Usuários</h3>
              <p className="text-2xl font-bold text-white mt-2">89</p>
            </div>
          </div>

          {/* Tabela de Atividades Recentes */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Atividades Recentes</h3>
            <div className="bg-black/50 rounded-lg border border-[#E91E63]/20 overflow-hidden">
              <table className="w-full text-white/80">
                <thead className="bg-[#E91E63]/10">
                  <tr>
                    <th className="p-4 text-left">Usuário</th>
                    <th className="p-4 text-left">Ação</th>
                    <th className="p-4 text-left">Data</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#E91E63]/20">
                    <td className="p-4">João Silva</td>
                    <td className="p-4">Novo pagamento</td>
                    <td className="p-4">01/03/2024</td>
                    <td className="p-4">
                      <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-sm">
                        Concluído
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-[#E91E63]/20">
                    <td className="p-4">Maria Santos</td>
                    <td className="p-4">Novo post</td>
                    <td className="p-4">01/03/2024</td>
                    <td className="p-4">
                      <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full text-sm">
                        Pendente
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-[#E91E63]/20">
                    <td className="p-4">Pedro Oliveira</td>
                    <td className="p-4">Atualização de perfil</td>
                    <td className="p-4">01/03/2024</td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full text-sm">
                        Atualizado
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 