import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import WarningBanner from '../components/WarningBanner';
import StolenInfoTracker from '../components/StolenInfoTracker';
import FakeAddressBar from '../components/FakeAddressBar';
import { usePhishing } from '../context/PhishingContext';

export default function PersonalInfoPage() {
  const navigate = useNavigate();
  const { updateStolenInfo } = usePhishing();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStolenInfo({ fullName, birthDate, phoneNumber, address });
    navigate('/verification/security');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans text-gray-800">
      <FakeAddressBar />
      <WarningBanner />
      <Header />
      <StolenInfoTracker />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white border p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-green-700 pb-4">
             <h1 className="text-2xl font-bold text-green-800 flex items-center">
               ご本人情報の確認・更新
             </h1>
          </div>

          <p className="text-sm mb-8 text-gray-600">
            安全なサービスをご利用いただくため、現在登録されているご本人様情報の確認をお願いしております。
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="md:col-span-1 text-sm font-bold">お名前 <span className="text-[10px] bg-red-600 text-white px-1 rounded ml-1">必須</span></label>
              <div className="md:col-span-3">
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ゆうちょ 太郎"
                  className="w-full border-2 border-gray-200 p-2 focus:border-green-600 outline-none rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="md:col-span-1 text-sm font-bold">生年月日 <span className="text-[10px] bg-red-600 text-white px-1 rounded ml-1">必須</span></label>
              <div className="md:col-span-3">
                <input 
                  type="text" 
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="19900101 (8桁)"
                  className="w-full border-2 border-gray-200 p-2 focus:border-green-600 outline-none rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="md:col-span-1 text-sm font-bold">電話番号 <span className="text-[10px] bg-red-600 text-white px-1 rounded ml-1">必須</span></label>
              <div className="md:col-span-3">
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="090-0000-0000"
                  className="w-full border-2 border-gray-200 p-2 focus:border-green-600 outline-none rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="md:col-span-1 text-sm font-bold">ご住所 <span className="text-[10px] bg-red-600 text-white px-1 rounded ml-1">必須</span></label>
              <div className="md:col-span-3">
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="東京都千代田区大手町..."
                  className="w-full border-2 border-gray-200 p-2 focus:border-green-600 outline-none rounded h-24"
                  required
                />
              </div>
            </div>

            <div className="pt-8 w-full md:w-1/2 mx-auto">
              <button 
                type="submit"
                className="w-full bg-[#00873C] text-white py-3 font-bold text-lg rounded shadow hover:bg-green-700 transition-colors flex justify-center items-center"
              >
                次へ進む <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-12 bg-blue-50 p-4 rounded text-xs text-blue-800 flex gap-2">
             <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
             <p>
               ※情報の整合性が確認できない場合、一時的に口座の利用を制限させていただくことがございます。
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
