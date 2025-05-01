import { useState } from 'react';
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

export const AdminPanel = () => {
  const [posts, setPosts] = useState<Post[]>(getLocalStorage<Post[]>('posts') || []);
  const [payments] = useState<PaymentData[]>(getLocalStorage<PaymentData[]>('payments') || []);
  const [newPost, setNewPost] = useState({
    image_url: '',
    description: '',
  });

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

      {/* Seção de Posts */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Posts</h2>
        
        <div className="bg-surface p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-3">Adicionar Novo Post</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">URL da Imagem</label>
              <input
                type="text"
                value={newPost.image_url}
                onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                className="w-full p-2 rounded bg-background border border-gray-700"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                className="w-full p-2 rounded bg-background border border-gray-700"
                rows={3}
                placeholder="Digite a descrição do post"
              />
            </div>
            <button
              onClick={handleAddPost}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
            >
              Adicionar Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-surface p-4 rounded-lg">
              <img
                src={post.image_url}
                alt={post.description}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p className="text-sm mb-2">{post.description}</p>
              <p className="text-xs text-gray-400 mb-2">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Pagamentos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Últimos Pagamentos</h2>
        <div className="bg-surface rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Plano</th>
                <th className="p-3 text-left">Valor</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="border-t border-gray-700">
                  <td className="p-3">{payment.email || '-'}</td>
                  <td className="p-3">{payment.plan.name}</td>
                  <td className="p-3">R$ {payment.plan.price.toFixed(2)}</td>
                  <td className="p-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      payment.status === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}; 