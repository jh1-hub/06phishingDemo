/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import LoginPage from './pages/LoginPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import SecurityPage from './pages/SecurityPage';
import CardInfoPage from './pages/CardInfoPage';
import SmsEntryPage from './pages/SmsEntryPage';
import { PhishingProvider } from './context/PhishingContext';

export default function App() {
  return (
    <PhishingProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SmsEntryPage />} />
          <Route path="/home" element={<TopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verification/personal" element={<PersonalInfoPage />} />
          <Route path="/verification/security" element={<SecurityPage />} />
          <Route path="/verification/payment" element={<CardInfoPage />} />
        </Routes>
      </HashRouter>
    </PhishingProvider>
  );
}
