
import React from 'react';
import { CATEGORIES, MOCK_MASTERS, CITIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ChevronRight, Hammer, Car, Wrench, Home as HomeIcon, Scissors } from 'lucide-react';

const IconMap: Record<string, any> = {
  Hammer: <Hammer />,
  Car: <Car />,
  Wrench: <Wrench />,
  Home: <HomeIcon />,
  Scissors: <Scissors />,
};

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Search Header */}
      <div className="bg-blue-600 -mx-4 -mt-4 p-6 pt-0 rounded-b-[40px] mb-8 shadow-lg">
        <div className="relative pt-4">
          <Search className="absolute left-4 top-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Qanday usta kerak?"
            className="w-full bg-white border-0 p-4 pl-12 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Kategoriyalar</h2>
          <button className="text-blue-600 text-sm font-semibold">Barchasi</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/masters?cat=${cat.id}`)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 items-start hover:border-blue-200 transition-all active:scale-95"
            >
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                {IconMap[cat.icon]}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 text-sm">{cat.name}</p>
                <p className="text-[10px] text-slate-400">{cat.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Masters */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Top Ustalar</h2>
        </div>
        <div className="space-y-4">
          {MOCK_MASTERS.filter(m => m.isTop).map((master) => (
            <div
              key={master.id}
              onClick={() => navigate(`/master/${master.id}`)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-center relative active:bg-slate-50 cursor-pointer"
            >
              <img src={master.image} alt={master.name} className="w-20 h-20 rounded-xl object-cover bg-slate-200" />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{master.name}</h3>
                <p className="text-xs text-blue-600 font-medium mb-1">{master.profession}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-orange-500 font-bold">
                    <Star size={12} fill="currentColor" /> {master.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {master.city}
                  </span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
