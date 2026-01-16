
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-blue-600 flex flex-col items-center justify-center text-white p-6">
      <div className="bg-white p-6 rounded-full mb-6 animate-bounce shadow-2xl">
        <Hammer size={64} className="text-blue-600" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Xunarmand.uz</h1>
      <p className="text-blue-100 font-medium opacity-80 uppercase tracking-widest text-xs">Ustalarni topish platformasi</p>
      
      <div className="absolute bottom-10">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};