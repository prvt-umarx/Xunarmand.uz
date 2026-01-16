
import React from 'react';
import { Home, Search, User, MessageCircle, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={24} />, label: 'Asosiy', path: '/' },
    { icon: <Search size={24} />, label: 'Qidiruv', path: '/search' },
    { icon: <MessageCircle size={24} />, label: 'Chat', path: '/chat' },
    { icon: <User size={24} />, label: 'Profil', path: '/profile' },
  ];

  const hideNav = ['/splash', '/language', '/auth'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tight">XUNARMAND.UZ</h1>
        <button className="p-1"><Menu size={24} /></button>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around items-center py-2 px-4 z-50">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                location.pathname === item.path ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};