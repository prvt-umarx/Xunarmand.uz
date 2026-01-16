
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Save, CheckCircle, X, RotateCcw, Image, Trash2, AlertCircle } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [profile, setProfile] = useState({
    name: 'Foydalanuvchi',
    image: '',
    phone: '+998 90 123 45 67'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };

  const removePhoto = () => {
    if (window.confirm("Profil rasmini o'chirmoqchimisiz?")) {
      setProfile(prev => ({ ...prev, image: '' }));
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } }, 
        audio: false 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Kameraga ulanib bo'lmadi:", err);
      alert("Kameradan foydalanishga ruxsat berilmadi yoki kamera topilmadi.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        
        const startX = (video.videoWidth - size) / 2;
        const startY = (video.videoHeight - size) / 2;

        context.drawImage(video, startX, startY, size, size, 0, 0, size, size);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setProfile(prev => ({ ...prev, image: imageData }));
        stopCamera();
      }
    }
  };

  const handleSaveClick = () => {
    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    setShowConfirmDialog(false);
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('user_profile', JSON.stringify(profile));
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/profile');
      }, 2000);
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen p-6 relative overflow-x-hidden">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-xl active:scale-90 transition-transform">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Profilni tahrirlash</h1>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          {/* Avatar Container */}
          <div className="w-40 h-40 rounded-[52px] bg-slate-100 border-4 border-slate-50 overflow-hidden shadow-2xl flex items-center justify-center group transition-all relative">
            {profile.image ? (
              <img src={profile.image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={80} className="text-slate-300" />
            )}
            
            {/* Quick Action Buttons on Avatar */}
            <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm p-3 flex justify-around opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => fileInputRef.current?.click()} className="text-white"><Image size={20} /></button>
               <button onClick={startCamera} className="text-white"><Camera size={20} /></button>
            </div>
          </div>
          
          {/* External Floating Buttons for better UX on Mobile */}
          <div className="absolute -bottom-2 -right-2 flex flex-col gap-2">
            <button 
              onClick={startCamera}
              className="bg-blue-600 text-white p-3 rounded-2xl border-4 border-white shadow-lg active:scale-90 transition-transform z-10"
              title="Rasmga tushish"
            >
              <Camera size={20} />
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-800 text-white p-3 rounded-2xl border-4 border-white shadow-lg active:scale-90 transition-transform z-10"
              title="Galereyadan tanlash"
            >
              <Image size={20} />
            </button>
          </div>

          {profile.image && (
            <button 
              onClick={removePhoto}
              className="absolute -top-2 -left-2 bg-red-500 text-white p-2 rounded-xl border-4 border-white shadow-lg active:scale-90 transition-transform"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
        
        <p className="mt-6 text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Profil rasmini o'zgartirish</p>

        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">To'liq ism</label>
          <input 
            type="text" 
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-slate-50 border-0 p-4 rounded-2xl text-lg font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Telefon raqam</label>
          <input 
            type="tel" 
            disabled
            value={profile.phone}
            className="w-full bg-slate-100 border-0 p-4 rounded-2xl text-lg font-semibold text-slate-400 cursor-not-allowed"
          />
          <p className="mt-2 text-[10px] text-slate-400 px-1 italic">Telefon raqamni o'zgartirib bo'lmaydi</p>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSaveClick}
            disabled={isLoading || showSuccess}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 ${
              showSuccess 
                ? 'bg-green-500 text-white shadow-green-100' 
                : 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={24} />
                <span>Saqlash</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowConfirmDialog(false)} />
          <div className="relative w-full max-w-xs bg-white rounded-[40px] p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Saqlashni tasdiqlang</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Kiritilgan o'zgarishlar profilingizda saqlanadi. Davom etasizmi?
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={confirmSave}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
                >
                  Ha, saqlansin
                </button>
                <button 
                  onClick={() => setShowConfirmDialog(false)}
                  className="w-full bg-slate-50 text-slate-400 py-3 rounded-2xl font-bold active:scale-95 transition-all text-sm"
                >
                  Yo'q, bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Feedback Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-[300] bg-white/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white p-12 rounded-[60px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-in zoom-in slide-in-from-bottom-12 duration-700 flex flex-col items-center">
             <div className="relative mb-6">
               <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
               <div className="relative bg-green-500 p-6 rounded-full text-white shadow-lg shadow-green-100">
                 <CheckCircle size={56} strokeWidth={2.5} />
               </div>
             </div>
             <p className="text-3xl font-black text-slate-900 tracking-tight">Tayyor!</p>
             <p className="text-slate-500 font-medium mt-2">Ma'lumotlaringiz muvaffaqiyatli saqlandi</p>
          </div>
        </div>
      )}

      {/* Camera Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-between p-6">
          <div className="w-full flex justify-between items-center text-white mb-4">
            <h3 className="font-bold text-lg">Rasmga tushish</h3>
            <button onClick={stopCamera} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="relative w-full aspect-square max-w-sm rounded-[40px] overflow-hidden border-4 border-white/20 shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover -scale-x-100" />
            <div className="absolute inset-0 border-[40px] border-black/30 pointer-events-none rounded-[40px]"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-2 border-dashed border-white/30 rounded-full"></div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-8 mb-10">
            <p className="text-white/60 text-sm font-medium">Yuzingizni markazga joylashtiring</p>
            <div className="flex items-center gap-12">
               <button onClick={stopCamera} className="text-white flex flex-col items-center gap-2 opacity-60">
                 <X size={24} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Bekor</span>
               </button>
               <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/30 active:scale-90 transition-transform shadow-2xl">
                 <div className="w-16 h-16 bg-white rounded-full border-2 border-slate-200"></div>
               </button>
               <button onClick={startCamera} className="text-white flex flex-col items-center gap-2 opacity-60">
                 <RotateCcw size={24} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Qayta</span>
               </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};
