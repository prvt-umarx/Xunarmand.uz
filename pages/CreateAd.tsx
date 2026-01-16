
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, LayoutGrid, DollarSign, PenTool, CheckCircle, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../constants';

export const CreateAd: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    status: 'active'
  });

  const handleSave = () => {
    setIsLoading(true);
    // Simulation of saving to localStorage
    const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    const newAd = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      images: []
    };
    
    const updatedProfile = {
      ...profile,
      ads: [...(profile.ads || []), newAd]
    };
    
    setTimeout(() => {
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white p-6 relative">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-xl active:scale-90 transition-transform">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Yangi e'lon</h1>
      </div>

      <div className="space-y-6">
        <div className="w-full aspect-video bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-2 mb-4 group active:bg-blue-50 transition-all cursor-pointer">
          <Camera size={32} />
          <span className="text-[10px] font-black uppercase tracking-widest">Rasm qo'shish</span>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><PenTool size={14}/> Sarlavha</label>
          <input 
            type="text" 
            placeholder="Masalan: Professional oshxona mebellari yig'ish"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="w-full bg-slate-50 border-0 p-4 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><LayoutGrid size={14}/> Kategoriya</label>
          <select 
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
            className="w-full bg-slate-50 border-0 p-4 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">Tanlang...</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><DollarSign size={14}/> Narx (Ixtiyoriy)</label>
          <input 
            type="text" 
            placeholder="Masalan: 500,000 so'm yoki Kelishuv"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            className="w-full bg-slate-50 border-0 p-4 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Xizmat tavsifi</label>
          <textarea 
            placeholder="Xizmatingiz haqida batafsil ma'lumot bering..."
            rows={5}
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            className="w-full bg-slate-50 border-0 p-4 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading || !form.title || !form.category}
          className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black shadow-xl shadow-blue-100 disabled:bg-slate-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" /> : <><Sparkles size={20} /> E'lonni joylash</>}
        </button>
      </div>

      {success && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-white/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white p-10 rounded-[48px] shadow-2xl flex flex-col items-center animate-in zoom-in duration-500 border border-slate-50">
             <div className="bg-green-500 p-4 rounded-full text-white mb-6 animate-bounce"><CheckCircle size={48} /></div>
             <p className="text-2xl font-black text-slate-900">Muvaffaqiyatli!</p>
             <p className="text-slate-500 font-bold mt-1">E'loningiz bazaga qo'shildi</p>
           </div>
        </div>
      )}
    </div>
  );
};
