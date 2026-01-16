
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SplashScreen } from './pages/SplashScreen';
import { LanguageSelect } from './pages/LanguageSelect';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { MasterList } from './pages/MasterList';
import { MasterProfile } from './pages/MasterProfile';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { CreateAd } from './pages/CreateAd';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/masters" element={<MasterList />} />
          <Route path="/master/:id" element={<MasterProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/search" element={<MasterList />} />
          <Route path="/chat" element={<div className="p-8 text-center text-slate-400">Chat xizmati yaqin kunlarda ishga tushadi</div>} />
          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
