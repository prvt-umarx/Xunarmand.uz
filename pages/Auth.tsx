
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { 
  User, Briefcase, ChevronRight, Star, X, MessageSquare, ArrowLeft, 
  BellRing, PenTool, Image as ImageIcon, CheckCircle, Sparkles, MapPin, Search
} from 'lucide-react';
import { CATEGORIES, CITY_DISTRICTS, CITIES } from '../constants';
import { generateMasterDescription } from '../services/gemini';

export const Auth: React.FC = () => {
  const [step, setStep] = useState(1); 
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showFakeSMS, setShowFakeSMS] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  
  // Profile State
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [specialization, setSpecialization] = useState(''); // Main Category ID
  const [subSpecialization, setSubSpecialization] = useState('');
  const [customSpecialization, setCustomSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSendSMS = () => {
    if (phone.length >= 9) {
      const newCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(newCode);
      setShowFakeSMS(true);
      setTimeout(() => setShowFakeSMS(false), 6000);
      setShowCodeModal(true);
    }
  };

  const handleVerify = () => {
    if (code === generatedCode || code === '0000') {
      setShowCodeModal(false);
      setShowFakeSMS(false);
      setStep(3);
    } else {
      alert("Kod noto'g'ri. SMS bildirishnomadagi kodni kiritishingiz shart.");
    }
  };

  const handleCityChange = (val: string) => {
    setCity(val);
    setDistrict(''); // Reset district when city changes
  };

  const handleSpecChange = (val: string) => {
    setSpecialization(val);
    setSubSpecialization(''); // Reset sub-spec when category changes
  };

  const handleGenerateBio = async () => {
    const mainSpec = CATEGORIES.find(c => c.id === specialization);
    const prof = subSpecialization === 'boshqa' ? customSpecialization : subSpecialization;
    if (!prof || !experience) return;
    
    setIsGeneratingBio(true);
    const bio = await generateMasterDescription(`${mainSpec?.name}: ${prof}`, experience);
    setDescription(bio);
    setIsGeneratingBio(false);
  };

  const handleFinish = () => {
    const finalProf = subSpecialization === 'boshqa' ? customSpecialization : subSpecialization;
    const categoryName = CATEGORIES.find(c => c.id === specialization)?.name || specialization;
    
    const userProfile = {
      name: fullName,
      phone: `+998 ${phone}`,
      role: role,
      city: city,
      district: district,
      category: specialization,
      specialization: role === UserRole.USTA ? finalProf : null,
      profession: role === UserRole.USTA ? `${categoryName}: ${finalProf}` : null,
      experience: role === UserRole.USTA ? experience : null,
      description: description,
      image: '',
      ads: []
    };
    
    localStorage.setItem('role', role as string);
    localStorage.setItem('user_profile', JSON.stringify(userProfile));
    navigate('/');
  };

  const isFormValid = () => {
    if (role === UserRole.MIJOZ) return fullName.length > 2 && city !== '' && district !== '';
    
    const specValid = subSpecialization === 'boshqa' ? customSpecialization.length > 2 : subSpecialization !== '';
    return fullName.length > 2 && city !== '' && district !== '' && specialization !== '' && specValid && experience !== '';
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectedCategoryData = CATEGORIES.find(c => c.id === specialization);

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 relative overflow-hidden flex flex-col">
      {/* Mock SMS notification */}
      {showFakeSMS && (
        <div className="fixed top-4 left-4 right-4 z-[300] animate-in slide-in-from-top-full duration-500">
          <div className="bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl flex items-start gap-4 border border-white/10">
            <div className="bg-blue-600 p-2 rounded-2xl"><MessageSquare size={20} /></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase text-blue-400">Xabarlar • hozir</span>
                <X size={14} className="opacity-50" onClick={() => setShowFakeSMS(false)} />
              </div>
              <p className="text-sm font-bold">Xunarmand.uz</p>
              <p className="text-xs opacity-80 leading-relaxed">Tasdiqlash kodingiz: <span className="font-black text-white text-sm tracking-widest">{generatedCode}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {step > 1 && (
          <button onClick={goBack} className="p-2 bg-slate-50 rounded-xl active:scale-90 transition-transform">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
        )}
        <div className="flex gap-2 flex-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-slate-100'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-bold mb-2 text-slate-900">Xush kelibsiz!</h2>
            <p className="text-slate-500 mb-8 text-lg">Platformadan qanday foydalanmoqchisiz?</p>
            
            <div className="space-y-4 mb-8">
              <button onClick={() => handleRoleSelect(UserRole.MIJOZ)} className="w-full group p-6 rounded-[32px] border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center gap-6 text-left">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">👤</div>
                <div>
                  <span className="block font-bold text-xl text-slate-800">Mijozman</span>
                  <span className="text-sm text-slate-500">Ustalarni qidiraman</span>
                </div>
              </button>
              
              <button onClick={() => handleRoleSelect(UserRole.USTA)} className="w-full group p-6 rounded-[32px] border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center gap-6 text-left">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🧑‍🔧</div>
                <div>
                  <span className="block font-bold text-xl text-slate-800">Mutaxassisman</span>
                  <span className="text-sm text-slate-500">Mijoz qidiraman</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-2 text-slate-900">Tasdiqlash</h2>
            <p className="text-slate-500 mb-8">Telefon raqamingizni kiriting va kodni oling.</p>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">+998</span>
              <input type="tel" placeholder="90 123 45 67" autoFocus value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-5 pl-16 rounded-2xl text-lg font-bold outline-none transition-all" />
            </div>
            <button onClick={handleSendSMS} disabled={phone.length < 9} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold shadow-xl shadow-blue-100 disabled:bg-slate-200 disabled:shadow-none transition-all flex items-center justify-center gap-2">
              Kodni olish <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-10 max-h-[75vh] overflow-y-auto no-scrollbar pr-1">
            <h2 className="text-3xl font-bold mb-2 text-slate-900">Profilingiz</h2>
            <p className="text-slate-500 mb-8 italic">O'zingiz haqingizda ma'lumot bering.</p>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><User size={14} /> To'liq ism</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Aziz Abdullayev" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><MapPin size={14} /> Shahar</label>
                  <select value={city} onChange={(e) => handleCityChange(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all appearance-none">
                    <option value="">Tanlang...</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className={`transition-all ${city ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><MapPin size={14} /> Tuman</label>
                  <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all appearance-none">
                    <option value="">Tanlang...</option>
                    {city && CITY_DISTRICTS[city]?.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {role === UserRole.USTA && (
                <>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><Briefcase size={14} /> Ish sohasi</label>
                    <select value={specialization} onChange={(e) => handleSpecChange(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all">
                      <option value="">Tanlang...</option>
                      {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>

                  <div className={`transition-all ${specialization ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><Search size={14} /> Aniq mutaxassislik</label>
                    <select value={subSpecialization} onChange={(e) => setSubSpecialization(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all">
                      <option value="">Tanlang...</option>
                      {selectedCategoryData?.subs.map(s => <option key={s} value={s}>{s}</option>)}
                      <option value="boshqa">Boshqa...</option>
                    </select>
                  </div>

                  {subSpecialization === 'boshqa' && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><PenTool size={14} /> Hunaringiz nomi</label>
                      <input type="text" value={customSpecialization} onChange={(e) => setCustomSpecialization(e.target.value)} placeholder="Masalan: Zargarlik" className="w-full bg-blue-50 border-2 border-blue-200 p-4 rounded-2xl font-semibold outline-none transition-all focus:border-blue-500" />
                    </div>
                  )}

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"><Star size={14} /> Tajriba (yillar)</label>
                    <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Masalan: 5" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all" />
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"><Sparkles size={14} /> Men haqimda (Bio)</label>
                      <button 
                        onClick={handleGenerateBio} 
                        disabled={!experience || !subSpecialization || isGeneratingBio}
                        className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 disabled:opacity-50 flex items-center gap-1 transition-all"
                      >
                        {isGeneratingBio ? 'Yaratilmoqda...' : <><Sparkles size={10} /> AI bilan yaratish</>}
                      </button>
                    </div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mijozlar uchun o'zingiz haqingizda qisqacha ma'lumot yozing..." rows={4} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 p-4 rounded-2xl font-semibold outline-none transition-all resize-none text-sm" />
                  </div>
                </>
              )}

              <button onClick={handleFinish} disabled={!isFormValid()} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold shadow-xl shadow-blue-100 disabled:bg-slate-200 transition-all active:scale-[0.98]">
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SMS Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCodeModal(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">Tasdiqlash kodi</h3>
            <p className="text-slate-500 mb-8 text-sm text-center">SMS kod yuqori bildirishnomada ko'rsatildi</p>
            <input type="text" maxLength={4} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} placeholder="0000" className="w-full bg-slate-50 text-center tracking-[0.5em] text-3xl font-black border-2 border-transparent focus:border-blue-500 p-6 rounded-2xl outline-none mb-6" />
            <button onClick={handleVerify} disabled={code.length < 4} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold shadow-lg shadow-blue-100">Tasdiqlash</button>
          </div>
        </div>
      )}
    </div>
  );
};
