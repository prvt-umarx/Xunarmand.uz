
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_MASTERS } from '../constants';
import { Star, MapPin, Phone, MessageSquare, ArrowLeft, CheckCircle } from 'lucide-react';

export const MasterProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const master = MOCK_MASTERS.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState('about');

  if (!master) return <div className="p-8 text-center">Usta topilmadi</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative h-64">
        <img src={master.gallery[0] || master.image} className="w-full h-full object-cover" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="px-4 -mt-16 relative">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200">
          <div className="flex items-end gap-4 mb-4">
            <img src={master.image} className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover" alt={master.name} />
            <div className="mb-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {master.name}
                {master.isTop && <CheckCircle size={20} className="text-blue-500" />}
              </h1>
              <p className="text-blue-600 font-semibold">{master.profession}</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-6">
            <div className="text-center flex-1 border-r border-slate-100">
              <p className="text-orange-500 font-bold text-lg flex items-center justify-center gap-1">
                <Star size={18} fill="currentColor" /> {master.rating}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reyting</p>
            </div>
            <div className="text-center flex-1 border-r border-slate-100">
              <p className="text-slate-800 font-bold text-lg">{master.reviewsCount}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Izohlar</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-slate-800 font-bold text-lg flex items-center justify-center gap-1">
                <MapPin size={18} /> {master.city}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Shahar</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
              <Phone size={20} /> Qoʻngʻiroq
            </button>
            <button className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <MessageSquare size={20} /> Chat
            </button>
          </div>

          <div className="flex border-b border-slate-100 mb-6">
            {['about', 'gallery', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-bold capitalize ${
                  activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'
                }`}
              >
                {tab === 'about' ? 'Maʼlumot' : tab === 'gallery' ? 'Ishlar' : 'Izohlar'}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="font-bold mb-2">Men haqimda</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{master.description}</p>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 gap-2 animate-in fade-in duration-300">
              {master.gallery.map((img, idx) => (
                <img key={idx} src={img} className="w-full h-32 rounded-xl object-cover" alt={`Job ${idx}`} />
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-200" />
                  <div>
                    <p className="text-xs font-bold">Dilshod Mirzayev</p>
                    <div className="flex text-orange-400"><Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /></div>
                  </div>
                  <span className="ml-auto text-[10px] text-slate-400">Kecha</span>
                </div>
                <p className="text-xs text-slate-600 italic">"Juda sifatli ish qilishdi, rahmat!"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
