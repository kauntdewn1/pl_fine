import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Instagram, Send, Home, LogIn } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import VipFeed from '../pages/VipFeed';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <noscript>
        <div className="fixed top-0 left-0 right-0 bg-[#E91E63] text-white text-center p-2 z-50">
          JavaScript está desabilitado. Algumas funcionalidades podem não funcionar corretamente.
        </div>
      </noscript>

      <header className="bg-black/60 backdrop-blur-sm fixed w-full z-10 border-b border-[#E91E63]/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="block">
              <ImageWithFallback 
                src="https://res.cloudinary.com/dt9m3pkjv/image/upload/v1743393385/PAULA_AZEVEDO_500_x_200_px_gd5l0v.png"
                alt="Paula Azevedo"
                className="h-7"
                fallbackSrc="/logo-fallback.png"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm hover:text-[#E91E63] transition-colors flex items-center gap-1">
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link to="/planos" className="text-sm hover:text-[#E91E63] transition-colors">
                Planos
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-black/95 absolute w-full py-4 border-b border-[#E91E63]/10">
            <div className="flex flex-col items-center gap-4">
              <Link 
                to="/" 
                className="hover:text-[#E91E63] transition-colors flex items-center gap-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link 
                to="/planos" 
                className="hover:text-[#E91E63] transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-black/60 backdrop-blur-sm py-8 px-4 border-t border-[#E91E63]/10">
        <div className="container mx-auto">
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.instagram.com/studiopaulinhaazevedo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              <Instagram size={20} />
              <span className="text-sm">Instagram</span>
            </a>
            <a 
              href="https://t.me/+-EgW-2xM71lmMzIx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              <Send size={20} />
              <span className="text-sm">Telegram</span>
            </a>
            <Link 
              to="/admin/login"
              className="flex items-center justify-center gap-2 bg-black/40 hover:bg-[#E91E63]/90 text-white px-6 py-3 rounded-full transition-all duration-300 border border-[#E91E63]/20 hover:border-transparent shadow-lg hover:shadow-[#E91E63]/20 hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              <LogIn size={20} />
              <span className="text-sm">Login</span>
            </Link>
          </div>
          <div className="text-center text-white/60">
            <div className="flex justify-center gap-8 mb-6 text-sm">
              <Link to="/termos" className="hover:text-[#E91E63] transition-colors">Termos de Uso</Link>
              <Link to="/privacidade" className="hover:text-[#E91E63] transition-colors">Política de Privacidade</Link>
              <a href="mailto:contato@paulaazevedo.com" className="hover:text-[#E91E63] transition-colors">Contato</a>
            </div>
            <p className="text-sm">© 2025 Paula Azevedo | Conteúdo Exclusivo +18</p>
            <p className="text-xs mt-2">Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}