
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Fixed: Added Image as ImageIcon to lucide-react imports to resolve missing ImageIcon identifier
import { Settings, LogOut, ChevronRight, Bell, Shield, Wallet, Briefcase, Star, MessageSquare, User, History, Plus, LayoutGrid, Eye, Image as ImageIcon } from 'lucide-react';
import { UserRole } from '../types';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.MIJOZ);
  const [userData, setUserData] = useState<any>({
    name: 'Foydalanuvchi',
    image: '',
    phone: '+998 90 123 45 67'
  });

  useEffect(() => {
    const savedRole = localStorage.getItem('role') as UserRole || UserRole.MIJOZ;
    setRole(savedRole);

    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setUserData(JSON.parse(savedProfile));
    }
  }, []);

  const menuItems = [
    { icon: <Bell size={20} />, label: 'Bildirishnomalar', color: 'bg-orange-50 text-orange-600' },
    { icon: <Shield size={20} />, label: 'Xavfsizlik', color: 'bg-green-50 text-green-600' },
    { icon: <Wallet size={20} />, label: 'Toʻlovlar', color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white p-8 pb-10 rounded-b-[48px] shadow-sm mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            {userData.image ? (
              <img src={userData.image} className="w-28 h-28 rounded-[40px] object-cover shadow-2xl border-4 border-white" alt="Profile" />
            ) : (
              <div className="w-28 h-28 rounded-[40px] bg-blue-100 flex items-center justify-center text-4xl text-blue-500 shadow-inner">
                <User size={56} strokeWidth={1.5} />
              </div>
            )}
            <button 
              onClick={() => navigate('/edit-profile')}
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2.5 rounded-2xl border-4 border-white shadow-xl active:scale-90 transition-transform"
            >
              <Settings size={20} />
            </button>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mb-1">{userData.name}</h2>
          <p className="text-slate-400 font-bold text-sm mb-4 tracking-tight">{userData.phone}</p>
          
          <div className="flex gap-2">
            <span className="bg-slate-900 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest">
              {role === UserRole.USTA ? 'Mutaxassis' : 'Mijoz'}
            </span>
            {role === UserRole.USTA && userData.experience && (
              <span className="bg-blue-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-blue-100">
                {userData.experience} yil tajriba
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-24">
        {role === UserRole.USTA && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Mening e'lonlarim</h3>
               <button 
                 onClick={() => navigate('/create-ad')}
                 className="flex items-center gap-1.5 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl active:scale-95 transition-all"
               >
                 <Plus size={14} /> E'lon qo'shish
               </button>
            </div>
            
            {userData.ads && userData.ads.length > 0 ? (
               <div className="space-y-3">
                 {userData.ads.map((ad: any) => (
                   <div key={ad.id} className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                        {ad.images && ad.images[0] ? <img src={ad.images[0]} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-4 text-slate-300" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 truncate">{ad.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{ad.category}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${ad.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                          {ad.status === 'active' ? 'Faol' : 'Nofaol'}
                        </span>
                        <p className="font-black text-blue-600 text-xs">{ad.price || 'Bepul'}</p>
                      </div>
                   </div>
                 ))}
               </div>
            ) : (
              <div className="bg-white rounded-[32px] p-8 border-2 border-dashed border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4"><LayoutGrid size={24} /></div>
                <p className="text-slate-400 text-xs font-bold px-8">Hozircha hech qanday e'lon yaratmagansiz.</p>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-slate-300 px-4 mb-2 uppercase tracking-[0.2em]">Asosiy</h3>
          {menuItems.map((item, idx) => (
            <button key={idx} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
              <div className={`p-2.5 rounded-2xl ${item.color}`}>{item.icon}</div>
              <span className="font-bold text-slate-700 flex-1 text-left">{item.label}</span>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          ))}
        </div>

        <button 
          onClick={() => { localStorage.clear(); navigate('/splash'); }}
          className="w-full flex items-center gap-4 p-4 bg-white rounded-[32px] shadow-sm border border-red-50 text-red-600 hover:bg-red-50 transition-colors mb-12"
        >
          <div className="p-2.5 rounded-2xl bg-red-50"><LogOut size={20} /></div>
          <span className="font-black flex-1 text-left uppercase text-xs tracking-widest">Tizimdan chiqish</span>
        </button>
      </div>
    </div>
  );
};
