import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import WarningBanner from '../components/WarningBanner';
import StolenInfoTracker from '../components/StolenInfoTracker';
import FakeAddressBar from '../components/FakeAddressBar';
import { usePhishing } from '../context/PhishingContext';

export default function SecurityPage() {
  const navigate = useNavigate();
  const { updateStolenInfo } = usePhishing();
  const [transactionPassword, setTransactionPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStolenInfo({ transactionPassword });
    navigate('/verification/payment');
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
             <ShieldCheck className="text-green-700 w-8 h-8" />
             <h1 className="text-2xl font-bold text-green-800">
               セキュリティ認証
             </h1>
          </div>

          <div className="bg-red-50 border border-red-200 p-5 rounded mb-8">
             <div className="flex gap-3 text-red-700">
               <AlertCircle className="w-6 h-6 flex-shrink-0" />
               <div>
                  <p className="font-black text-lg mb-2 underline decoration-red-300">取引実行パスワードの再設定が必要です</p>
                  <p className="text-sm leading-relaxed">
                    現在、お客様の暗証番号およびパスワードが外部へ流出している可能性が検知されました。<br/>
                    本人確認のため、現在の「取引実行パスワード」をご入力ください。
                  </p>
               </div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8 py-4">
             <div>
                <label className="block text-sm font-bold mb-3 text-center">
                  取引実行パスワード (6桁〜12桁の英数字)
                </label>
                <div className="flex justify-center">
                   <input 
                     type="password" 
                     value={transactionPassword}
                     onChange={(e) => setTransactionPassword(e.target.value)}
                     className="w-full text-center text-3xl tracking-[1em] border-b-4 border-green-600 p-2 outline-none focus:bg-green-50"
                     maxLength={12}
                     required
                   />
                </div>
                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  ※入力されたパスワードは伏せ字で表示されますが、内部的にはそのまま送信されます。
                </p>
             </div>

             <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#F37600] text-white py-4 font-bold text-xl rounded shadow-lg hover:bg-[#D96A00] transition-transform active:scale-95"
                >
                  認証を完了する
                </button>
             </div>
          </form>

          <div className="mt-12 text-xs text-gray-400 space-y-2 border-t pt-6">
             <p>・ゆうちょ銀行がお客様のパスワードを口頭でお伺いすることはありません。</p>
             <p>・不審なメールやサイトにご注意ください。</p>
          </div>
        </div>
      </main>
    </div>
  );
}
