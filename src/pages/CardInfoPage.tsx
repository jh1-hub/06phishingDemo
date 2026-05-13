import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import WarningBanner from '../components/WarningBanner';
import StolenInfoTracker from '../components/StolenInfoTracker';
import FakeAddressBar from '../components/FakeAddressBar';
import { usePhishing } from '../context/PhishingContext';

export default function CardInfoPage() {
  const navigate = useNavigate();
  const { updateStolenInfo, setCompleted } = usePhishing();
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvv, setCcCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStolenInfo({ creditCardNumber, ccExpiry, ccCvv });
    // Navigate home first, then complete after a delay on the home page
    navigate('/home?finish=true');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans text-gray-800">
      <FakeAddressBar />
      <WarningBanner />
      <Header />
      <StolenInfoTracker />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white border p-6 md:p-10 shadow-sm border-t-8 border-t-red-600">
          <div className="mb-8 text-center">
             <h1 className="text-2xl font-bold text-gray-800 mb-2">キャッシュカード・クレジットカード情報の更新</h1>
             <p className="text-sm text-red-600 font-bold">※サービス継続のため、カード情報の有効性確認が必須となります。</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div className="bg-gray-50 border rounded-xl p-6">
               <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-400">CREDIT CARD</span>
                  <CreditCard className="w-8 h-8 text-gray-400" />
               </div>
               
               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                    <input 
                      type="text" 
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                      placeholder="4500 0000 0000 0000"
                      className="w-full text-xl font-mono tracking-widest border-b border-gray-300 bg-transparent outline-none pb-1 focus:border-red-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Expiration (MM/YY)</label>
                      <input 
                        type="text" 
                        value={ccExpiry}
                        onChange={(e) => setCcExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full text-lg font-mono border-b border-gray-300 bg-transparent outline-none pb-1 focus:border-red-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">CVV / CVC</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          value={ccCvv}
                          onChange={(e) => setCcCvv(e.target.value)}
                          placeholder="***"
                          maxLength={4}
                          className="w-full text-lg font-mono border-b border-gray-300 bg-transparent outline-none pb-1 focus:border-red-500"
                          required
                        />
                        <Lock className="w-3 h-3 absolute right-0 top-2 text-gray-300" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 text-[10px] text-gray-600 leading-normal">
              カード情報の確認が完了次第、お客様のサービス制限は全て解除されます。<br/>
              ※一時的な1円の承認決済が発生する場合がありますが、後ほど自動的に返金されます。
            </div>

            <button 
              type="submit"
              className="w-full bg-[#000] text-white py-4 font-bold text-xl rounded-none shadow-xl hover:bg-gray-800 transition-colors"
            >
              更新を完了してサービスを再開する
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
