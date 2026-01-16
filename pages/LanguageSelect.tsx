
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LanguageSelect: React.FC = () => {
  const navigate = useNavigate();

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', disabled: true },
    { code: 'tj', name: 'Tojikcha', flag: '🇹🇯', disabled: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mt-12 mb-8">Tilni tanlang</h2>
      <div className="w-full space-y-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            disabled={lang.disabled}
            onClick={() => navigate('/auth')}
            className={`w-full bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border-2 transition-all ${
              lang.disabled ? 'opacity-50 grayscale' : 'border-transparent hover:border-blue-500 active:scale-95'
            }`}
          >
            <span className="text-3xl">{lang.flag}</span>
            <span className="text-lg font-semibold text-slate-700">{lang.name}</span>
            {lang.disabled && <span className="ml-auto text-xs text-slate-400">Tez kunda</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
