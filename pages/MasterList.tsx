
import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_MASTERS, CATEGORIES, CITIES } from '../constants';
import { Star, MapPin, Search as SearchIcon, ArrowLeft, Navigation, LayoutGrid, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Master } from '../types';

export const MasterList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialCat = searchParams.get('cat') || '';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  };

  const getGeoLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setSortByDistance(true);
          setLocationLoading(false);
        },
        () => {
          alert("Joylashuvingizni aniqlash ruxsat etilmadi.");
          setLocationLoading(false);
        }
      );
    }
  };

  const masters = useMemo(() => {
    let list = [...MOCK_MASTERS];
    
    if (selectedCategory) list = list.filter(m => m.category === selectedCategory);
    if (selectedCity) list = list.filter(m => m.city === selectedCity);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(q) || m.profession.toLowerCase().includes(q));
    }

    if (sortByDistance && userLocation) {
      list = list.sort((a, b) => {
        if (!a.location || !b.location) return 0;
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.location.lat, b.location.lng);
        return distA - distB;
      });
    }

    return list;
  }, [selectedCategory, selectedCity, searchQuery, sortByDistance, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/')} className="p-2.5 bg-slate-50 rounded-2xl active:scale-90 transition-transform">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Usta yoki xizmat nomi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none p-3.5 pl-11 rounded-[20px] text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>
          <button 
            onClick={getGeoLocation}
            className={`p-3.5 rounded-[20px] transition-all shadow-sm ${sortByDistance ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-white text-slate-500 border border-slate-100'}`}
          >
            {locationLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" /> : <Navigation size={20} />}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 items-center">
          <button 
            onClick={() => setSelectedCategory('')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
              selectedCategory === '' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <LayoutGrid size={14} /> Barchasi
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
                selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <SlidersHorizontal size={12} /> Saralash
          </div>
          {CITIES.slice(0, 5).map(city => (
            <button 
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
              className={`px-4 py-1.5 rounded-xl text-[11px] font-black border transition-all whitespace-nowrap ${
                selectedCity === city ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border-slate-200 shadow-sm'
              }`}
            >
              {city}
            </button>
          ))}
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-400">
             Yana <ChevronDown size={12} className="inline ml-1" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {masters.length > 0 ? masters.map((master, idx) => {
          const distance = userLocation && master.location 
            ? calculateDistance(userLocation.lat, userLocation.lng, master.location.lat, master.location.lng) 
            : null;

          return (
            <div 
              key={master.id}
              onClick={() => navigate(`/master/${master.id}`)}
              className="bg-white p-4 rounded-[32px] shadow-sm border border-slate-100 flex gap-4 animate-in slide-in-from-bottom duration-300 cursor-pointer active:scale-[0.98] transition-all hover:shadow-md"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="relative shrink-0">
                <img src={master.image} className="w-24 h-24 rounded-[24px] object-cover bg-slate-100 border border-slate-50 shadow-sm" alt={master.name} />
                {master.isTop && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white">
                    <Star size={10} fill="currentColor" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-slate-800 truncate">{master.name}</h3>
                  <div className="flex items-center gap-1 text-orange-500 font-bold text-xs shrink-0">
                    <Star size={14} fill="currentColor" /> {master.rating}
                  </div>
                </div>
                <p className="text-[11px] text-blue-600 font-black uppercase tracking-wider mt-0.5">{master.profession}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{master.description}</p>
                
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <MapPin size={10} className="text-blue-400" /> {master.city}
                  </div>
                  {distance !== null && (
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {distance < 1 ? '500m ichida' : `${distance.toFixed(1)} km masofada`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-24 flex flex-col items-center">
            <div className="bg-slate-100 p-6 rounded-full text-slate-300 mb-4"><SearchIcon size={48} /></div>
            <p className="text-slate-400 font-bold">Usta topilmadi</p>
            <button onClick={() => {setSelectedCategory(''); setSearchQuery('');}} className="mt-4 text-blue-600 font-bold text-sm underline">Filtrlarni tozalash</button>
          </div>
        )}
      </div>
    </div>
  );
};
