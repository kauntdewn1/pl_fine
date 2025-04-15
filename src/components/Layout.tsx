import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Lock, Menu, X, Instagram, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-background text-black font-sans">
      <header className="bg-white/80 backdrop-blur-sm fixed w-full z-10 border-b border-accent/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="block">
              <img 
                src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743392268/logo_hrz_su2n5f.png"
                alt="Paula Azevedo"
                className="h-7"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/sobre" className="text-sm hover:text-accent transition-colors">
                Sobre
              </Link>
              <Link to="/planos" className="text-sm hover:text-accent transition-colors">
                Planos
              </Link>
              {isAuthenticated ? (
                <Link 
                  to="/vip" 
                  className="bg-accent hover:bg-accent-light px-5 py-2 rounded-full flex items-center gap-2 transition-colors text-white text-sm shadow-lg shadow-accent/20"
                >
                  <Lock size={16} />
                  <span>VIP</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-accent hover:bg-accent-light px-5 py-2 rounded-full flex items-center gap-2 transition-colors text-white text-sm shadow-lg shadow-accent/20"
                >
                  <Lock size={16} />
                  <span>Acesso VIP</span>
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white/95 absolute w-full py-4 border-b border-accent/10">
            <div className="flex flex-col items-center gap-4">
              <Link 
                to="/sobre" 
                className="hover:text-accent transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/planos" 
                className="hover:text-accent transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              {isAuthenticated ? (
                <Link 
                  to="/vip" 
                  className="bg-accent hover:bg-accent-light px-6 py-2 rounded-full flex items-center gap-2 transition-colors text-white shadow-lg shadow-accent/20" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lock size={16} />
                  <span>VIP</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-accent hover:bg-accent-light px-6 py-2 rounded-full flex items-center gap-2 transition-colors text-white shadow-lg shadow-accent/20" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lock size={16} />
                  <span>Acesso VIP</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-8 px-4 border-t border-accent/10">
        <div className="container mx-auto">
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors flex items-center gap-2"
            >
              <Instagram size={20} />
              <span className="text-sm">Instagram</span>
            </a>
            <a 
              href="https://t.me/+-EgW-2xM71lmMzIx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors flex items-center gap-2"
            >
              <Send size={20} />
              <span className="text-sm">Telegram</span>
            </a>
          </div>
          <div className="text-center text-gray-600">
            <div className="flex justify-center gap-8 mb-6 text-sm">
              <Link to="/termos" className="hover:text-accent transition-colors">Termos de Uso</Link>
              <Link to="/privacidade" className="hover:text-accent transition-colors">Política de Privacidade</Link>
              <a href="mailto:contato@paulaazevedo.com" className="hover:text-accent transition-colors">Contato</a>
            </div>
            <p className="text-sm">© 2025 Paula Azevedo | Conteúdo Exclusivo +18</p>
            <p className="text-xs mt-2">Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}